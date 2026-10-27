"use client";

import React, { useState, useMemo } from "react";
import type { ActivityData, HeatmapDay } from "@/lib/activity";

type Platform = keyof ActivityData;

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

export function ActivityHeatmap({ data }: { data: ActivityData }) {
  const [platform, setPlatform] = useState<Platform>("github");
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    platformName: string;
    unit: string;
  } | null>(null);

  // Data starts on a Sunday, so each chunk of 7 is one calendar week
  const githubWeeks = useMemo(() => chunkIntoWeeks(data.github), [data.github]);
  const leetcodeWeeks = useMemo(() => chunkIntoWeeks(data.leetcode), [data.leetcode]);
  const codeforcesWeeks = useMemo(
    () => chunkIntoWeeks(data.codeforces),
    [data.codeforces]
  );

  // Flat GitHub-style scale, readable in both themes
  const getCellBg = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#9be9a8] dark:bg-[#0e4429]";
      case 2:
        return "bg-[#40c463] dark:bg-[#006d32]";
      case 3:
        return "bg-[#30a14e] dark:bg-[#26a641]";
      case 4:
        return "bg-[#216e39] dark:bg-[#39d353]";
      default:
        return "bg-[#e8e8ec] dark:bg-[#1c1c1f]";
    }
  };

  const renderHeatmapGrid = (
    weeks: HeatmapDay[][],
    label: string,
    unit: string
  ) => {
    const total = weeks.flat().reduce((sum, day) => sum + day.count, 0);

    // Month markers based on week columns
    const monthMarkers: { index: number; label: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, wIdx) => {
      if (week.length > 0) {
        const m = parseInt(week[0].date.split("-")[1], 10) - 1;
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
      <div className="w-full overflow-x-auto pb-1">
        <div className="w-max">
          <div className="relative mb-1 h-4 select-none text-[10px] text-[var(--muted-light)]">
            {monthMarkers.map((marker) => (
              <span
                key={`${marker.label}-${marker.index}`}
                className="absolute"
                style={{ left: `${24 + marker.index * 10}px` }}
              >
                {marker.label}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-1">
            {/* Mon / Wed / Fri rows, 10px pitch */}
            <div className="relative h-[68px] w-5 shrink-0 select-none text-[9px] text-[var(--muted-light)]">
              <span className="absolute right-0 top-[8px]">Mon</span>
              <span className="absolute right-0 top-[28px]">Wed</span>
              <span className="absolute right-0 top-[48px]">Fri</span>
            </div>

            <div className="flex gap-[2px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex shrink-0 flex-col gap-[2px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      onMouseEnter={() =>
                        setHoveredCell({
                          date: day.date,
                          count: day.count,
                          platformName: label,
                          unit,
                        })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`h-2 w-2 rounded-[2px] ${getCellBg(day.level)}`}
                      title={`${day.count} ${unit} on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--muted-light)]">
            <span className="h-4">
              {hoveredCell && hoveredCell.platformName === label ? (
                <>
                  <span className="text-[var(--foreground)]">{hoveredCell.count}</span>{" "}
                  {hoveredCell.unit} on {hoveredCell.date}
                </>
              ) : (
                <>
                  {total} {unit} in the last year
                </>
              )}
            </span>

            <span className="flex select-none items-center gap-1">
              less
              {[0, 1, 2, 3, 4].map((level) => (
                <span key={level} className={`size-2 rounded-[2px] ${getCellBg(level)}`} />
              ))}
              more
            </span>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "github", label: "GitHub" },
    { id: "leetcode", label: "LeetCode" },
    { id: "codeforces", label: "Codeforces" },
  ] as const;

  return (
    <section id="activity">
      <div className="mb-4 flex items-center gap-4 text-[13px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPlatform(tab.id)}
            className={`transition-colors ${
              platform === tab.id
                ? "text-[var(--foreground)]"
                : "text-[var(--muted-light)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {platform === "github" && renderHeatmapGrid(githubWeeks, "GitHub", "contributions")}
      {platform === "leetcode" && renderHeatmapGrid(leetcodeWeeks, "LeetCode", "submissions")}
      {platform === "codeforces" &&
        renderHeatmapGrid(codeforcesWeeks, "Codeforces", "accepted problems")}
    </section>
  );
}
