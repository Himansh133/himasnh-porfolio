"use client";

import React, { useState, useMemo } from "react";
import profilesData from "@/data/coding-profiles.json";
import { site } from "@/lib/site";

type Platform = "all" | "github" | "leetcode" | "codeforces";
type ColorMode = "brand" | "crimson";

interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function chunkIntoWeeks(data: HeatmapDay[]): HeatmapDay[][] {
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }
  return weeks;
}

export function CodingActivitySection() {
  const [platform, setPlatform] = useState<Platform>("all");
  const [colorMode, setColorMode] = useState<ColorMode>("brand");
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    platformName: string;
    unit: string;
  } | null>(null);

  // Exact data from verified fetched user profiles (chronologically ordered)
  const githubData = useMemo<HeatmapDay[]>(
    () => profilesData.github.contributions,
    []
  );
  const leetcodeData = useMemo<HeatmapDay[]>(
    () => profilesData.leetcode.contributions,
    []
  );
  const codeforcesData = useMemo<HeatmapDay[]>(
    () => profilesData.codeforces.contributions,
    []
  );

  const githubWeeks = useMemo(() => chunkIntoWeeks(githubData), [githubData]);
  const leetcodeWeeks = useMemo(() => chunkIntoWeeks(leetcodeData), [leetcodeData]);
  const codeforcesWeeks = useMemo(
    () => chunkIntoWeeks(codeforcesData),
    [codeforcesData]
  );

  // High-contrast, appealing color rendering for both light and dark mode
  const getCellBg = (level: number, platformId: "github" | "leetcode" | "codeforces") => {
    if (level === 0) {
      return "bg-[#ebedf0] dark:bg-[#181818] border border-[#d0d7de]/80 dark:border-[#2b2b2b] hover:border-neutral-400";
    }

    if (colorMode === "crimson") {
      switch (level) {
        case 1:
          return "bg-[#fecdd3] dark:bg-[#630d12] border border-[#fda4af] dark:border-[#8a131a] hover:brightness-110";
        case 2:
          return "bg-[#fb7185] dark:bg-[#9c141b] border border-[#f43f5e] dark:border-[#c71822] hover:brightness-110";
        case 3:
          return "bg-[#e11d48] dark:bg-[#d21319] shadow-[0_0_8px_rgba(210,19,25,0.4)] border border-[#be123c] dark:border-[#ff3b42] hover:brightness-110";
        case 4:
          return "bg-[#9f1239] dark:bg-[#ff2d34] shadow-[0_0_12px_rgba(255,45,52,0.6)] border border-[#881337] dark:border-white hover:brightness-110";
        default:
          return "bg-[#ebedf0] dark:bg-[#181818] border border-[#d0d7de]/80 dark:border-[#2b2b2b]";
      }
    }

    // Brand platform authentic colors with high vibrancy in both light and dark modes
    if (platformId === "github") {
      switch (level) {
        case 1:
          return "bg-[#9be9a8] dark:bg-[#0e4429] border border-[#7bc96f] dark:border-[#1b6b3e] hover:brightness-110";
        case 2:
          return "bg-[#40c463] dark:bg-[#006d32] border border-[#30a14e] dark:border-[#22c55e]/60 hover:brightness-110";
        case 3:
          return "bg-[#30a14e] dark:bg-[#26a641] shadow-[0_0_8px_rgba(38,166,65,0.35)] border border-[#216e39] dark:border-[#4ade80] hover:brightness-110";
        case 4:
          return "bg-[#216e39] dark:bg-[#39d353] shadow-[0_0_12px_rgba(57,211,83,0.55)] border border-[#1b5e20] dark:border-white hover:brightness-110";
        default:
          return "bg-[#ebedf0] dark:bg-[#181818] border border-[#d0d7de]/80 dark:border-[#2b2b2b]";
      }
    }

    if (platformId === "leetcode") {
      switch (level) {
        case 1:
          return "bg-[#a7f3d0] dark:bg-[#064e3b] border border-[#6ee7b7] dark:border-[#047857] hover:brightness-110";
        case 2:
          return "bg-[#34d399] dark:bg-[#047857] border border-[#10b981] dark:border-[#10b981]/60 hover:brightness-110";
        case 3:
          return "bg-[#10b981] dark:bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.35)] border border-[#059669] dark:border-[#34d399] hover:brightness-110";
        case 4:
          return "bg-[#047857] dark:bg-[#34d399] shadow-[0_0_12px_rgba(52,211,153,0.55)] border border-[#065f46] dark:border-white hover:brightness-110";
        default:
          return "bg-[#ebedf0] dark:bg-[#181818] border border-[#d0d7de]/80 dark:border-[#2b2b2b]";
      }
    }

    // Codeforces authentic activity green
    switch (level) {
      case 1:
        return "bg-[#bbf7d0] dark:bg-[#14532d] border border-[#86efac] dark:border-[#15803d] hover:brightness-110";
      case 2:
        return "bg-[#4ade80] dark:bg-[#16a34a] border border-[#22c55e] dark:border-[#22c55e]/60 hover:brightness-110";
      case 3:
        return "bg-[#22c55e] dark:bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.35)] border border-[#16a34a] dark:border-[#4ade80] hover:brightness-110";
      case 4:
        return "bg-[#15803d] dark:bg-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.55)] border border-[#166534] dark:border-white hover:brightness-110";
      default:
        return "bg-[#ebedf0] dark:bg-[#181818] border border-[#d0d7de]/80 dark:border-[#2b2b2b]";
    }
  };

  const renderHeatmapGrid = (
    weeks: HeatmapDay[][],
    platformId: "github" | "leetcode" | "codeforces",
    label: string,
    unit: string
  ) => {
    // Generate accurate month markers based on week columns
    const monthMarkers: { index: number; label: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, wIdx) => {
      if (week.length > 0) {
        const parts = week[0].date.split("-");
        const m = parseInt(parts[1], 10) - 1;
        if (
          m !== lastMonth &&
          wIdx - (monthMarkers[monthMarkers.length - 1]?.index ?? -10) >= 3
        ) {
          monthMarkers.push({ index: wIdx, label: MONTH_NAMES[m] });
          lastMonth = m;
        }
      }
    });

    return (
      <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        <div className="w-max mx-auto">
          {/* Month labels accurately positioned above week columns: Oct through Oct */}
          <div className="relative h-4 text-[10px] sm:text-[11px] font-mono font-medium text-[var(--muted)] mb-1 select-none">
            {monthMarkers.map((marker) => (
              <span
                key={`${marker.label}-${marker.index}`}
                className="absolute"
                style={{
                  left: `${24 + marker.index * 11.5}px`,
                }}
              >
                {marker.label}
              </span>
            ))}
          </div>

          <div className="flex gap-1 items-start">
            {/* Day of week labels aligned with rows: Mon(row 1), Wed(row 3), Fri(row 5) */}
            <div className="relative w-5 h-[79px] text-[9px] sm:text-[10px] font-mono text-[var(--muted-light)] select-none shrink-0">
              <span className="absolute top-[10px] right-0">Mon</span>
              <span className="absolute top-[33px] right-0">Wed</span>
              <span className="absolute top-[56px] right-0">Fri</span>
            </div>

            {/* All 53 Columns of High-Visibility Squares fitting 100% across the container */}
            <div className="flex gap-[2px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[2px] shrink-0">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() =>
                        setHoveredCell({
                          date: day.date,
                          count: day.count,
                          platformName: label,
                          unit,
                        })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`h-[9.5px] w-[9.5px] rounded-[1.5px] transition-all duration-150 hover:scale-135 cursor-pointer ${getCellBg(
                        day.level,
                        platformId
                      )}`}
                      title={`${day.count} ${unit} on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive footer and legend */}
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)] font-mono pt-2 border-t border-[var(--border)]">
            <div className="h-5 flex items-center">
              {hoveredCell && hoveredCell.platformName === label ? (
                <span className="text-[var(--foreground)]">
                  <strong className="text-[var(--foreground)] font-bold">{hoveredCell.count}</strong>{" "}
                  {hoveredCell.unit} on <span className="text-[var(--muted-light)]">{hoveredCell.date}</span>
                </span>
              ) : (
                <span className="text-[var(--muted-light)]">
                  Hover over squares to inspect daily contributions
                </span>
              )}
            </div>

            {/* Legend showing high contrast colors */}
            <div className="flex items-center gap-1.5 select-none">
              <span className="text-[10px]">Less</span>
              <span
                className={`h-2.5 w-2.5 rounded-[1.5px] ${getCellBg(
                  0,
                  platformId
                )}`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-[1.5px] ${getCellBg(
                  1,
                  platformId
                )}`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-[1.5px] ${getCellBg(
                  2,
                  platformId
                )}`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-[1.5px] ${getCellBg(
                  3,
                  platformId
                )}`}
              />
              <span
                className={`h-2.5 w-2.5 rounded-[1.5px] ${getCellBg(
                  4,
                  platformId
                )}`}
              />
              <span className="text-[10px]">More</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="activity" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h2 className="section-title-modern">
            <div className="corner-dots">
              <div className="dot top-left" />
              <div className="dot top-right" />
              <div className="dot bottom-left" />
              <div className="dot bottom-right" />
            </div>
            <span className="title-text">Coding Activity &amp; Heatmaps</span>
          </h2>
        </div>

        {/* Filter Controls: Platform & Color Theme */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Color Mode Switch */}
          <div className="flex rounded-lg border border-[var(--border)] bg-[var(--card)] p-1 text-xs">
            <button
              onClick={() => setColorMode("brand")}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                colorMode === "brand"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
              title="Official platform green colors matching your LeetCode and Codeforces profiles"
            >
              Native Colors
            </button>
            <button
              onClick={() => setColorMode("crimson")}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                colorMode === "crimson"
                  ? "bg-[#D21319] text-white shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
              title="Vibrant high-contrast crimson theme"
            >
              Crimson Theme
            </button>
          </div>

          {/* Platform Filter Tabs */}
          <div className="flex rounded-lg border border-[var(--border)] bg-[var(--card)] p-1 text-xs">
            {[
              { id: "all", label: "All Sites" },
              { id: "github", label: "GitHub" },
              { id: "leetcode", label: "LeetCode" },
              { id: "codeforces", label: "Codeforces" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPlatform(tab.id as Platform)}
                className={`rounded-md px-3 py-1 font-medium transition-all ${
                  platform === tab.id
                    ? "bg-[#D21319] text-white shadow-xs"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] mb-8">
        Live heatmaps and consistency metrics verified directly from your GitHub, LeetCode, and Codeforces profiles.
      </p>

      <div className="space-y-6">
        {/* 1. GITHUB HEATMAP */}
        {(platform === "all" || platform === "github") && (
          <div className="modern-card p-4 sm:p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0 shadow-xs">
                  {/* Official GitHub SVG Icon */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <span>GitHub Contributions</span>
                    <span className="text-xs font-mono font-normal text-[var(--muted)]">
                      @{profilesData.github.username}
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Commits, pull requests, code reviews, and open source repositories
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/25 font-semibold">
                  {profilesData.github.totalContributions} Contributions in the last year
                </span>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <span>Profile</span>
                  <svg
                    className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Heatmap Grid */}
            {renderHeatmapGrid(githubWeeks, "github", "GitHub", "contributions")}

            {/* Sub-stats breakdown */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-[var(--foreground)] font-mono">
                  {profilesData.github.totalContributions}
                </div>
                <div className="text-[10px] text-[var(--muted)]">Last Year Total</div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-emerald-500 dark:text-emerald-400 font-mono">
                  {profilesData.github.publicRepos}
                </div>
                <div className="text-[10px] text-[var(--muted)]">Public Repositories</div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-[var(--foreground)] font-mono">
                  3 PRs
                </div>
                <div className="text-[10px] text-[var(--muted)]">YC W25 Corsair SDK</div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-emerald-400 font-mono">
                  {profilesData.github.activeDays} Days
                </div>
                <div className="text-[10px] text-[var(--muted)]">Active Days</div>
              </div>
            </div>
          </div>
        )}

        {/* 2. LEETCODE HEATMAP */}
        {(platform === "all" || platform === "leetcode") && (
          <div className="modern-card p-4 sm:p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 shadow-xs">
                  {/* Official LeetCode SVG Icon */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.214 5.214 0 0 0-3.85-1.423c-1.488 0-2.889.582-3.87 1.564L3.414 12.06c-.982.981-1.564 2.382-1.564 3.87s.582 2.889 1.564 3.87l4.318 4.38c.982.982 2.382 1.564 3.87 1.564 1.488 0 2.889-.582 3.87-1.564l2.609-2.636c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9-.039z"
                      fill="#FFA116"
                    />
                    <path
                      d="M20.811 13.01H10.666c-.702 0-1.27.568-1.27 1.27s.568 1.27 1.27 1.27h10.145c.701 0 1.27-.568 1.27-1.27s-.569-1.27-1.27-1.27z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <span>LeetCode Submissions</span>
                    <span className="text-xs font-mono font-normal text-[var(--muted)]">
                      @{profilesData.leetcode.username}
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Algorithmic problem solving across DSA, Dynamic Programming, Graphs, and Trees
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 font-semibold">
                  Rating: {profilesData.leetcode.rating} | Top {profilesData.leetcode.topPercentage}%
                </span>
                <a
                  href={site.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <span>Profile</span>
                  <svg
                    className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Heatmap Grid */}
            {renderHeatmapGrid(leetcodeWeeks, "leetcode", "LeetCode", "submissions")}

            {/* Sub-stats breakdown matching user's actual profile */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-[var(--foreground)] font-mono">
                  {profilesData.leetcode.totalSolved} / 4,087
                </div>
                <div className="text-[10px] text-[var(--muted)]">
                  {profilesData.leetcode.easySolved} Easy • {profilesData.leetcode.mediumSolved} Med • {profilesData.leetcode.hardSolved} Hard
                </div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-amber-500 dark:text-amber-400 font-mono">
                  {profilesData.leetcode.submissionsPastYear}
                </div>
                <div className="text-[10px] text-[var(--muted)]">Submissions in Past Year</div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-emerald-500 dark:text-emerald-400 font-mono">
                  {profilesData.leetcode.streak} Days
                </div>
                <div className="text-[10px] text-[var(--muted)]">
                  Max Streak ({profilesData.leetcode.totalActiveDays} Active Days)
                </div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-[var(--foreground)] font-mono">
                  Rank #{profilesData.leetcode.ranking.toLocaleString()}
                </div>
                <div className="text-[10px] text-[var(--muted)]">
                  Global #{profilesData.leetcode.globalRanking.split("/")[0].trim()} ({profilesData.leetcode.attendedContests} Contests)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CODEFORCES HEATMAP */}
        {(platform === "all" || platform === "codeforces") && (
          <div className="modern-card p-4 sm:p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0 shadow-xs">
                  {/* Official Codeforces 3-bar SVG Logo */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="9" width="4.8" height="13" rx="1.2" fill="#EBB31B" />
                    <rect x="9.6" y="2" width="4.8" height="20" rx="1.2" fill="#1875D2" />
                    <rect x="17.2" y="6" width="4.8" height="16" rx="1.2" fill="#B71C1C" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
                    <span>Codeforces Contest Activity</span>
                    <span className="text-xs font-mono font-normal text-[var(--muted)]">
                      @{profilesData.codeforces.handle}
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Competitive programming rounds, Division 2 and Division 3
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/30 font-semibold">
                  {profilesData.codeforces.rank} ({profilesData.codeforces.rating})
                </span>
                <a
                  href={site.social.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <span>Profile</span>
                  <svg
                    className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Heatmap Grid */}
            {renderHeatmapGrid(codeforcesWeeks, "codeforces", "Codeforces", "accepted problems")}

            {/* Sub-stats breakdown matching user's actual profile screenshot */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-[var(--foreground)] font-mono">
                  {profilesData.codeforces.totalSolved} Problems
                </div>
                <div className="text-[10px] text-[var(--muted)]">Solved All Time &amp; Last Year</div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-emerald-500 dark:text-emerald-400 font-mono">
                  {profilesData.codeforces.rating}
                </div>
                <div className="text-[10px] text-[var(--muted)]">Contest Rating (Max {profilesData.codeforces.maxRating})</div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-[var(--foreground)] font-mono">
                  {profilesData.codeforces.maxStreak} Days Max
                </div>
                <div className="text-[10px] text-[var(--muted)]">{profilesData.codeforces.streakLastMonth} Days in Past Month</div>
              </div>
              <div className="rounded-lg bg-[var(--tag-bg)] p-2.5 border border-[var(--border)]">
                <div className="text-base font-bold text-emerald-400 font-mono">
                  {profilesData.codeforces.solvedLastMonth} Solved
                </div>
                <div className="text-[10px] text-[var(--muted)]">Last Month ({profilesData.codeforces.totalSubmissions} Total Submissions)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
