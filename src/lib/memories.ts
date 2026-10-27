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
  /** Written under the photo; leave out for none */
  caption?: string;
  /** One line shown in the player while the track plays */
  memory: string;
  track: Track;
  /** Centre of the photo in % of the scene */
  at: { x: number; y: number };
  /** Width in px on a 1440×900 screen; scaled to fit others */
  size: number;
  /** Tilt in degrees */
  tilt: number;
  /** Shown on phones too, where the photos are scattered at random */
  phone?: boolean;
}

// Sample loops; swap for your own files in public/memories/audio
const TRACKS = {
  roadTrip: { title: "Road Trip", artist: "Sample Loop", src: "/memories/audio/road-trip.wav" },
  sunday: { title: "Sunday", artist: "Sample Loop", src: "/memories/audio/sunday.wav" },
  firstDay: { title: "First Day", artist: "Sample Loop", src: "/memories/audio/first-day.wav" },
  home: { title: "Home", artist: "Sample Loop", src: "/memories/audio/home.wav" },
  monsoon: { title: "Monsoon", artist: "Sample Loop", src: "/memories/audio/monsoon.wav" },
  lateNight: { title: "Late Night", artist: "Sample Loop", src: "/memories/audio/late-night.wav" },
} satisfies Record<string, Track>;

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

const P = (n: number) => `/memories/photos/p${String(n).padStart(2, "0")}.jpg`;
const PORTRAIT = 4 / 5;
const TALL = 3 / 4;
const SQUARE = 1;
const WIDE = 4 / 3;

// Sample photos from Unsplash (via picsum). Replace the files and the text. `at`
// places each photo on larger screens; on phones the `phone` ones are scattered.
export const memories: Memory[] = [
  { id: "m01", photo: P(1), alt: "Sample photo", ratio: PORTRAIT, memory: "The first week in a new city, when everything still felt like a holiday.", track: TRACKS.roadTrip, at: { x: 8, y: 20 }, size: 112, tilt: -4, phone: true },
  { id: "m02", photo: P(2), alt: "A deep blue fjord between steep cliffs", ratio: WIDE, caption: "the fjord", memory: "We drove until the road ran out, then sat on the edge and said nothing for an hour.", track: TRACKS.roadTrip, at: { x: 19, y: 18 }, size: 160, tilt: 6, phone: true },
  { id: "m03", photo: P(3), alt: "Sample photo", ratio: PORTRAIT, memory: "Somebody's terrace, somebody's speaker, nobody wanted to go home.", track: TRACKS.lateNight, at: { x: 28.5, y: 25 }, size: 118, tilt: 2, phone: true },
  { id: "m04", photo: P(4), alt: "Sample photo", ratio: SQUARE, memory: "Breakfast tasted better because the day had nowhere to be.", track: TRACKS.sunday, at: { x: 47, y: 14 }, size: 112, tilt: -5 },
  { id: "m05", photo: P(5), alt: "Sample photo", ratio: PORTRAIT, memory: "Lights on the trees and the whole street out walking.", track: TRACKS.lateNight, at: { x: 61, y: 23 }, size: 124, tilt: 4, phone: true },
  { id: "m06", photo: P(6), alt: "Sample photo", ratio: WIDE, memory: "Long lunch under the big trees, then a nap on the grass.", track: TRACKS.sunday, at: { x: 79, y: 21 }, size: 210, tilt: -5 },
  { id: "m07", photo: P(7), alt: "Sample photo", ratio: SQUARE, memory: "Front row, ears ringing for two days after.", track: TRACKS.lateNight, at: { x: 93, y: 23 }, size: 108, tilt: 5 },
  { id: "m08", photo: P(8), alt: "A pug wrapped in a checked blanket in the woods", ratio: PORTRAIT, caption: "cold morning", memory: "Nobody wanted to leave the blanket, least of all him.", track: TRACKS.sunday, at: { x: 8, y: 49 }, size: 112, tilt: -3, phone: true },
  { id: "m09", photo: P(9), alt: "Sample photo", ratio: TALL, memory: "Trying on a hat I was never going to buy.", track: TRACKS.home, at: { x: 18.5, y: 53 }, size: 118, tilt: 4 },
  { id: "m10", photo: P(10), alt: "Sample photo", ratio: WIDE, memory: "The room where most of the good ideas happened, and most of the bad ones.", track: TRACKS.home, at: { x: 30, y: 50 }, size: 150, tilt: -5, phone: true },
  { id: "m11", photo: P(11), alt: "Sample photo", ratio: TALL, memory: "We lost each other in the crowd and found each other by the stage.", track: TRACKS.lateNight, at: { x: 62, y: 52 }, size: 170, tilt: -4 },
  { id: "m12", photo: P(12), alt: "Sample photo", ratio: PORTRAIT, memory: "Matching outfits, completely by accident.", track: TRACKS.roadTrip, at: { x: 83, y: 52 }, size: 200, tilt: 3, phone: true },
  { id: "m13", photo: P(13), alt: "Sample photo", ratio: TALL, caption: "home", memory: "The road to the farm, the same as it was twenty years ago.", track: TRACKS.home, at: { x: 94, y: 48 }, size: 112, tilt: -5 },
  { id: "m14", photo: P(14), alt: "Granite cliffs above a forest and a still river", ratio: TALL, caption: "the valley", memory: "It rained the whole trek and it is still the best week of that year.", track: TRACKS.monsoon, at: { x: 13, y: 72 }, size: 168, tilt: 6, phone: true },
  { id: "m15", photo: P(15), alt: "Sample photo", ratio: PORTRAIT, memory: "Everyone talking at once, nobody listening, perfect.", track: TRACKS.lateNight, at: { x: 13, y: 90 }, size: 190, tilt: -3 },
  { id: "m16", photo: P(16), alt: "Sample photo", ratio: WIDE, memory: "Driving the old tractor with no idea how to stop it.", track: TRACKS.home, at: { x: 25, y: 88 }, size: 132, tilt: 4 },
  { id: "m17", photo: P(17), alt: "Sample photo", ratio: TALL, memory: "Watching the sun go down until it got cold.", track: TRACKS.monsoon, at: { x: 33, y: 70 }, size: 196, tilt: -4, phone: true },
  { id: "m18", photo: P(18), alt: "Sample photo", ratio: PORTRAIT, memory: "Mum's cooking after three months away.", track: TRACKS.home, at: { x: 34, y: 91 }, size: 160, tilt: 3 },
  { id: "m19", photo: P(19), alt: "Sample photo", ratio: TALL, memory: "A desk, a lamp and a deadline at 4am.", track: TRACKS.firstDay, at: { x: 45, y: 84 }, size: 140, tilt: -4 },
  { id: "m20", photo: P(20), alt: "Pour-over coffee being brewed into a glass carafe", ratio: TALL, caption: "first coffee", memory: "First day at the new desk. The coffee was terrible and I loved it anyway.", track: TRACKS.firstDay, at: { x: 55, y: 89 }, size: 112, tilt: 5, phone: true },
  { id: "m21", photo: P(21), alt: "Sample photo", ratio: PORTRAIT, memory: "The office after everyone left, finally quiet.", track: TRACKS.firstDay, at: { x: 67, y: 81 }, size: 170, tilt: -3 },
  { id: "m22", photo: P(22), alt: "An orange jellyfish drifting in blue water", ratio: TALL, caption: "aquarium, 2am", memory: "The night we missed the last metro and stayed out until the sky went light.", track: TRACKS.lateNight, at: { x: 78, y: 78 }, size: 120, tilt: -6, phone: true },
  { id: "m23", photo: P(23), alt: "Sample photo", ratio: PORTRAIT, memory: "A temple, a long queue, and the best mango I have ever had.", track: TRACKS.roadTrip, at: { x: 93, y: 74 }, size: 112, tilt: 4 },
  { id: "m24", photo: P(24), alt: "A crate of bright red strawberries", ratio: WIDE, caption: "summer market", memory: "Half of them never made it home.", track: TRACKS.sunday, at: { x: 87, y: 91 }, size: 190, tilt: 3, phone: true },
];
