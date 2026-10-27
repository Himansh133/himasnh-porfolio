export interface Vec {
  x: number;
  y: number;
}

export interface Prism {
  cx: number;
  cy: number;
  /** Side length of the two equal faces, in pixels */
  size: number;
  /** Apex angle in radians */
  apex: number;
  /** Rotation around the centroid in radians (0 = apex pointing up) */
  rotation: number;
}

export interface Beam {
  origin: Vec;
  /** Unit vector */
  dir: Vec;
}

export interface SpectralRay {
  wavelength: number;
  /** Where the white beam enters the glass */
  entry: Vec;
  /** Where this colour leaves the glass */
  exit: Vec;
  /** Unit vector of the outgoing colour */
  dir: Vec;
}

// Stylised Cauchy glass: lower base index and a stronger colour spread than
// real flint glass, so the fan stays inside a short strip and reads clearly.
export const GLASS = { n0: 1.1, b: 0.05 };

export const WAVELENGTH_MIN = 400;
export const WAVELENGTH_MAX = 700;

export function refractiveIndex(wavelengthNm: number): number {
  const um = wavelengthNm / 1000;
  return GLASS.n0 + GLASS.b / (um * um);
}

const dot = (a: Vec, b: Vec) => a.x * b.x + a.y * b.y;

export function prismVertices(p: Prism): Vec[] {
  const s = Math.sin(p.apex / 2) * p.size;
  const c = Math.cos(p.apex / 2) * p.size;
  // Apex at the origin, base below; then centre on the centroid
  const raw: Vec[] = [
    { x: 0, y: 0 },
    { x: -s, y: c },
    { x: s, y: c },
  ];
  const cy = (raw[0].y + raw[1].y + raw[2].y) / 3;
  const cos = Math.cos(p.rotation);
  const sin = Math.sin(p.rotation);

  return raw.map((v) => {
    const x = v.x;
    const y = v.y - cy;
    return { x: p.cx + x * cos - y * sin, y: p.cy + x * sin + y * cos };
  });
}

interface Hit {
  t: number;
  point: Vec;
  /** Outward unit normal of the face that was hit */
  normal: Vec;
}

function nearestHit(origin: Vec, dir: Vec, verts: Vec[], centroid: Vec, minT: number): Hit | null {
  let best: Hit | null = null;

  for (let i = 0; i < verts.length; i++) {
    const a = verts[i];
    const b = verts[(i + 1) % verts.length];
    const ex = b.x - a.x;
    const ey = b.y - a.y;

    const denom = dir.x * ey - dir.y * ex;
    if (Math.abs(denom) < 1e-9) continue;

    const t = ((a.x - origin.x) * ey - (a.y - origin.y) * ex) / denom;
    const u = ((a.x - origin.x) * dir.y - (a.y - origin.y) * dir.x) / denom;
    if (t <= minT || u < 0 || u > 1) continue;
    if (best && t >= best.t) continue;

    const len = Math.hypot(ex, ey);
    let normal = { x: ey / len, y: -ex / len };
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    if (dot(normal, { x: mid.x - centroid.x, y: mid.y - centroid.y }) < 0) {
      normal = { x: -normal.x, y: -normal.y };
    }

    best = { t, point: { x: origin.x + dir.x * t, y: origin.y + dir.y * t }, normal };
  }

  return best;
}

/** Snell's law in vector form. `normal` must oppose `dir`. Null on total internal reflection. */
function refract(dir: Vec, normal: Vec, n1: number, n2: number): Vec | null {
  const eta = n1 / n2;
  const cosi = -dot(normal, dir);
  const sin2t = eta * eta * (1 - cosi * cosi);
  if (sin2t > 1) return null;
  const cost = Math.sqrt(1 - sin2t);
  const k = eta * cosi - cost;
  return { x: eta * dir.x + k * normal.x, y: eta * dir.y + k * normal.y };
}

const MAX_BOUNCES = 4;
const EPS = 1e-4;

/** Follow one wavelength through the prism. Null when it misses or never escapes. */
export function traceWavelength(prism: Prism, beam: Beam, wavelengthNm: number): SpectralRay | null {
  const verts = prismVertices(prism);
  const centroid = {
    x: (verts[0].x + verts[1].x + verts[2].x) / 3,
    y: (verts[0].y + verts[1].y + verts[2].y) / 3,
  };
  const n = refractiveIndex(wavelengthNm);

  const entryHit = nearestHit(beam.origin, beam.dir, verts, centroid, EPS);
  if (!entryHit) return null;

  let dir = refract(beam.dir, entryHit.normal, 1, n);
  if (!dir) return null;

  let point = entryHit.point;
  for (let bounce = 0; bounce < MAX_BOUNCES; bounce++) {
    const hit = nearestHit(point, dir, verts, centroid, EPS);
    if (!hit) return null;

    const out = refract(dir, { x: -hit.normal.x, y: -hit.normal.y }, n, 1);
    if (out) {
      return { wavelength: wavelengthNm, entry: entryHit.point, exit: hit.point, dir: out };
    }

    // Total internal reflection: bounce off the face and keep going
    const d = dot(dir, hit.normal);
    dir = { x: dir.x - 2 * d * hit.normal.x, y: dir.y - 2 * d * hit.normal.y };
    point = hit.point;
  }

  return null;
}

export function traceSpectrum(prism: Prism, beam: Beam, samples: number): SpectralRay[] {
  const rays: SpectralRay[] = [];
  for (let i = 0; i < samples; i++) {
    const wl = WAVELENGTH_MAX - ((WAVELENGTH_MAX - WAVELENGTH_MIN) * i) / (samples - 1);
    const ray = traceWavelength(prism, beam, wl);
    if (ray) rays.push(ray);
  }
  return rays;
}

/** Approximate visible-spectrum colour for a wavelength, as [r, g, b] in 0-255. */
export function wavelengthToRgb(wl: number): [number, number, number] {
  let r = 0;
  let g = 0;
  let b = 0;

  if (wl < 440) {
    r = -(wl - 440) / 60;
    b = 1;
  } else if (wl < 490) {
    g = (wl - 440) / 50;
    b = 1;
  } else if (wl < 510) {
    g = 1;
    b = -(wl - 510) / 20;
  } else if (wl < 580) {
    r = (wl - 510) / 70;
    g = 1;
  } else if (wl < 645) {
    r = 1;
    g = -(wl - 645) / 65;
  } else {
    r = 1;
  }

  // Fade the extremes of vision
  let f = 1;
  if (wl < 420) f = 0.35 + (0.65 * (wl - WAVELENGTH_MIN)) / 20;
  else if (wl > 680) f = 0.35 + (0.65 * (WAVELENGTH_MAX - wl)) / 20;

  return [Math.round(255 * r * f), Math.round(255 * g * f), Math.round(255 * b * f)];
}
