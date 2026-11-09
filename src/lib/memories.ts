import data from "./memories.json";

export interface Track {
  title: string;
  artist: string;
  src: string;
}

export interface Memory {
  id: string;
  photo: string;
  alt: string;
  /** Width over height */
  ratio: number;
  /** Written under the photo */
  caption?: string;
  /** Missing only while there are no songs in the folder */
  track?: Track;
  /** Centre of the photo in % of the scene */
  at: { x: number; y: number };
  /** Width in px on a 1440×900 screen; scaled to fit others */
  size: number;
  /** Tilt in degrees */
  tilt: number;
  /** Shown on phones too, where the photos are scattered at random */
  phone: boolean;
}

// Generated from the files in public/memories by scripts/memories.mjs; edit the
// folder, not this list. Hand-tuning `at`, `size`, `tilt` or `phone` in the JSON
// is fine, the script keeps them
export const memories: Memory[] = data;

/** How many photos, picked at random, peek out above the avatar on the home page */
export const PEEK_COUNT = 3;

/** Below this width the scene switches to its phone layout */
export const MOBILE_BELOW = 640;

/** Session flag set when leaving the memories scene for home, so the avatar's photos are out to meet it */
export const RETURN_KEY = "memories-return";

/**
 * When the photos gliding home from the scene will have landed. Heavy drawing on the
 * home page waits for it, so the glide gets every frame
 */
export const handoff = { until: 0 };

/**
 * Marks the next page change as the memories portal opening or closing, so the
 * page transition (globals.css) reveals or shrinks the scene through a circle
 * centred on the avatar at (x, y)
 */
export function portal(direction: "open" | "close", x: number, y: number) {
  const root = document.documentElement;
  root.dataset.portal = direction;
  root.style.setProperty("--portal-x", `${Math.round(x)}px`);
  root.style.setProperty("--portal-y", `${Math.round(y)}px`);
  // Longer than the slowest part of the transition
  window.setTimeout(() => {
    if (root.dataset.portal === direction) delete root.dataset.portal;
  }, 1400);
}

/** The ids the avatar is showing, so the scene knows which photos glide over from it */
const PEEK_KEY = "memories-peek";

/** Picks the avatar's photos at random from those the scene shows at this width, and remembers them */
export function pickPeek(): string[] {
  const phone = window.innerWidth < MOBILE_BELOW;
  const pool = memories.filter((m) => !phone || m.phone).map((m) => m.id);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const ids = pool.slice(0, PEEK_COUNT);
  try {
    sessionStorage.setItem(PEEK_KEY, JSON.stringify(ids));
  } catch {}
  return ids;
}

/** The avatar's current photos, or the first few if it hasn't picked any */
export function readPeek(): Set<string> {
  try {
    const ids = JSON.parse(sessionStorage.getItem(PEEK_KEY) ?? "null");
    if (Array.isArray(ids) && ids.every((id) => memories.some((m) => m.id === id))) return new Set(ids);
  } catch {}
  return new Set(memories.slice(0, PEEK_COUNT).map((m) => m.id));
}
