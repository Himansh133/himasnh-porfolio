// Builds src/lib/memories.json from the files in public/memories.
//
//   npm run memories              once (also runs before `npm run dev` and `npm run build`)
//   npm run memories -- --watch   again whenever the folder changes
//   npm run memories -- --relayout  places every photo afresh instead of keeping spots
//
// Drop photos and songs into public/memories. A photo plays the song whose name it
// starts with: beach-1.jpg and beach-2.jpg both play beach.mp3. Photos without a
// match play default.mp3, or the first song if there's no default. Captions and
// song names go in public/memories/notes.txt.

import { existsSync, readdirSync, readFileSync, statSync, watch, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public/memories");
const OUT = path.join(ROOT, "src/lib/memories.json");

const PHOTO = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const SONG = new Set([".mp3", ".m4a", ".aac", ".ogg", ".opus", ".wav"]);
// Phone photos are far bigger than the board ever shows them
const MAX_SIDE = 1600;
const PHONE_COUNT = 12;
// The board is laid out on a 1440×900 screen and scaled to fit others
const W = 1440;
const H = 900;
// Places photos keep clear of: the glass, the name above it, the reset button
const AVOID = [
  { l: 560, t: 290, r: 880, b: 610 },
  { l: 470, t: 150, r: 730, b: 235 },
  { l: 1320, t: 860, r: 1440, b: 900 },
];

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "memory";
const words = (name) => name.replace(/[-_]+/g, " ").trim();

// Same photo, same spot: randomness seeded from the name
const hash = (s) => {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
};
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function readNotes() {
  const notes = new Map();
  const file = path.join(DIR, "notes.txt");
  if (!existsSync(file)) return notes;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([^#:][^:]*?)\s*:\s*(.+?)\s*$/);
    if (m) notes.set(m[1].toLowerCase(), m[2]);
  }
  return notes;
}

/** Shrinks oversized photos in place, turned the right way up; returns width over height */
async function prepare(file) {
  const meta = await sharp(file).metadata();
  const turned = (meta.orientation ?? 1) >= 5;
  const w = turned ? meta.height : meta.width;
  const h = turned ? meta.width : meta.height;
  if (Math.max(w, h) > MAX_SIDE || (meta.orientation ?? 1) > 1) {
    const image = sharp(file).rotate().resize(MAX_SIDE, MAX_SIDE, { fit: "inside", withoutEnlargement: true });
    const ext = path.extname(file).toLowerCase();
    const out =
      ext === ".png"
        ? image.png({ palette: false, compressionLevel: 9 })
        : ext === ".webp"
          ? image.webp({ quality: 82 })
          : ext === ".avif"
            ? image.avif({ quality: 60 })
            : image.jpeg({ quality: 82, mozjpeg: true });
    const buffer = await out.toBuffer({ resolveWithObject: true });
    writeFileSync(file, buffer.data);
    console.log(`memories: resized ${path.basename(file)} to ${buffer.info.width}×${buffer.info.height}`);
    return buffer.info.width / buffer.info.height;
  }
  return w / h;
}

const rectOf = (p) => {
  const x = (p.at.x / 100) * W;
  const y = (p.at.y / 100) * H;
  const h = p.size / p.ratio;
  return { l: x - p.size / 2, t: y - h / 2, r: x + p.size / 2, b: y + h / 2 };
};
// Distance between two boxes; negative when they overlap, by how much
const gap = (a, b) => {
  const dx = Math.max(a.l - b.r, b.l - a.r);
  const dy = Math.max(a.t - b.b, b.t - a.b);
  return dx > 0 || dy > 0 ? Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) : Math.max(dx, dy);
};

/** Each new photo takes the best of a few hundred spots: the one furthest from everything */
function place(photos, fresh) {
  const kept = photos.filter((p) => !fresh.includes(p));
  const placed = kept.map(rectOf);
  // Sizes vary a little around those already on the board, or on a fresh board
  // are scaled so the photos fill about two fifths of the screen
  const factor = new Map(fresh.map((p) => [p, 0.75 + rng(hash(p.id))() * 0.55]));
  const unit = kept.length
    ? kept.map((p) => p.size).sort((a, b) => a - b)[kept.length >> 1]
    : Math.sqrt((W * H * 0.42) / fresh.reduce((s, p) => s + factor.get(p) ** 2 / p.ratio, 0));
  for (const p of fresh) {
    p.size = Math.round(Math.min(230, 260 * p.ratio, Math.max(90, unit * factor.get(p))));
    const r = rng(hash(p.id) ^ 0x9e3779b9);
    const t = (r() * 2 - 1) * 6;
    p.tilt = Math.round(Math.sign(t || 1) * Math.max(1.5, Math.abs(t)));
  }
  // Big ones first, so the small ones fill the gaps
  for (const p of [...fresh].sort((a, b) => b.size / Math.sqrt(b.ratio) - a.size / Math.sqrt(a.ratio))) {
    const r = rng(hash(p.id) ^ 0x85ebca6b);
    const w = p.size;
    const h = p.size / p.ratio;
    let best = -Infinity;
    for (let k = 0; k < 400; k++) {
      const x = w / 2 + 16 + r() * (W - w - 32);
      const y = h / 2 + 16 + r() * (H - h - 46);
      const box = { l: x - w / 2, t: y - h / 2, r: x + w / 2, b: y + h / 2 };
      let score = Infinity;
      for (const q of placed) score = Math.min(score, gap(box, q));
      for (const q of AVOID) score = Math.min(score, gap(box, q) * 1.5);
      if (score > best) {
        best = score;
        p.at = { x: +((x / W) * 100).toFixed(1), y: +((y / H) * 100).toFixed(1) };
      }
    }
    placed.push(rectOf(p));
  }
}

async function build({ relayout = false } = {}) {
  if (!existsSync(DIR)) return;
  const files = readdirSync(DIR).filter((f) => statSync(path.join(DIR, f)).isFile());
  const notes = readNotes();
  let previous = [];
  try {
    previous = relayout ? [] : JSON.parse(readFileSync(OUT, "utf8"));
  } catch {}
  const before = new Map(previous.map((p) => [p.id, p]));

  const songs = files
    .filter((f) => SONG.has(path.extname(f).toLowerCase()))
    .map((f) => {
      const name = path.parse(f).name;
      const [title, artist = ""] = (notes.get(f.toLowerCase()) ?? words(name)).split(/\s+[-–]\s+/);
      return { key: slug(name), track: { title, artist, src: `/memories/${encodeURI(f)}` } };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
  const fallback = songs.find((s) => s.key === "default") ?? songs[0];

  const photos = [];
  const ids = new Set();
  for (const f of files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
    const ext = path.extname(f).toLowerCase();
    if (ext === ".heic" || ext === ".heif") {
      console.warn(`memories: skipped ${f}; HEIC isn't supported, export it as JPG`);
      continue;
    }
    if (!PHOTO.has(ext)) continue;
    const name = path.parse(f).name;
    let id = slug(name);
    while (ids.has(id)) id += "-2";
    ids.add(id);
    let ratio;
    try {
      ratio = +(await prepare(path.join(DIR, f))).toFixed(4);
    } catch (e) {
      console.warn(`memories: skipped ${f}; couldn't read it (${e.message})`);
      continue;
    }
    // The longest song name the photo's name starts with
    const song =
      songs.filter((s) => id === s.key || id.startsWith(`${s.key}-`)).sort((a, b) => b.key.length - a.key.length)[0] ??
      fallback;
    const caption = notes.get(f.toLowerCase());
    const old = before.get(id);
    const keep = old && Math.abs(old.ratio - ratio) < 0.01;
    photos.push({
      id,
      photo: `/memories/${encodeURI(f)}`,
      alt: caption ?? words(name),
      ratio,
      ...(caption && { caption }),
      ...(song && { track: song.track }),
      at: keep ? old.at : { x: 50, y: 50 },
      size: keep ? old.size : 0,
      tilt: keep ? old.tilt : 0,
      phone: keep ? old.phone : false,
      _fresh: !keep,
    });
  }

  const fresh = photos.filter((p) => p._fresh);
  if (fresh.length) place(photos, fresh);
  // Phones show a dozen; new photos join while there's room
  let onPhone = photos.filter((p) => p.phone).length;
  for (const p of photos) {
    if (!p._fresh || onPhone >= PHONE_COUNT) continue;
    p.phone = true;
    onPhone++;
  }
  for (const p of photos) delete p._fresh;

  const json = `${JSON.stringify(photos, null, 2)}\n`;
  const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
  if (json !== current) {
    writeFileSync(OUT, json);
    console.log(`memories: ${photos.length} photos, ${songs.length} songs${fresh.length ? `, placed ${fresh.length} new` : ""}`);
  }
  if (!songs.length && photos.length) console.warn("memories: no songs yet; add an .mp3 to public/memories");
}

const args = new Set(process.argv.slice(2));
await build({ relayout: args.has("--relayout") });

if (args.has("--watch")) {
  let timer;
  let running = Promise.resolve();
  watch(DIR, (_, file) => {
    if (!file || file.startsWith(".")) return;
    clearTimeout(timer);
    // Wait for copies to finish before reading them
    timer = setTimeout(() => (running = running.then(() => build()).catch((e) => console.error(e))), 400);
  });
  console.log("memories: watching public/memories");
}
