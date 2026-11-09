// Cuts full songs in public/memories down to their best ~18 seconds, the way
// Instagram suggests a clip: the stretch that repeats most through the song (the
// chorus, usually) and has the most energy, starting on a beat.
//
// A song longer than LONG_SONG seconds is treated as uncut: the clip replaces it
// in public/memories as .mp3, and the full song moves to .memories-originals/
// (not committed) so a different part can be cut later. To choose the part
// yourself, add the start time in notes.txt, e.g. `goa.mp3: Title - Artist @ 1:05`.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const CLIP = 18;
const LONG_SONG = 30;
const RATE = 22050;
const FRAME = 2048;
const HOP = 1024;
// Features are averaged into half-second blocks before comparing parts of the song
const BLOCK = 0.5;

const ffmpegPath = async () => (await import("ffmpeg-static")).default;

/** Seconds from "1:05", "65" or "1:05.5" */
export const parseTime = (t) => t.split(":").reduce((s, part) => s * 60 + Number(part), 0);
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function duration(ffmpeg, file) {
  const out = spawnSync(ffmpeg, ["-hide_banner", "-i", file]).stderr.toString();
  const m = out.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : 0;
}

function decode(ffmpeg, file) {
  const raw = execFileSync(ffmpeg, ["-v", "error", "-i", file, "-ac", "1", "-ar", String(RATE), "-f", "f32le", "-"], {
    maxBuffer: 1 << 30,
  });
  return new Float32Array(raw.buffer, raw.byteOffset, raw.byteLength / 4);
}

// In-place radix-2 FFT
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const a = (-2 * Math.PI) / len;
    for (let i = 0; i < n; i += len) {
      for (let k = 0; k < len / 2; k++) {
        const wr = Math.cos(a * k);
        const wi = Math.sin(a * k);
        const xr = re[i + k + len / 2] * wr - im[i + k + len / 2] * wi;
        const xi = re[i + k + len / 2] * wi + im[i + k + len / 2] * wr;
        re[i + k + len / 2] = re[i + k] - xr;
        im[i + k + len / 2] = im[i + k] - xi;
        re[i + k] += xr;
        im[i + k] += xi;
      }
    }
  }
}

/** Per frame: loudness, onset strength, and the 12 pitch classes (what chords are playing) */
function features(pcm) {
  const frames = Math.floor((pcm.length - FRAME) / HOP);
  const window = Float32Array.from({ length: FRAME }, (_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / FRAME));
  // Which pitch class each FFT bin belongs to, between 55 Hz and 5 kHz
  const pitch = Int8Array.from({ length: FRAME / 2 }, (_, k) => {
    const hz = (k * RATE) / FRAME;
    return hz < 55 || hz > 5000 ? -1 : ((Math.round(12 * Math.log2(hz / 440)) % 12) + 12) % 12;
  });
  const loud = new Float32Array(frames);
  const onset = new Float32Array(frames);
  const chroma = Array.from({ length: frames }, () => new Float32Array(12));
  let prev = new Float32Array(FRAME / 2);
  const re = new Float64Array(FRAME);
  const im = new Float64Array(FRAME);
  for (let f = 0; f < frames; f++) {
    let energy = 0;
    for (let i = 0; i < FRAME; i++) {
      const x = pcm[f * HOP + i];
      energy += x * x;
      re[i] = x * window[i];
      im[i] = 0;
    }
    loud[f] = 10 * Math.log10(energy / FRAME + 1e-10);
    fft(re, im);
    const mag = new Float32Array(FRAME / 2);
    let flux = 0;
    for (let k = 0; k < FRAME / 2; k++) {
      mag[k] = Math.hypot(re[k], im[k]);
      flux += Math.max(0, mag[k] - prev[k]);
      if (pitch[k] >= 0) chroma[f][pitch[k]] += mag[k];
    }
    onset[f] = flux;
    prev = mag;
  }
  return { loud, onset, chroma };
}

/** The start, in seconds, of the best CLIP-long stretch */
export function bestStart(pcm) {
  const { loud, onset, chroma } = features(pcm);
  // A whole number of frames, so a block is only about BLOCK seconds long
  const perBlock = Math.round((BLOCK * RATE) / HOP);
  const blockSeconds = (perBlock * HOP) / RATE;
  const blocks = Math.floor(loud.length / perBlock);
  const bChroma = [];
  const bLoud = new Float32Array(blocks);
  for (let b = 0; b < blocks; b++) {
    const c = new Float32Array(12);
    for (let f = b * perBlock; f < (b + 1) * perBlock; f++) {
      for (let p = 0; p < 12; p++) c[p] += chroma[f][p];
      bLoud[b] += loud[f] / perBlock;
    }
    const norm = Math.hypot(...c) || 1;
    bChroma.push(c.map((v) => v / norm));
  }

  const len = Math.round(CLIP / blockSeconds);
  const starts = blocks - len;
  if (starts <= 0) return 0;
  const sim = (a, b) => {
    let s = 0;
    for (let p = 0; p < 12; p++) s += bChroma[a][p] * bChroma[b][p];
    return s;
  };
  // Repetition: how closely this stretch matches the best other stretch elsewhere
  const repeat = new Float32Array(starts);
  const energy = new Float32Array(starts);
  for (let s = 0; s < starts; s++) {
    let best = 0;
    for (let t = 0; t < starts; t++) {
      if (Math.abs(t - s) < len) continue;
      let total = 0;
      for (let k = 0; k < len; k += 2) total += sim(s + k, t + k);
      best = Math.max(best, total / Math.ceil(len / 2));
    }
    repeat[s] = best;
    for (let k = 0; k < len; k++) energy[s] += bLoud[s + k] / len;
  }
  const scale = (xs) => {
    const lo = Math.min(...xs);
    const hi = Math.max(...xs);
    return xs.map((x) => (hi > lo ? (x - lo) / (hi - lo) : 0.5));
  };
  const r = scale(repeat);
  const e = scale(energy);
  let pick = 0;
  let top = -Infinity;
  for (let s = 0; s < starts; s++) {
    // Intros and outros rarely hold the hook
    const edge = s < starts * 0.1 || s > starts * 0.95 ? 0.85 : 1;
    const score = (0.55 * r[s] + 0.45 * e[s]) * edge;
    if (score > top) {
      top = score;
      pick = s;
    }
  }

  // Start on the strongest beat within a second before the chosen spot
  const at = pick * perBlock;
  const from = Math.max(0, at - Math.round(RATE / HOP));
  let beat = at;
  for (let f = from; f <= at + Math.round((0.25 * RATE) / HOP) && f < onset.length; f++) {
    if (onset[f] > onset[beat]) beat = f;
  }
  return (beat * HOP) / RATE;
}

function cut(ffmpeg, from, start, to) {
  execFileSync(ffmpeg, [
    "-v", "error", "-y", "-ss", start.toFixed(2), "-t", String(CLIP), "-i", from,
    "-af", `afade=t=in:d=0.25,afade=t=out:st=${CLIP - 1.5}:d=1.5`,
    "-ac", "2", "-b:a", "160k", to,
  ]);
}

/**
 * Trims uncut songs and re-cuts any whose start time in notes.txt has changed.
 * `noteFor` gives a song's line in notes.txt.
 */
export async function trimSongs(dir, root, files, noteFor, isSong) {
  const originals = path.join(root, ".memories-originals");
  const record = path.join(originals, "clips.json");
  let clips = {};
  try {
    clips = JSON.parse(readFileSync(record, "utf8"));
  } catch {}
  let ffmpeg;
  let changed = false;

  for (const f of files.filter(isSong)) {
    const name = path.parse(f).name;
    const out = path.join(dir, `${name}.mp3`);
    const asked = noteFor(f)?.match(/@\s*([\d:.]+)\s*$/)?.[1];
    const clip = clips[name];

    ffmpeg ??= await ffmpegPath().catch(() => null);
    if (!ffmpeg) {
      console.warn("memories: can't trim songs; ffmpeg-static isn't installed (npm install)");
      return;
    }

    let source;
    let moved = false;
    if (!clip && duration(ffmpeg, path.join(dir, f)) > LONG_SONG) {
      // A full song just dropped in: keep it aside, out of the site
      mkdirSync(originals, { recursive: true });
      source = path.join(originals, f);
      renameSync(path.join(dir, f), source);
      moved = true;
    } else if (clip && asked && Math.abs(parseTime(asked) - clip.start) > 0.05) {
      source = path.join(originals, clip.original);
      if (!existsSync(source)) {
        console.warn(`memories: can't re-cut ${f}; the full song isn't in .memories-originals`);
        continue;
      }
    } else continue;

    let start;
    try {
      start = asked ? parseTime(asked) : bestStart(decode(ffmpeg, source));
      cut(ffmpeg, source, start, out);
    } catch (e) {
      // Most likely still being copied in; put it back and try on the next change
      if (moved) renameSync(source, path.join(dir, f));
      console.warn(`memories: couldn't cut ${f} (${e.message.split("\n")[0]})`);
      continue;
    }
    clips[name] = { original: path.basename(source), start: +start.toFixed(2) };
    changed = true;
    console.log(`memories: cut ${f} to ${CLIP}s from ${clock(start)}${asked ? " (from notes.txt)" : ""} → ${name}.mp3`);
  }

  if (changed) {
    mkdirSync(originals, { recursive: true });
    writeFileSync(record, `${JSON.stringify(clips, null, 2)}\n`);
  }
  // A clip whose song was deleted from the folder goes with it
  for (const name of Object.keys(clips)) {
    if (!existsSync(path.join(dir, `${name}.mp3`))) {
      rmSync(path.join(originals, clips[name].original), { force: true });
      delete clips[name];
      writeFileSync(record, `${JSON.stringify(clips, null, 2)}\n`);
    }
  }
}
