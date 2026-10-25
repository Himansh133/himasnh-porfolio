"use cache";

import { cacheLife } from "next/cache";
import snapshot from "@/data/coding-profiles.json";
import { site } from "@/lib/site";

export interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

export interface ActivityData {
  github: HeatmapDay[];
  leetcode: HeatmapDay[];
  codeforces: HeatmapDay[];
}

const TIME_ZONE = "Asia/Kolkata";
const DAY_MS = 86_400_000;

const GITHUB_USER = site.social.github.split("/").pop()!;
const LEETCODE_USER = site.social.leetcode.split("/").pop()!;
const CODEFORCES_HANDLE = site.social.codeforces.split("/").pop()!;

// YYYY-MM-DD for an instant, as seen in the local time zone
function localDate(ms: number): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(ms);
}

function utcDate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

// Every date from the Sunday ~52 weeks back through today, so the grid
// always starts on a Sunday row and ends on the current day.
function dateWindow(): string[] {
  const today = Date.parse(`${localDate(Date.now())}T00:00:00Z`);
  let start = today - 364 * DAY_MS;
  start -= new Date(start).getUTCDay() * DAY_MS;

  const dates: string[] = [];
  for (let t = start; t <= today; t += DAY_MS) dates.push(utcDate(t));
  return dates;
}

// GitHub-style levels: quartiles of the non-zero counts in the window
function withLevels(dates: string[], counts: Map<string, number>): HeatmapDay[] {
  const nonZero = dates
    .map((d) => counts.get(d) ?? 0)
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  const q = (p: number) => nonZero[Math.floor((nonZero.length - 1) * p)] ?? 0;
  const cuts = [q(0.25), q(0.5), q(0.75)];

  return dates.map((date) => {
    const count = counts.get(date) ?? 0;
    const level = count === 0 ? 0 : 1 + cuts.filter((cut) => count > cut).length;
    return { date, count, level };
  });
}

function fromSnapshot(days: HeatmapDay[]): Map<string, number> {
  return new Map(days.map((d) => [d.date, d.count]));
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return res.json() as Promise<T>;
}

async function fetchGithub(): Promise<Map<string, number>> {
  const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
    headers: { "User-Agent": "portfolio-heatmap" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const html = await res.text();

  // Each day cell has a data-date and an id; its count lives in a <tool-tip for="id">
  const dateById = new Map<string, string>();
  for (const m of html.matchAll(/<td[^>]*?data-date="([\d-]+)"[^>]*?id="([^"]+)"/g)) {
    dateById.set(m[2], m[1]);
  }
  for (const m of html.matchAll(/<td[^>]*?id="([^"]+)"[^>]*?data-date="([\d-]+)"/g)) {
    dateById.set(m[1], m[2]);
  }

  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*?for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const date = dateById.get(m[1]);
    if (!date) continue;
    counts.set(date, Number(/^(\d+)/.exec(m[2])?.[1] ?? 0));
  }
  if (dateById.size === 0) throw new Error("GitHub calendar markup not found");
  return counts;
}

async function fetchLeetcode(dates: string[]): Promise<Map<string, number>> {
  const years = [...new Set([dates[0], dates[dates.length - 1]].map((d) => Number(d.slice(0, 4))))];
  const query = `query($u: String!, $y: Int) {
    matchedUser(username: $u) { userCalendar(year: $y) { submissionCalendar } }
  }`;

  const counts = new Map<string, number>();
  for (const year of years) {
    const body = await getJson<{
      data: { matchedUser: { userCalendar: { submissionCalendar: string } } | null };
    }>("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query, variables: { u: LEETCODE_USER, y: year } }),
    });
    const calendar = body.data.matchedUser?.userCalendar.submissionCalendar;
    if (!calendar) throw new Error("LeetCode calendar missing");

    // Keys are unix seconds at UTC midnight
    for (const [ts, count] of Object.entries(JSON.parse(calendar) as Record<string, number>)) {
      counts.set(utcDate(Number(ts) * 1000), count);
    }
  }
  return counts;
}

async function fetchCodeforces(): Promise<Map<string, number>> {
  const body = await getJson<{
    status: string;
    result: {
      creationTimeSeconds: number;
      verdict?: string;
      problem: { contestId?: number; problemsetName?: string; index: string };
    }[];
  }>(`https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}`);
  if (body.status !== "OK") throw new Error("Codeforces API error");

  // Distinct problems accepted per day
  const solvedByDay = new Map<string, Set<string>>();
  for (const sub of body.result) {
    if (sub.verdict !== "OK") continue;
    const date = localDate(sub.creationTimeSeconds * 1000);
    const problem = `${sub.problem.contestId ?? sub.problem.problemsetName}-${sub.problem.index}`;
    if (!solvedByDay.has(date)) solvedByDay.set(date, new Set());
    solvedByDay.get(date)!.add(problem);
  }
  return new Map([...solvedByDay].map(([date, set]) => [date, set.size]));
}

// Falls back to the committed snapshot if a platform is unreachable
async function orSnapshot(
  load: Promise<Map<string, number>>,
  days: HeatmapDay[],
  name: string
): Promise<Map<string, number>> {
  try {
    return await load;
  } catch (err) {
    console.warn(`[activity] ${name} fetch failed, using snapshot:`, err);
    return fromSnapshot(days);
  }
}

export async function getActivity(): Promise<ActivityData> {
  cacheLife("hours");

  const dates = dateWindow();
  const [github, leetcode, codeforces] = await Promise.all([
    orSnapshot(fetchGithub(), snapshot.github.contributions, "GitHub"),
    orSnapshot(fetchLeetcode(dates), snapshot.leetcode.contributions, "LeetCode"),
    orSnapshot(fetchCodeforces(), snapshot.codeforces.contributions, "Codeforces"),
  ]);

  return {
    github: withLevels(dates, github),
    leetcode: withLevels(dates, leetcode),
    codeforces: withLevels(dates, codeforces),
  };
}
