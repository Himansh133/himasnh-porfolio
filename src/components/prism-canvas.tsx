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
const BEAM_RISE = (8 * Math.PI) / 180;
const SAMPLES = 72;
const WAVELENGTH_STEP = (WAVELENGTH_MAX - WAVELENGTH_MIN) / (SAMPLES - 1);
// Neighbouring colours that leave further apart than this are not joined
const MAX_BAND_ANGLE = 0.1;
// Points along each colour ribbon
const SEGMENTS = 96;

// Pointer pushes the light aside
const PUSH = 26;
const PUSH_RADIUS = 60;

type Mode = "move" | "rotate" | "source";

interface State {
  px: number;
  py: number;
  vx: number;
  vy: number;
  ang: number;
  av: number;
  sx: number;
  sy: number;
  svx: number;
  svy: number;
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
  const sourceHitRef = useRef<HTMLDivElement>(null);
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
    const root = document.documentElement;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let size = 80;
    let raf = 0;
    let last = 0;
    let visible = true;
    let time = 0;

    const st: State = { px: 0, py: 0, vx: 0, vy: 0, ang: REST_ANGLE, av: 0, sx: 0, sy: 0, svx: 0, svy: 0 };
    const home = { x: 0, y: 0, sx: 0, sy: 0 };

    let mode: Mode | null = null;
    let grab = { x: 0, y: 0, angle: 0 };
    let dragTarget = { x: 0, y: 0, angle: 0 };
    let lean = 0;
    let hover: Mode | null = null;

    // Ribbon points, reused every frame
    let pts = new Float32Array(SAMPLES * (SEGMENTS + 1) * 2);

    // Smoothed pointer, used to bend the light
    const ptr = { x: 0, y: 0, rawX: 0, rawY: 0, k: 0, kTarget: 0 };

    const layout = () => {
      size = Math.min(92, height * 0.5);
      home.x = width * 0.4;
      home.y = height * 0.52;
      home.sx = width * 0.12;
      // A beam that rises slightly and crosses the prism's upper-left face
      home.sy = home.y - size * 0.2 + Math.tan(BEAM_RISE) * (home.x - home.sx);
    };

    const geometry = () => {
      const prism: Prism = { cx: st.px, cy: st.py, size, apex: Math.PI / 3, rotation: st.ang };
      const target = { x: st.px, y: st.py - size * 0.2 };
      const dx = target.x - st.sx;
      const dy = target.y - st.sy;
      const len = Math.hypot(dx, dy) || 1;
      const beam: Beam = { origin: { x: st.sx, y: st.sy }, dir: { x: dx / len, y: dy / len } };
      return { prism, beam };
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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
        st.sx = home.sx;
        st.sy = home.sy;
      }
      draw();
    };

    const hitTest = (p: Vec): Mode | null => {
      if (Math.hypot(p.x - st.sx, p.y - st.sy) < 22) return "source";
      const { prism } = geometry();
      const verts = prismVertices(prism);
      if (verts.some((v) => Math.hypot(p.x - v.x, p.y - v.y) < 18)) return "rotate";
      if (pointInTriangle(p, verts)) return "move";
      return null;
    };

    const draw = () => {
      const dark = root.classList.contains("dark");
      const { prism, beam } = geometry();
      const rays = traceSpectrum(prism, beam, SAMPLES);
      const verts = prismVertices(prism);
      const t = reducedMotion.matches ? 0 : time;

      ctx.clearRect(0, 0, width, height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.globalCompositeOperation = "source-over";

      // White beam into the glass
      const entry = rays[0]?.entry ?? { x: prism.cx, y: prism.cy };
      const beamGrad = ctx.createLinearGradient(beam.origin.x, beam.origin.y, entry.x, entry.y);
      const beamRgb = dark ? "255,255,255" : "29,29,31";
      beamGrad.addColorStop(0, `rgba(${beamRgb},0.25)`);
      beamGrad.addColorStop(1, `rgba(${beamRgb},${dark ? 0.95 : 0.8})`);
      for (const [lw, alpha] of [
        [9, 0.07],
        [4, 0.14],
        [1.6, 1],
      ] as const) {
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(beam.origin.x, beam.origin.y);
        ctx.lineTo(entry.x, entry.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Glass body
      ctx.beginPath();
      verts.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)));
      ctx.closePath();
      ctx.fillStyle = dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)";
      ctx.fill();

      // Colours travelling inside the glass
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (const ray of rays) {
        const [r, g, b] = wavelengthToRgb(ray.wavelength);
        ctx.strokeStyle = `rgba(${r},${g},${b},${dark ? 0.22 : 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ray.entry.x, ray.entry.y);
        ctx.lineTo(ray.exit.x, ray.exit.y);
        ctx.stroke();
      }

      // Flowing ribbons of light leaving the glass
      const length = width * 1.15;
      const need = rays.length * (SEGMENTS + 1) * 2;
      if (pts.length < need) pts = new Float32Array(need);
      const alphaAt = (i: number, j: number) => {
        const u = j / SEGMENTS;
        const fadeIn = Math.min(1, u * 14);
        const fadeOut = Math.pow(1 - u, 0.85);
        // Slow brightness packets drifting outward, out of step across the spectrum
        const pulse = 0.72 + 0.28 * Math.sin(u * 5.5 - t * 0.8 + i * 0.18);
        const breathe = 0.9 + 0.1 * Math.sin(t * 0.4 + i * 0.05);
        return fadeIn * fadeOut * pulse * breathe;
      };

      rays.forEach((ray, i) => {
        const nx = -ray.dir.y;
        const ny = ray.dir.x;
        for (let j = 0; j <= SEGMENTS; j++) {
          const u = j / SEGMENTS;
          const s = length * Math.pow(u, 1.2);
          const bx = ray.exit.x + ray.dir.x * s;
          const by = ray.exit.y + ray.dir.y * s;

          const ramp = 1 - Math.exp(-u * 5);
          let disp =
            (3.2 * Math.sin(s * 0.021 - t * 0.9 + i * 0.21) +
              8 * Math.sin(s * 0.0075 - t * 0.5 + 1.7 + i * 0.07)) *
            ramp;

          // Light bends away from the pointer
          if (ptr.k > 0.001) {
            const dx = bx - ptr.x;
            const dy = by - ptr.y;
            const g = Math.exp(-(dx * dx + dy * dy) / (2 * PUSH_RADIUS * PUSH_RADIUS));
            disp += ptr.k * PUSH * g * Math.tanh((dx * nx + dy * ny) / 14);
          }

          const k = (i * (SEGMENTS + 1) + j) * 2;
          pts[k] = bx + nx * disp;
          pts[k + 1] = by + ny * disp;
        }
      });

      fanCtx.clearRect(0, 0, width, height);
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
          a.wavelength - b.wavelength < WAVELENGTH_STEP * 2.5 &&
          Math.abs(Math.atan2(a.dir.y, a.dir.x) - Math.atan2(b.dir.y, b.dir.x)) < MAX_BAND_ANGLE;

        for (let j = 0; j < SEGMENTS; j++) {
          const alpha = (alphaAt(i, j) + alphaAt(i, j + 1)) / 2;
          fanCtx.globalAlpha = alpha;
          const p0 = (i * (SEGMENTS + 1) + j) * 2;
          const p1 = p0 + 2;
          fanCtx.beginPath();
          fanCtx.moveTo(pts[p0], pts[p0 + 1]);
          fanCtx.lineTo(pts[p1], pts[p1 + 1]);
          if (joined) {
            const q0 = ((i + 1) * (SEGMENTS + 1) + j) * 2;
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
        ctx.filter = `blur(${4 * dpr}px)`;
        ctx.globalAlpha = dark ? 0.55 : 0.45;
        ctx.drawImage(fan, 0, 0, width, height);
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

      // Handles: the light source and the prism corners
      const ink = dark ? "255,255,255" : "29,29,31";
      const active = (m: Mode) => (mode === m || (!mode && hover === m) ? 1 : 0);

      ctx.fillStyle = `rgba(${ink},${0.55 + 0.4 * active("source")})`;
      ctx.beginPath();
      ctx.arc(st.sx, st.sy, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(${ink},${0.15 + 0.5 * active("source")})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(st.sx, st.sy, 8 + 2 * active("source"), 0, Math.PI * 2);
      ctx.stroke();

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
      const sourceHit = sourceHitRef.current;
      if (sourceHit) sourceHit.style.transform = `translate(${st.sx - 22}px, ${st.sy - 22}px)`;
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000 || 0.016, 1 / 30);
      last = now;
      time += dt;
      const calm = reducedMotion.matches;

      // Where things want to rest: home, plus a slow idle drift
      const driftX = calm ? 0 : 6 * Math.sin(now / 2300);
      const driftY = calm ? 0 : 4 * Math.cos(now / 1900);
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
        const sx = st.sx;
        const sy = st.sy;
        st.sx += (dragTarget.x - st.sx) * follow;
        st.sy += (dragTarget.y - st.sy) * follow;
        st.svx = (st.sx - sx) / dt;
        st.svy = (st.sy - sy) / dt;
      } else {
        st.svx += (3 * (home.sx + driftX * 0.3 - st.sx) - 3 * st.svx) * dt;
        st.svy += (3 * (home.sy + driftY * 0.6 - st.sy) - 3 * st.svy) * dt;
        st.sx += st.svx * dt;
        st.sy += st.svy * dt;
      }

      // Keep everything inside the strip and the beam coming from the left
      st.px = clamp(st.px, width * 0.2, width * 0.7);
      st.py = clamp(st.py, height * 0.25, height * 0.78);
      st.sx = clamp(st.sx, width * 0.04, st.px - size * 1.1);
      st.sy = clamp(st.sy, height * 0.08, height * 0.92);

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
        grab = { x: p.x - st.sx, y: p.y - st.sy, angle: 0 };
        dragTarget = { x: st.sx, y: st.sy, angle: st.ang };
      }
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      ptr.rawX = p.x;
      ptr.rawY = p.y;

      if (mode) {
        if (mode === "rotate") {
          dragTarget.angle = st.ang + wrapAngle(Math.atan2(p.y - st.py, p.x - st.px) - grab.angle - st.ang);
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
        aria-label="A prism splitting a beam of light into flowing colours. Drag the prism to move it, drag its corners to turn it, drag the glowing dot to aim the light, or use the left and right arrow keys."
        className="relative h-44 w-full outline-none focus-visible:ring-1 focus-visible:ring-[var(--muted-light)] sm:h-48"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 4%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 4%, black 80%, transparent)",
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
          ref={sourceHitRef}
          aria-hidden
          className="absolute left-0 top-0 size-11"
          style={{ touchAction: "none" }}
        />
      </div>
      <p
        ref={hintRef}
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 text-[11px] text-[var(--muted-light)] transition-opacity duration-500"
      >
        drag the prism, turn its corners, move the light
      </p>
    </div>
  );
}
