"use client";

import React, { useEffect, useRef } from "react";
import {
  WAVELENGTH_MAX,
  WAVELENGTH_MIN,
  prismVertices,
  traceSpectrum,
  wavelengthToRgb,
  type Beam,
  type Prism,
  type Vec,
} from "@/lib/prism-optics";

const REST_ANGLE = (16 * Math.PI) / 180;
// Steep enough that the fan leaves the glass close to level and stays in the strip
const BEAM_RISE = (22 * Math.PI) / 180;
// How far the beam can be swung, as its direction of travel (negative rises)
const BEAM_MIN = (-48 * Math.PI) / 180;
const BEAM_MAX = (30 * Math.PI) / 180;
// The beam starts this far past the left edge, so the light arrives from outside
const BEAM_LEAD = 24;
// Bright packets travelling along the beam toward the glass
const PULSES = 3;
// Neighbouring colours that leave further apart than this are not joined
const MAX_BAND_ANGLE = 0.1;

// Prism size the pixel constants below were tuned for
const BASE_SIZE = 84;
// Pointer pushes the light aside
const PUSH = 26;
const PUSH_RADIUS = 60;

// Colour samples and points along each ribbon; fewer on small or touch screens
const QUALITY = {
  high: { samples: 72, segments: 96 },
  low: { samples: 44, segments: 60 },
};

type Mode = "move" | "rotate" | "source";

interface State {
  px: number;
  py: number;
  vx: number;
  vy: number;
  ang: number;
  av: number;
  /** Beam direction of travel and its angular velocity */
  ba: number;
  bav: number;
}

const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function pointInTriangle(p: Vec, [a, b, c]: Vec[]) {
  const s1 = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
  const s2 = (c.x - b.x) * (p.y - b.y) - (c.y - b.y) * (p.x - b.x);
  const s3 = (a.x - c.x) * (p.y - c.y) - (a.y - c.y) * (p.x - c.x);
  return (s1 >= 0 && s2 >= 0 && s3 >= 0) || (s1 <= 0 && s2 <= 0 && s3 <= 0);
}

export function PrismCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prismHitRef = useRef<HTMLDivElement>(null);
  const beamHitRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    // The light is drawn on its own layer at the same pixel density as the main
    // canvas, then blurred onto it
    const fan = document.createElement("canvas");
    const fanCtx = fan.getContext("2d");
    if (!fanCtx) return;
    const canBlur = typeof ctx.filter === "string";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const root = document.documentElement;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let size = BASE_SIZE;
    // Everything measured in pixels scales with the prism
    let scale = 1;
    let samples = QUALITY.high.samples;
    let segments = QUALITY.high.segments;
    let wavelengthStep = (WAVELENGTH_MAX - WAVELENGTH_MIN) / (samples - 1);
    // Smoothed frame time; the wide glow pass is dropped when frames run slow
    let frameMs = 16;
    let glow = true;
    let raf = 0;
    let last = 0;
    let visible = true;
    let time = 0;

    const st: State = { px: 0, py: 0, vx: 0, vy: 0, ang: REST_ANGLE, av: 0, ba: -BEAM_RISE, bav: 0 };
    const home = { x: 0, y: 0 };

    let mode: Mode | null = null;
    let grab = { x: 0, y: 0, angle: 0 };
    let dragTarget = { x: 0, y: 0, angle: 0 };
    let lean = 0;
    let hover: Mode | null = null;

    // Ribbon points, reused every frame
    let pts = new Float32Array(samples * (segments + 1) * 2);

    // Smoothed pointer, used to bend the light
    const ptr = { x: 0, y: 0, rawX: 0, rawY: 0, k: 0, kTarget: 0 };

    const layout = () => {
      size = Math.min(clamp(width * 0.15, 50, BASE_SIZE), height * 0.45);
      scale = size / BASE_SIZE;
      // Prism sits left of centre so the colours get most of the strip
      home.x = Math.max(width * 0.34, size * 1.9);
      home.y = height * 0.38;
    };

    const geometry = () => {
      const prism: Prism = { cx: st.px, cy: st.py, size, apex: Math.PI / 3, rotation: st.ang };
      // The beam always aims at the prism's upper-left face and pivots there
      const target = { x: st.px, y: st.py - size * 0.2 };
      const dir = { x: Math.cos(st.ba), y: Math.sin(st.ba) };
      const reach = (target.x + BEAM_LEAD) / dir.x;
      const beam: Beam = { origin: { x: target.x - dir.x * reach, y: target.y - dir.y * reach }, dir };
      return { prism, beam, target, reach };
    };

    const pointerAngle = (p: Vec, target: Vec) => Math.atan2(target.y - p.y, target.x - p.x);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      // Phones have dense screens and little GPU to spare; the light is blurred anyway
      dpr = Math.min(window.devicePixelRatio || 1, coarse.matches ? 1.5 : 2);
      const q = rect.width < 480 || coarse.matches ? QUALITY.low : QUALITY.high;
      samples = q.samples;
      segments = q.segments;
      wavelengthStep = (WAVELENGTH_MAX - WAVELENGTH_MIN) / (samples - 1);
      const firstLayout = width === 0;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      fan.width = canvas.width;
      fan.height = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fanCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (firstLayout) {
        st.px = home.x;
        st.py = home.y;
      }
      draw();
    };

    const hitTest = (p: Vec): Mode | null => {
      // Fingers need bigger targets than a mouse
      const touch = coarse.matches ? 1.4 : 1;
      const { prism, beam, reach } = geometry();
      const verts = prismVertices(prism);
      if (verts.some((v) => Math.hypot(p.x - v.x, p.y - v.y) < 18 * touch)) return "rotate";
      if (pointInTriangle(p, verts)) return "move";
      // Anywhere along the beam grabs it
      const rx = p.x - beam.origin.x;
      const ry = p.y - beam.origin.y;
      const along = rx * beam.dir.x + ry * beam.dir.y;
      const across = Math.abs(rx * beam.dir.y - ry * beam.dir.x);
      if (along > 0 && along < reach - size * 0.3 && across < 12 * touch) return "source";
      return null;
    };

    const draw = () => {
      const dark = root.classList.contains("dark");
      const { prism, beam, target } = geometry();
      const rays = traceSpectrum(prism, beam, samples);
      const verts = prismVertices(prism);
      const calm = reducedMotion.matches;
      const t = calm ? 0 : time;
      const ink = dark ? "255,255,255" : "29,29,31";
      const active = (m: Mode) => (mode === m || (!mode && hover === m) ? 1 : 0);

      ctx.clearRect(0, 0, width, height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";

      // White light arriving from beyond the left edge, gathering strength on its way in
      const entry = rays[0]?.entry ?? target;
      const edge = { x: 0, y: beam.origin.y + (beam.dir.y * BEAM_LEAD) / beam.dir.x };
      const held = active("source");
      const beamGrad = ctx.createLinearGradient(edge.x, edge.y, entry.x, entry.y);
      beamGrad.addColorStop(0, `rgba(${ink},0.15)`);
      beamGrad.addColorStop(0.5, `rgba(${ink},0.6)`);
      beamGrad.addColorStop(1, `rgba(${ink},${dark ? 1 : 0.85})`);
      ctx.strokeStyle = beamGrad;
      for (const [lw, alpha] of [
        [14, 0.04],
        [6, 0.1],
        [2.6, 0.22],
        [1.3 + 0.5 * held, 1],
      ] as const) {
        ctx.globalAlpha = alpha * (1 + 0.6 * held);
        ctx.lineWidth = lw * scale;
        ctx.beginPath();
        ctx.moveTo(beam.origin.x, beam.origin.y);
        ctx.lineTo(entry.x, entry.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Packets of light running along the beam into the glass
      if (!calm) {
        const pulseGrad = ctx.createLinearGradient(edge.x, edge.y, entry.x, entry.y);
        pulseGrad.addColorStop(0, `rgba(${ink},0)`);
        for (let k = 0; k < PULSES; k++) {
          const f = (t * 0.22 + k / PULSES) % 1;
          // Faint as it enters the strip, brightest just before the glass
          const peak = (dark ? 0.85 : 0.5) * Math.min(1, f * 2.5);
          pulseGrad.addColorStop(Math.max(0, f - 0.07), `rgba(${ink},0)`);
          pulseGrad.addColorStop(f, `rgba(${ink},${peak})`);
          pulseGrad.addColorStop(Math.min(1, f + 0.07), `rgba(${ink},0)`);
        }
        pulseGrad.addColorStop(1, `rgba(${ink},0)`);
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = 2.4 * scale;
        ctx.beginPath();
        ctx.moveTo(edge.x, edge.y);
        ctx.lineTo(entry.x, entry.y);
        ctx.stroke();
      }

      // Soft flare where the light strikes the glass
      const flareRadius = (dark ? 16 : 11) * scale;
      const flare = ctx.createRadialGradient(entry.x, entry.y, 0, entry.x, entry.y, flareRadius);
      const flareAlpha = (dark ? 0.4 : 0.14) * (0.85 + 0.15 * Math.sin(t * 2.1));
      flare.addColorStop(0, `rgba(${ink},${flareAlpha})`);
      flare.addColorStop(1, `rgba(${ink},0)`);
      ctx.fillStyle = flare;
      ctx.beginPath();
      ctx.arc(entry.x, entry.y, flareRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // Glass body
      ctx.beginPath();
      verts.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)));
      ctx.closePath();
      ctx.fillStyle = dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)";
      ctx.fill();

      // Flowing ribbons of light leaving the glass
      const need = rays.length * (segments + 1) * 2;
      if (pts.length < need) pts = new Float32Array(need);
      // The outermost colours fade out so the fan has soft edges instead of dark rims
      const edgeAt = (i: number) => Math.min(1, (i + 1) / 5, (rays.length - i) / 5);
      const alphaAt = (i: number, j: number) => {
        const u = j / segments;
        // Slow brightness packets drifting outward, out of step across the spectrum;
        // they grow in after the glass so the light leaves it at the brightness it had inside
        const ramp = Math.min(1, u * 6);
        const pulse = 0.72 + 0.28 * ramp * Math.sin(u * 5.5 - t * 0.8 + i * 0.18);
        const breathe = 0.9 + 0.1 * Math.sin(t * 0.4 + i * 0.05);
        return pulse * breathe * (1 - 0.2 * u) * edgeAt(i);
      };

      rays.forEach((ray, i) => {
        const nx = -ray.dir.y;
        const ny = ray.dir.x;
        // Long enough to run off the right edge, like the beam arriving from the left
        const length = Math.min(width * 1.6, (width + 40 - ray.exit.x) / Math.max(ray.dir.x, 0.3));
        for (let j = 0; j <= segments; j++) {
          const u = j / segments;
          const s = length * Math.pow(u, 1.2);
          const bx = ray.exit.x + ray.dir.x * s;
          const by = ray.exit.y + ray.dir.y * s;

          // Wave lengths and heights follow the prism, so small screens get the same shape
          const sw = s / scale;
          const ramp = 1 - Math.exp(-u * 5);
          let disp =
            (3.2 * Math.sin(sw * 0.021 - t * 0.9 + i * 0.21) +
              8 * Math.sin(sw * 0.0075 - t * 0.5 + 1.7 + i * 0.07)) *
            ramp *
            scale;

          // Light bends away from the pointer
          if (ptr.k > 0.001) {
            const dx = bx - ptr.x;
            const dy = by - ptr.y;
            const radius = PUSH_RADIUS * scale;
            const g = Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius));
            disp += ptr.k * PUSH * scale * g * Math.tanh((dx * nx + dy * ny) / 14);
          }

          const k = (i * (segments + 1) + j) * 2;
          pts[k] = bx + nx * disp;
          pts[k + 1] = by + ny * disp;
        }
      });

      fanCtx.clearRect(0, 0, width, height);

      // The spreading colours inside the glass, on the same layer as the ribbons so
      // they share one glow and meet them without a seam
      fanCtx.lineWidth = 1.5;
      for (let i = 0; i < rays.length; i++) {
        const a = rays[i];
        const b = rays[i + 1];
        fanCtx.globalAlpha = alphaAt(i, 0) * 0.95;
        const [r, g, bl] = wavelengthToRgb(a.wavelength);
        fanCtx.fillStyle = fanCtx.strokeStyle = `rgb(${r},${g},${bl})`;
        fanCtx.beginPath();
        fanCtx.moveTo(a.entry.x, a.entry.y);
        fanCtx.lineTo(a.exit.x, a.exit.y);
        if (b && Math.hypot(a.exit.x - b.exit.x, a.exit.y - b.exit.y) < 6) {
          fanCtx.lineTo(b.exit.x, b.exit.y);
          fanCtx.closePath();
          fanCtx.fill();
        }
        fanCtx.stroke();
      }

      for (let i = 0; i < rays.length; i++) {
        const a = rays[i];
        const b = rays[i + 1];
        const [r, g, bl] = wavelengthToRgb(a.wavelength);
        const color = `rgb(${r},${g},${bl})`;
        fanCtx.fillStyle = color;
        fanCtx.strokeStyle = color;
        fanCtx.lineWidth = 1.5;

        const joined =
          b &&
          a.wavelength - b.wavelength < wavelengthStep * 2.5 &&
          Math.abs(Math.atan2(a.dir.y, a.dir.x) - Math.atan2(b.dir.y, b.dir.x)) < MAX_BAND_ANGLE;

        for (let j = 0; j < segments; j++) {
          const alpha = (alphaAt(i, j) + alphaAt(i, j + 1)) / 2;
          fanCtx.globalAlpha = alpha;
          const p0 = (i * (segments + 1) + j) * 2;
          const p1 = p0 + 2;
          fanCtx.beginPath();
          fanCtx.moveTo(pts[p0], pts[p0 + 1]);
          fanCtx.lineTo(pts[p1], pts[p1 + 1]);
          if (joined) {
            const q0 = ((i + 1) * (segments + 1) + j) * 2;
            const q1 = q0 + 2;
            fanCtx.lineTo(pts[q1], pts[q1 + 1]);
            fanCtx.lineTo(pts[q0], pts[q0 + 1]);
            fanCtx.closePath();
            fanCtx.fill();
          } else {
            fanCtx.stroke();
          }
        }
      }
      fanCtx.globalAlpha = 1;

      // Soft glow underneath, then a tighter pass for the body of the light
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      if (canBlur) {
        if (glow) {
          ctx.filter = `blur(${4 * dpr}px)`;
          ctx.globalAlpha = dark ? 0.55 : 0.45;
          ctx.drawImage(fan, 0, 0, width, height);
        }
        ctx.filter = `blur(${0.8 * dpr}px)`;
        ctx.globalAlpha = dark ? 0.85 : 0.8;
        ctx.drawImage(fan, 0, 0, width, height);
        ctx.filter = "none";
      } else {
        ctx.globalAlpha = 0.9;
        ctx.drawImage(fan, 0, 0, width, height);
      }
      ctx.globalAlpha = 1;

      // Prism outline on top of the light
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      verts.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)));
      ctx.closePath();
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.22)";
      ctx.lineWidth = 1.25;
      ctx.stroke();

      // Handles on the prism corners
      ctx.fillStyle = `rgba(${ink},${0.3 + 0.6 * active("rotate")})`;
      for (const v of verts) {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 2.2 + active("rotate"), 0, Math.PI * 2);
        ctx.fill();
      }

      // Keep the touch targets on top of what they control
      const prismHit = prismHitRef.current;
      if (prismHit) {
        const box = size * 1.25;
        prismHit.style.width = `${box}px`;
        prismHit.style.height = `${box}px`;
        prismHit.style.transform = `translate(${st.px - box / 2}px, ${st.py - box / 2}px)`;
      }
      const beamHit = beamHitRef.current;
      if (beamHit) {
        const along = Math.max(0, Math.hypot(entry.x - beam.origin.x, entry.y - beam.origin.y) - size * 0.3);
        beamHit.style.width = `${along}px`;
        beamHit.style.transform = `translate(${beam.origin.x}px, ${beam.origin.y - 16}px) rotate(${st.ba}rad)`;
      }
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const elapsed = now - last;
      const dt = Math.min(elapsed / 1000 || 0.016, 1 / 30);
      last = now;
      time += dt;
      const calm = reducedMotion.matches;

      // Once dropped, the glow stays off so the light doesn't flicker between looks
      if (elapsed > 0 && elapsed < 200) frameMs += (elapsed - frameMs) * 0.05;
      if (glow && frameMs > 24) glow = false;

      // Where things want to rest: home, plus a slow idle drift
      const driftX = calm ? 0 : 6 * scale * Math.sin(now / 2300);
      const driftY = calm ? 0 : 4 * scale * Math.cos(now / 1900);
      const sway = calm ? 0 : 0.05 * Math.sin(now / 1400);

      const follow = Math.min(1, dt * 26);

      if (mode === "move") {
        const px = st.px;
        const py = st.py;
        st.px += (dragTarget.x - st.px) * follow;
        st.py += (dragTarget.y - st.py) * follow;
        st.vx = (st.px - px) / dt;
        st.vy = (st.py - py) / dt;
      } else {
        // Gentle spring home: a flung prism glides, overshoots and settles
        st.vx += (2.4 * (home.x + driftX - st.px) - 2.6 * st.vx) * dt;
        st.vy += (2.4 * (home.y + driftY - st.py) - 2.6 * st.vy) * dt;
        st.px += st.vx * dt;
        st.py += st.vy * dt;
      }

      if (mode === "rotate") {
        const prev = st.ang;
        st.ang += wrapAngle(dragTarget.angle - st.ang) * follow;
        st.av = (st.ang - prev) / dt;
      } else if (calm) {
        st.ang = REST_ANGLE + lean;
        st.av = 0;
      } else {
        const diff = wrapAngle(REST_ANGLE + lean + sway - st.ang);
        st.av += (40 * diff - 5.5 * st.av) * dt;
        st.ang += st.av * dt;
      }

      if (mode === "source") {
        const prev = st.ba;
        st.ba += (dragTarget.angle - st.ba) * follow;
        st.bav = (st.ba - prev) / dt;
      } else {
        // A released beam swings back to rest with a little overshoot
        const beamSway = calm ? 0 : 0.02 * Math.sin(now / 2100);
        st.bav += (7 * (-BEAM_RISE + beamSway - st.ba) - 3.6 * st.bav) * dt;
        st.ba += st.bav * dt;
      }

      // Keep everything inside the strip and the beam coming from the left
      st.px = clamp(st.px, width * 0.2, width * 0.7);
      st.py = clamp(st.py, height * 0.25, height * 0.78);
      st.ba = clamp(st.ba, BEAM_MIN, BEAM_MAX);

      // The light follows the pointer with a little lag
      ptr.x += (ptr.rawX - ptr.x) * Math.min(1, dt * 10);
      ptr.y += (ptr.rawY - ptr.y) * Math.min(1, dt * 10);
      ptr.k += (ptr.kTarget - ptr.k) * Math.min(1, dt * 4);

      draw();
    };

    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const local = (e: PointerEvent): Vec => {
      const rect = wrap.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const dismissHint = () => {
      if (hintRef.current) hintRef.current.style.opacity = "0";
    };

    const onDown = (e: PointerEvent) => {
      const p = local(e);
      const hit = hitTest(p);
      if (!hit) return;

      mode = hit;
      wrap.setPointerCapture(e.pointerId);
      wrap.style.cursor = "grabbing";
      ptr.kTarget = 0;
      dismissHint();

      if (hit === "move") {
        grab = { x: p.x - st.px, y: p.y - st.py, angle: 0 };
        dragTarget = { x: st.px, y: st.py, angle: st.ang };
      } else if (hit === "rotate") {
        grab = { x: 0, y: 0, angle: wrapAngle(Math.atan2(p.y - st.py, p.x - st.px) - st.ang) };
        dragTarget = { x: st.px, y: st.py, angle: st.ang };
      } else {
        // Keep the offset between finger and beam so grabbing never makes it jump
        grab = { x: 0, y: 0, angle: pointerAngle(p, geometry().target) - st.ba };
        dragTarget = { x: 0, y: 0, angle: st.ba };
      }
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      ptr.rawX = p.x;
      ptr.rawY = p.y;

      if (mode) {
        if (mode === "rotate") {
          dragTarget.angle = st.ang + wrapAngle(Math.atan2(p.y - st.py, p.x - st.px) - grab.angle - st.ang);
        } else if (mode === "source") {
          const target = geometry().target;
          // Past the glass the angle flips; hold the beam where it was
          if (p.x < target.x - 8) {
            dragTarget.angle = clamp(pointerAngle(p, target) - grab.angle, BEAM_MIN, BEAM_MAX);
          }
        } else {
          dragTarget.x = p.x - grab.x;
          dragTarget.y = p.y - grab.y;
        }
        return;
      }

      if (ptr.kTarget === 0) {
        // First touch of the field: start from the pointer, not from wherever it was last
        ptr.x = p.x;
        ptr.y = p.y;
      }
      ptr.kTarget = 1;

      if (e.pointerType === "mouse") {
        hover = hitTest(p);
        wrap.style.cursor = hover ? "grab" : "default";
        // Hovering the light leans the prism a little toward the pointer
        lean = clamp((p.y - height / 2) / (height / 2), -1, 1) * 0.2;
      }
    };

    const onUp = () => {
      mode = null;
      wrap.style.cursor = hover ? "grab" : "default";
    };

    const onLeave = () => {
      if (mode) return;
      ptr.kTarget = 0;
      hover = null;
      lean = 0;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      st.av += e.key === "ArrowRight" ? 3 : -3;
      dismissHint();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(wrap);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("keydown", onKey);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        role="img"
        tabIndex={0}
        aria-label="A prism splitting a beam of light into flowing colours. Drag the prism to move it, drag its corners to turn it, drag the beam to aim the light, or use the left and right arrow keys."
        className="relative h-44 w-full overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-[var(--muted-light)] sm:h-48"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 4%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 4%, black 94%, transparent)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        {/* Vertical swipes on the canvas still scroll the page */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 block h-full w-full"
          style={{ touchAction: "pan-y" }}
        />
        {/* Touch targets that keep the finger from scrolling while dragging */}
        <div
          ref={prismHitRef}
          aria-hidden
          className="absolute left-0 top-0"
          style={{ touchAction: "none" }}
        />
        <div
          ref={beamHitRef}
          aria-hidden
          className="absolute left-0 top-0 h-8 origin-left"
          style={{ touchAction: "none" }}
        />
      </div>
      <p
        ref={hintRef}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 text-[11px] text-[var(--muted-light)] transition-opacity duration-500"
      >
        drag the prism, turn its corners, swing the light
      </p>
    </div>
  );
}
