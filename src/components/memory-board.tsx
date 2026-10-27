"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useRef, useState, ViewTransition } from "react";
import { handoff, memories, MOBILE_BELOW, readPeek, RETURN_KEY } from "@/lib/memories";
import { site } from "@/lib/site";

// Photos settle into place with a little overshoot
const STIFFNESS = 170;
const DAMPING = 19;
// Strings are verlet ropes: pulled down, then relaxed toward an even spacing
const GRAVITY = 0.25;
const ROPE_DAMPING = 0.86;
const ROPE_PASSES = 5;
const PUSH_RADIUS = 34;
const STEP = 1 / 60;
const STORAGE_KEY = "memories-layout-v3";

type Vec = { x: number; y: number };
type Layout = Record<string, Vec>;

interface Body {
  id: string;
  el: HTMLElement;
  ratio: number;
  tilt: number;
  size: number;
  shown: boolean;
  w: number;
  h: number;
  x: number;
  y: number;
  r: number;
  s: number;
  vx: number;
  vy: number;
  vr: number;
  vs: number;
  tx: number;
  ty: number;
  tr: number;
  ts: number;
  /** Seconds before the photo joins in, for the entrance */
  delay: number;
  /** Last transform written, so still photos aren't touched */
  painted: string;
}

interface Rope {
  a: Body;
  b: Body;
  n: number;
  pts: Float32Array;
  prev: Float32Array;
  /** Fades in once both photos it joins are on the board */
  alpha: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** Two players that crossfade, so one memory can hand over to the next */
function createDeck() {
  const els = [new Audio(), new Audio()];
  for (const el of els) {
    el.loop = true;
    el.preload = "auto";
    el.preservesPitch = false;
  }
  const VOLUME = 0.7;
  let ctx: AudioContext | null = null;
  let gains: GainNode[] = [];
  let active = 0;
  let slowTimer = 0;

  const prime = () => {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) {
        const c = new AC();
        gains = els.map((el) => {
          const g = c.createGain();
          g.gain.value = 0;
          c.createMediaElementSource(el).connect(g).connect(c.destination);
          return g;
        });
        ctx = c;
      }
    }
    void ctx?.resume();
  };

  const fade = (i: number, to: number, seconds: number) => {
    if (ctx && gains[i]) {
      const g = gains[i].gain;
      const now = ctx.currentTime;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(to, now + seconds);
    } else {
      els[i].volume = to;
    }
  };

  return {
    prime,
    play(src: string) {
      prime();
      window.clearInterval(slowTimer);
      const prev = active;
      const next = 1 - active;
      fade(prev, 0, 0.42);
      window.setTimeout(() => {
        if (active !== prev) els[prev].pause();
      }, 450);
      const el = els[next];
      if (el.getAttribute("src") !== src) el.src = src;
      el.currentTime = 0;
      el.playbackRate = 1;
      fade(next, VOLUME, 0.42);
      active = next;
      return el.play();
    },
    /** Fade out while the tape slows down */
    stop() {
      const el = els[active];
      fade(active, 0, 0.46);
      const start = performance.now();
      window.clearInterval(slowTimer);
      slowTimer = window.setInterval(() => {
        const k = Math.min(1, (performance.now() - start) / 460);
        el.playbackRate = 1 - 0.44 * k;
        if (k >= 1) {
          window.clearInterval(slowTimer);
          el.pause();
          el.playbackRate = 1;
        }
      }, 30);
    },
    /** Small tactile blips for picking up and dropping a photo */
    sfx(kind: "pick" | "drop") {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const now = ctx.currentTime;
      const [from, to] = kind === "pick" ? [880, 660] : [320, 170];
      osc.frequency.setValueAtTime(from, now);
      osc.frequency.exponentialRampToValueAtTime(to, now + 0.1);
      g.gain.setValueAtTime(kind === "pick" ? 0.035 : 0.07, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
      osc.connect(g).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    },
    dispose() {
      window.clearInterval(slowTimer);
      for (const el of els) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      void ctx?.close();
    },
  };
}

/** Minimum spanning tree over the photos, so each one is strung to its neighbours */
function strings(nodes: { x: number; y: number }[]): [number, number][] {
  const edges: [number, number][] = [];
  if (nodes.length < 2) return edges;
  const inTree = new Array(nodes.length).fill(false);
  const best = new Array(nodes.length).fill(Infinity);
  const from = new Array(nodes.length).fill(-1);
  best[0] = 0;
  for (let step = 0; step < nodes.length; step++) {
    let u = -1;
    for (let i = 0; i < nodes.length; i++) if (!inTree[i] && (u < 0 || best[i] < best[u])) u = i;
    inTree[u] = true;
    if (from[u] >= 0) edges.push([from[u], u]);
    for (let v = 0; v < nodes.length; v++) {
      if (inTree[v]) continue;
      const d = Math.hypot(nodes[u].x - nodes[v].x, nodes[u].y - nodes[v].y);
      if (d < best[v]) {
        best[v] = d;
        from[v] = u;
      }
    }
  }
  return edges;
}

interface Api {
  activate: (id: string) => void;
  eject: () => void;
  reset: () => void;
  /** Fade the scene out and stop the music, then call `done` */
  leave: (done: () => void) => void;
}

// How long the scene takes to fade before the page changes
const LEAVE_MS = 240;
// How long the photos take to glide home after that (the morph in globals.css)
const GLIDE_MS = 600;

export function MemoryBoard() {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLAnchorElement>(null);
  const apiRef = useRef<Api | null>(null);

  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [hot, setHot] = useState(false);

  // Layout effect: photos must be in place before the first paint, so the ones
  // gliding over from the avatar land on the right spot
  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const player = playerRef.current;
    const identity = identityRef.current;
    const ctx = canvas?.getContext("2d");
    if (!scene || !canvas || !player || !identity || !ctx) return;

    // The scene covers the page; keep what's underneath from scrolling
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // Next keeps a visited page alive while hidden, so coming back finds this DOM as
    // it was left: faded out, photos already in. Start it over from a clean slate
    delete scene.dataset.leaving;
    setLoadedId(null);
    setHot(false);
    // The photos the avatar was showing glide over from it and back to it
    const peek = readPeek();
    for (const el of scene.querySelectorAll<HTMLElement>("[data-memory]")) {
      delete el.dataset.ready;
      delete el.dataset.loaded;
      delete el.dataset.dragging;
      el.style.zIndex = "";
      el.toggleAttribute("data-peek", peek.has(el.dataset.memory!));
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const deck = createDeck();

    let W = 0;
    let H = 0;
    let dpr = 1;
    let mobile = false;
    let first = true;
    let slot: Vec = { x: 0, y: 0 };
    let slotFit = 100;
    let playerBox = { l: 0, t: 0, r: 0, b: 0 };
    let homes: Layout = {};
    let current: string | null = null;
    let z = 20;
    let raf = 0;
    let last = 0;
    let acc = 0;
    let quiet = 0;
    let visible = true;
    let hotNow = false;
    const pointer = { x: 0, y: 0, active: false };
    let drag: { b: Body; id: number; gx: number; gy: number; sx: number; sy: number; moved: boolean } | null =
      null;

    const bodies: Body[] = memories.map((m) => ({
      id: m.id,
      el: scene.querySelector<HTMLElement>(`[data-memory="${m.id}"]`)!,
      ratio: m.ratio,
      tilt: m.tilt,
      size: m.size,
      shown: true,
      w: 0,
      h: 0,
      x: 0,
      y: 0,
      r: 0,
      s: 1,
      vx: 0,
      vy: 0,
      vr: 0,
      vs: 0,
      tx: 0,
      ty: 0,
      tr: m.tilt,
      ts: 1,
      delay: 0,
      painted: "",
    }));
    const byId = new Map(bodies.map((b) => [b.id, b]));
    const ropes: Rope[] = [];

    const storageKey = () => `${STORAGE_KEY}-${mobile ? "m" : "d"}`;

    // Phones get a fresh scatter each visit: each photo takes the best of a few
    // random spots, the one furthest from everything already placed
    let scattered: Layout | null = null;
    const scatter = (): Layout => {
      const sceneRect = scene.getBoundingClientRect();
      const idRect = identity.getBoundingClientRect();
      const top = idRect.bottom - sceneRect.top + 10;
      const gx = (playerBox.l + playerBox.r) / 2;
      const gy = (playerBox.t + playerBox.b) / 2;
      // The glass counts as taken, so only the photos tucked under it on purpose land there
      const placed = [{ x: gx, y: gy, r: ((playerBox.r - playerBox.l) / 2) * 0.8 }];
      const out: Layout = {};
      // The first two photos that aren't the avatar's sit partly under the glass
      const tucked = bodies.filter((b) => b.shown && !peek.has(b.id)).slice(0, 2);
      bodies
        .filter((b) => b.shown)
        .forEach((b) => {
          const r = Math.max(b.w, b.h) / 2;
          const xMin = b.w / 2 + 8;
          const xMax = W - b.w / 2 - 8;
          const yMin = top + b.h / 2;
          const yMax = H - b.h / 2 - 28;
          let x: number;
          let y: number;
          if (tucked.includes(b)) {
            // so it has something to frost
            const left = b === tucked[0];
            x = left ? playerBox.l + b.w * 0.2 : playerBox.r - b.w * 0.2;
            y = left ? playerBox.t + b.h * 0.2 : playerBox.b - b.h * 0.2;
          } else {
            let best = -Infinity;
            x = y = 0;
            for (let k = 0; k < 40; k++) {
              const cx = xMin + Math.random() * (xMax - xMin);
              const cy = yMin + Math.random() * (yMax - yMin);
              let room = Infinity;
              for (const p of placed) room = Math.min(room, Math.hypot(p.x - cx, p.y - cy) - p.r - r);
              if (room > best) {
                best = room;
                x = cx;
                y = cy;
              }
            }
          }
          x = clamp(x, xMin, xMax);
          y = clamp(y, yMin, yMax);
          placed.push({ x, y, r });
          out[b.id] = { x: (x / W) * 100, y: (y / H) * 100 };
        });
      return out;
    };

    const defaults = (): Layout => {
      if (mobile) return (scattered ??= scatter());
      return Object.fromEntries(memories.map((m) => [m.id, m.at]));
    };
    const loadLayout = () => {
      homes = defaults();
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey()) ?? "null") as Layout | null;
        if (saved) for (const id of Object.keys(homes)) if (saved[id]) homes[id] = saved[id];
      } catch {}
    };
    const saveLayout = () => {
      try {
        localStorage.setItem(storageKey(), JSON.stringify(homes));
      } catch {}
    };

    const keepInside = (b: Body, x: number, y: number): Vec => ({
      x: clamp(x, b.w / 2 + 6, W - b.w / 2 - 6),
      y: clamp(y, b.h / 2 + 6, H - b.h / 2 - 22),
    });

    // On the glass a photo grows to fit a box as wide as the glass and 1.12 times
    // as tall, keeping its shape, the same frame unfunnyket.com mounts photos in
    const fitScale = (b: Body) => Math.min(slotFit / b.w, (slotFit * 1.12) / b.h);

    const placeTargets = () => {
      for (const b of bodies) {
        if (!b.shown || drag?.b === b) continue;
        if (current === b.id) {
          b.tx = slot.x;
          b.ty = slot.y;
          b.tr = 0;
          b.ts = fitScale(b);
        } else {
          const home = homes[b.id];
          const p = keepInside(b, (home.x / 100) * W, (home.y / 100) * H);
          b.tx = p.x;
          b.ty = p.y;
          b.tr = b.tilt;
          b.ts = 1;
        }
      }
    };

    const buildRopes = () => {
      ropes.length = 0;
      const shown = bodies.filter((b) => b.shown);
      // Strung by where the photos start, so the threads stay put as photos move
      const nodes = shown.map((b) => {
        const at = defaults()[b.id];
        return { x: (at.x / 100) * W, y: (at.y / 100) * H };
      });
      for (const [i, j] of strings(nodes)) {
        const a = shown[i];
        const b = shown[j];
        const d = Math.hypot(nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y);
        const n = clamp(Math.round(d / 24), 6, 16);
        const pts = new Float32Array((n + 1) * 2);
        for (let k = 0; k <= n; k++) {
          pts[k * 2] = a.x + ((b.x - a.x) * k) / n;
          pts[k * 2 + 1] = a.y + ((b.y - a.y) * k) / n;
        }
        ropes.push({ a, b, n, pts, prev: pts.slice(), alpha: 0 });
      }
    };

    const writeTransform = (b: Body) => {
      const t = `translate3d(${(b.x - b.w / 2).toFixed(1)}px, ${(b.y - b.h / 2).toFixed(1)}px, 0) rotate(${b.r.toFixed(2)}deg) scale(${b.s.toFixed(3)})`;
      if (t === b.painted) return;
      b.painted = t;
      b.el.style.transform = t;
    };

    const measure = () => {
      W = scene.clientWidth;
      H = scene.clientHeight;
      if (!W) return;
      const nextMobile = W < MOBILE_BELOW;
      const modeChanged = first || nextMobile !== mobile;
      mobile = nextMobile;

      // Photo sizes are given for a 1440×900 screen; phones get them at under half
      const scale = mobile ? clamp(W / 390, 0.85, 1.15) * 0.45 : clamp(Math.min(W / 1440, H / 900), 0.62, 1.3);
      for (const b of bodies) {
        b.shown = !mobile || !!memories.find((m) => m.id === b.id)?.phone;
        b.el.style.display = b.shown ? "" : "none";
        b.w = Math.round(b.size * scale);
        b.h = Math.round(b.w / b.ratio);
        b.el.style.width = `${b.w}px`;
        b.el.style.height = `${b.h}px`;
        b.painted = "";
      }

      // The glass is a 240px square on a typical laptop, scaled by the same
      // breakpoints as unfunnyket.com; the CSS scales its corners and text with --k
      const k =
        H <= 600 || W < 380 ? 0.44 : W < 640 ? 0.5 : W < 900 ? 0.68 : W < 1200 ? 0.84 : W < 1600 ? 1 : 1.2;
      scene.style.setProperty("--k", String(k));
      const side = Math.round(240 * k);
      player.style.width = `${side}px`;
      player.style.height = `${side}px`;
      const sceneRect = scene.getBoundingClientRect();
      const pr = player.getBoundingClientRect();
      playerBox = {
        l: pr.left - sceneRect.left,
        t: pr.top - sceneRect.top,
        r: pr.right - sceneRect.left,
        b: pr.bottom - sceneRect.top,
      };
      // A loaded photo takes over the whole glass
      slot = { x: (playerBox.l + playerBox.r) / 2, y: (playerBox.t + playerBox.b) / 2 };
      slotFit = side;

      dpr = Math.min(window.devicePixelRatio || 1, coarse.matches ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (modeChanged) {
        scattered = null;
        loadLayout();
      }
      placeTargets();

      if (first) {
        first = false;
        // Each photo fades in just inside its own spot and settles outward, the ones
        // nearest the glass first, so the board ripples open from the middle. The
        // first few arrive from the avatar instead (see AvatarLink), so start in place
        const reach = Math.hypot(W, H) / 2;
        bodies.forEach((b) => {
          if (reducedMotion.matches || peek.has(b.id)) {
            Object.assign(b, { x: b.tx, y: b.ty, r: b.tr, s: b.ts });
            b.el.dataset.ready = "";
          } else {
            const d = Math.hypot(b.tx - slot.x, b.ty - slot.y);
            Object.assign(b, {
              x: b.tx + (slot.x - b.tx) * 0.18,
              y: b.ty + (slot.y - b.ty) * 0.18,
              r: b.tr * 0.4,
              s: 0.88,
              delay: 0.2 + (d / reach) * 0.5,
            });
          }
          writeTransform(b);
        });
      }
      if (modeChanged) buildRopes();
      wake();
    };

    const stepBodies = (dt: number) => {
      let motion = 0;
      for (const b of bodies) {
        if (!b.shown) continue;
        if (b.delay > 0) {
          b.delay -= dt;
          if (b.delay <= 0) b.el.dataset.ready = "";
          motion = 1;
          continue;
        }
        if (drag?.b === b) {
          // The held photo tracks the finger closely and swings with its speed
          const k = Math.min(1, dt * 28);
          const nx = b.x + (b.tx - b.x) * k;
          const ny = b.y + (b.ty - b.y) * k;
          b.vx = (nx - b.x) / dt;
          b.vy = (ny - b.y) / dt;
          b.x = nx;
          b.y = ny;
          const swing = reducedMotion.matches ? 0 : clamp(b.vx * 0.012, -10, 10);
          b.vr += (STIFFNESS * (b.tilt * 0.4 + swing - b.r) - DAMPING * b.vr) * dt;
          b.r += b.vr * dt;
          const lift = hotNow ? fitScale(b) * 0.92 : 1.05;
          b.vs += (STIFFNESS * (lift - b.s) - DAMPING * b.vs) * dt;
          b.s += b.vs * dt;
          motion = 1;
        } else if (reducedMotion.matches) {
          Object.assign(b, { x: b.tx, y: b.ty, r: b.tr, s: b.ts, vx: 0, vy: 0, vr: 0, vs: 0 });
        } else {
          b.vx += (STIFFNESS * (b.tx - b.x) - DAMPING * b.vx) * dt;
          b.vy += (STIFFNESS * (b.ty - b.y) - DAMPING * b.vy) * dt;
          b.vr += (STIFFNESS * (b.tr - b.r) - DAMPING * b.vr) * dt;
          b.vs += (STIFFNESS * (b.ts - b.s) - DAMPING * b.vs) * dt;
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          b.r += b.vr * dt;
          b.s += b.vs * dt;
          motion = Math.max(
            motion,
            Math.abs(b.vx) + Math.abs(b.vy) + Math.abs(b.vr) + Math.abs(b.tx - b.x) + Math.abs(b.ty - b.y),
          );
        }
        writeTransform(b);
      }
      return motion;
    };

    const stepRopes = () => {
      let motion = 0;
      const r2 = PUSH_RADIUS * PUSH_RADIUS;
      for (const rope of ropes) {
        const { pts, prev, n, a, b } = rope;
        const d = Math.hypot(b.x - a.x, b.y - a.y);
        // A touch of slack so each string sags a little
        const rest = (d * 1.03 + 6) / n;

        for (let k = 1; k < n; k++) {
          const i = k * 2;
          const x = pts[i];
          const y = pts[i + 1];
          const vx = (x - prev[i]) * ROPE_DAMPING;
          const vy = (y - prev[i + 1]) * ROPE_DAMPING;
          prev[i] = x;
          prev[i + 1] = y;
          pts[i] = x + vx;
          pts[i + 1] = y + vy + GRAVITY;
          motion = Math.max(motion, Math.abs(vx) + Math.abs(vy));

          if (pointer.active) {
            const dx = pts[i] - pointer.x;
            const dy = pts[i + 1] - pointer.y;
            const dd = dx * dx + dy * dy;
            if (dd < r2 && dd > 0.01) {
              const push = (PUSH_RADIUS - Math.sqrt(dd)) / Math.sqrt(dd);
              pts[i] += dx * push * 0.5;
              pts[i + 1] += dy * push * 0.5;
            }
          }
        }

        // Strings run between photo centres and hide behind them
        pts[0] = a.x;
        pts[1] = a.y;
        pts[n * 2] = b.x;
        pts[n * 2 + 1] = b.y;
        for (let pass = 0; pass < ROPE_PASSES; pass++) {
          for (let k = 0; k < n; k++) {
            const i = k * 2;
            const j = i + 2;
            const dx = pts[j] - pts[i];
            const dy = pts[j + 1] - pts[i + 1];
            const len = Math.hypot(dx, dy) || 1;
            const diff = (len - rest) / len / 2;
            if (k > 0) {
              pts[i] += dx * diff;
              pts[i + 1] += dy * diff;
            }
            if (k + 1 < n) {
              pts[j] -= dx * diff;
              pts[j + 1] -= dy * diff;
            }
          }
        }
      }
      return motion;
    };

    const trace = ({ pts, n }: Rope) => {
      ctx.moveTo(pts[0], pts[1]);
      for (let k = 1; k < n; k++) {
        const i = k * 2;
        ctx.quadraticCurveTo(pts[i], pts[i + 1], (pts[i] + pts[i + 2]) / 2, (pts[i + 1] + pts[i + 3]) / 2);
      }
      ctx.lineTo(pts[n * 2], pts[n * 2 + 1]);
    };

    /** Returns true while any string is still fading in */
    const drawRopes = (dt: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(238, 90, 144, 0.62)";

      // A string only shows once both its photos have arrived, and fades in
      let fading = false;
      ctx.beginPath();
      for (const rope of ropes) {
        const target = rope.a.delay <= 0 && rope.b.delay <= 0 ? 1 : 0;
        rope.alpha = reducedMotion.matches ? target : rope.alpha + (target - rope.alpha) * Math.min(1, dt * 4);
        if (rope.alpha > 0.99) trace(rope);
      }
      ctx.stroke();
      for (const rope of ropes) {
        if (rope.alpha <= 0.01 || rope.alpha > 0.99) continue;
        fading = true;
        ctx.globalAlpha = rope.alpha;
        ctx.beginPath();
        trace(rope);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      return fading;
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000 || STEP, 1 / 30);
      last = now;

      const bodyMotion = stepBodies(dt);
      acc += dt;
      let ropeMotion = 0;
      // Fixed steps keep the strings behaving the same at any refresh rate
      for (let i = 0; acc >= STEP && i < 3; i++) {
        ropeMotion = Math.max(ropeMotion, stepRopes());
        acc -= STEP;
      }
      if (acc > STEP) acc = 0;
      const fading = drawRopes(dt);

      quiet = !drag && !pointer.active && !fading && bodyMotion < 0.3 && ropeMotion < 0.01 ? quiet + 1 : 0;
      // Sleep once everything has come to rest; any interaction wakes it again
      if (quiet < 30 && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    function wake() {
      quiet = 0;
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const local = (e: PointerEvent): Vec => {
      const rect = scene.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const setHotState = (v: boolean) => {
      if (v === hotNow) return;
      hotNow = v;
      setHot(v);
    };

    const markLoaded = (id: string | null) => {
      for (const b of bodies) {
        if (b.id === id) b.el.dataset.loaded = "";
        else delete b.el.dataset.loaded;
      }
    };

    const load = (id: string) => {
      const m = memories.find((x) => x.id === id);
      const b = byId.get(id);
      if (!m || !b) return;
      current = id;
      b.el.style.zIndex = String(++z);
      markLoaded(id);
      setLoadedId(id);
      deck.sfx("drop");
      // A file that can't play just leaves the photo sitting silently on the glass
      if (m.track) deck.play(m.track.src).catch(() => {});
      placeTargets();
      wake();
    };

    /** `settle`: drop back to the base layer, so a photo whose home is under the glass slides back beneath it */
    const eject = (settle = true) => {
      if (!current) return;
      const b = byId.get(current);
      if (settle && b) b.el.style.zIndex = "";
      current = null;
      markLoaded(null);
      setLoadedId(null);
      deck.stop();
      placeTargets();
      wake();
    };

    apiRef.current = {
      activate: (id) => {
        deck.prime();
        if (current === id) eject();
        else load(id);
      },
      eject,
      reset: () => {
        try {
          localStorage.removeItem(storageKey());
        } catch {}
        // On phones a reset also deals a fresh scatter
        if (mobile) scattered = null;
        homes = defaults();
        if (mobile) buildRopes();
        placeTargets();
        wake();
      },
      leave: (done) => {
        if (scene.dataset.leaving !== undefined) return;
        scene.dataset.leaving = "";
        if (current) deck.stop();
        // Tells the avatar to have its photos out, ready to catch the glide home
        try {
          sessionStorage.setItem(RETURN_KEY, "1");
        } catch {}
        const wait = reducedMotion.matches ? 0 : LEAVE_MS;
        handoff.until = performance.now() + wait + GLIDE_MS;
        window.setTimeout(done, wait);
      },
    };

    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-memory]");
      const b = el && byId.get(el.dataset.memory!);
      if (!b || drag || e.button > 0) return;
      e.preventDefault();
      deck.prime();
      el.setPointerCapture(e.pointerId);
      const p = local(e);
      drag = { b, id: e.pointerId, gx: p.x - b.x, gy: p.y - b.y, sx: p.x, sy: p.y, moved: false };
      b.tx = b.x;
      b.ty = b.y;
      b.el.style.zIndex = String(++z);
      b.el.dataset.dragging = "";
      wake();
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      wake();
      if (!drag || e.pointerId !== drag.id) return;

      const { b } = drag;
      if (!drag.moved && Math.hypot(p.x - drag.sx, p.y - drag.sy) > 5) {
        drag.moved = true;
        deck.sfx("pick");
      }
      if (!drag.moved) return;

      let tx = p.x - drag.gx;
      let ty = p.y - drag.gy;
      const over = tx > playerBox.l && tx < playerBox.r && ty > playerBox.t && ty < playerBox.b;
      setHotState(over);
      if (over) {
        // Over the glass the photo is drawn toward its slot
        const pull = coarse.matches ? 0.34 : 0.24;
        tx += (slot.x - tx) * pull;
        ty += (slot.y - ty) * pull;
      }
      const inside = keepInside(b, tx, ty);
      b.tx = inside.x;
      b.ty = inside.y;
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") pointer.active = false;
      if (!drag || e.pointerId !== drag.id) return;
      const { b, moved } = drag;
      const dropOnPlayer = hotNow;
      drag = null;
      delete b.el.dataset.dragging;
      setHotState(false);

      // A tap changes nothing: a memory only plays when it is dragged onto the glass
      if (!moved) {
        placeTargets();
        wake();
        return;
      }
      if (dropOnPlayer) {
        if (current !== b.id) load(b.id);
      } else {
        // Dragged off the glass: it stays on top where it was put
        if (current === b.id) eject(false);
        homes[b.id] = { x: (b.tx / W) * 100, y: (b.ty / H) * 100 };
        saveLayout();
      }
      placeTargets();
      wake();
    };

    const onLeave = () => {
      if (!drag) pointer.active = false;
    };
    const onDragStart = (e: DragEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") eject();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scene);
    const onVisibility = () => {
      visible = !document.hidden;
      wake();
    };
    document.addEventListener("visibilitychange", onVisibility);

    scene.addEventListener("pointerdown", onDown);
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerup", onUp);
    scene.addEventListener("pointercancel", onUp);
    scene.addEventListener("pointerleave", onLeave);
    scene.addEventListener("dragstart", onDragStart);
    window.addEventListener("keydown", onKey);

    measure();

    return () => {
      cancelAnimationFrame(raf);
      root.style.overflow = prevOverflow;
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      scene.removeEventListener("pointerdown", onDown);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerup", onUp);
      scene.removeEventListener("pointercancel", onUp);
      scene.removeEventListener("pointerleave", onLeave);
      scene.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("keydown", onKey);
      deck.dispose();
      apiRef.current = null;
    };
  }, []);

  const onPhotoKey = (e: React.KeyboardEvent, id: string) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    apiRef.current?.activate(id);
  };

  return (
    <div
      ref={sceneRef}
      role="region"
      aria-label="Memories. Drag a photo onto the glass in the middle to hear its song, or drag photos anywhere to rearrange them. With a keyboard, press Enter on a photo to play it and Escape to stop."
      className="memory-scene fixed inset-0 z-50 touch-none overflow-hidden bg-[var(--background)] select-none"
    >
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />

      <Link
        ref={identityRef}
        href="/"
        onClick={(e) => {
          // Let new-tab clicks through untouched
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !apiRef.current) return;
          e.preventDefault();
          apiRef.current.leave(() => router.push("/"));
        }}
        className="absolute top-[5%] left-1/2 z-[15] flex -translate-x-1/2 items-center gap-3 rounded-md sm:top-[20%] sm:left-[34%] sm:translate-x-0"
      >
        <ViewTransition name="memories-identity" share="morph" default="none">
          <span className="flex items-center gap-3">
            <span className="relative block size-10 shrink-0 overflow-hidden rounded-full bg-[var(--tag-bg)]">
              <Image src="/himanshu.jpg" alt="" fill sizes="40px" className="object-cover object-[center_20%]" />
            </span>
            <span className="leading-tight whitespace-nowrap">
              <span className="block text-[14px] font-medium text-[var(--foreground)]">{site.name}</span>
              <span className="block text-[var(--muted-light)]">Software Engineer</span>
            </span>
          </span>
        </ViewTransition>
      </Link>

      <div
        ref={playerRef}
        data-hot={hot ? "" : undefined}
        data-loaded={loadedId ? "" : undefined}
        // Above the resting photos so they show through it softened; taps go through to them
        className="memory-glass pointer-events-none absolute top-1/2 left-1/2 z-[15] -translate-x-1/2 -translate-y-1/2"
      >
        <p className="absolute inset-0 m-auto grid h-fit max-w-[140px] place-content-center text-center">
          drop a memory here
          <br />
          see what it sounds like
        </p>
      </div>

      {memories.map((m) => (
        <button
          key={m.id}
          type="button"
          data-memory={m.id}
          aria-label={`${m.caption ?? m.alt}. ${loadedId === m.id ? "Playing; press to stop." : m.track ? `Press to play ${m.track.title}.` : "No song yet."}`}
          aria-pressed={loadedId === m.id}
          onKeyDown={(e) => onPhotoKey(e, m.id)}
          className="memory-photo absolute top-0 left-0 z-10 block cursor-grab outline-none"
        >
          <ViewTransition name={`memory-${m.id}`} share="morph" default="none">
            <span className="memory-photo-frame absolute inset-0">
              <Image
                src={m.photo}
                alt={m.alt}
                fill
                loading="eager"
                draggable={false}
                // Big enough to stay sharp when the photo is enlarged on the player
                sizes="360px"
                className="pointer-events-none object-cover"
              />
            </span>
          </ViewTransition>
          {m.caption && <span className="memory-caption">{m.caption}</span>}
        </button>
      ))}

      <button
        type="button"
        onClick={() => apiRef.current?.reset()}
        className="memory-reset absolute right-4 bottom-3 z-[15] text-[11px] text-[var(--muted-light)] hover:text-[var(--foreground)]"
      >
        reset layout
      </button>
    </div>
  );
}
