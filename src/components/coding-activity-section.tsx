"use client";

import React, { useState, useMemo } from "react";
import profilesData from "@/data/coding-profiles.json";

type Platform = "github" | "leetcode" | "codeforces";

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
  const [platform, setPlatform] = useState<Platform>("github");
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
  const getCellBg = (level: number, platformId: Platform) => {
    if (level === 0) {
      return "bg-[#ebedf0] dark:bg-[#181818] border border-[#d0d7de]/80 dark:border-[#2b2b2b] hover:border-neutral-400";
    }

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
    platformId: Platform,
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
      <div className="w-full overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        <div className="w-max mx-auto">
          {/* Month labels accurately positioned above week columns */}
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

            {/* All 53 Columns of High-Visibility Squares */}
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

          {/* Minimal interactive footer and legend */}
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)] font-mono pt-2 border-t border-[var(--border)]">
            <div className="h-5 flex items-center">
              {hoveredCell && hoveredCell.platformName === label ? (
                <span className="text-[var(--foreground)]">
                  <strong className="text-[var(--foreground)] font-bold">{hoveredCell.count}</strong>{" "}
                  {hoveredCell.unit} on <span className="text-[var(--muted-light)]">{hoveredCell.date}</span>
                </span>
              ) : (
                <span className="text-[var(--muted-light)] text-[11px]">
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
      <div className="modern-card p-4 sm:p-5 relative overflow-hidden">
        {/* On top: just name github, leetcode, codeforces */}
        <div className="flex items-center gap-2 pb-4 mb-3 border-b border-[var(--border)]">
          {(
            [
              { id: "github", label: "GitHub" },
              { id: "leetcode", label: "LeetCode" },
              { id: "codeforces", label: "Codeforces" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPlatform(tab.id)}
              className={`rounded-md px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                platform === tab.id
                  ? "bg-[#D21319] text-white shadow-xs font-semibold"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--tag-bg)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Down there: just the heatmap */}
        {platform === "github" &&
          renderHeatmapGrid(githubWeeks, "github", "GitHub", "contributions")}
        {platform === "leetcode" &&
          renderHeatmapGrid(leetcodeWeeks, "leetcode", "LeetCode", "submissions")}
        {platform === "codeforces" &&
          renderHeatmapGrid(codeforcesWeeks, "codeforces", "Codeforces", "accepted problems")}
      </div>
    </section>
  );
}
