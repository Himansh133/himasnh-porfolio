"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import type { ActivityData } from "@/lib/activity";
import { useTheme } from "@/components/theme-provider";

type Platform = keyof ActivityData;

const TABS = [
  { id: "github", label: "GitHub", unit: "contributions" },
  { id: "leetcode", label: "LeetCode", unit: "submissions" },
  { id: "codeforces", label: "Codeforces", unit: "accepted problems" },
] as const;

// Burgundy scale built from the site accent, from empty to busiest day
const THEME = {
  light: ["#ebebee", "#f2ccd2", "#df8f9b", "#c14a5e", "#8c1427"],
  dark: ["#1a1a1d", "#3a1820", "#682030", "#a52b41", "#e0566e"],
};

const BLOCK_MARGIN = 3;
// Room the weekday labels take on the left
const LABEL_WIDTH = 28;
const WEEKS = 53;

type Tip = { x: number; y: number; count: number; date: string } | null;

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export function ActivityHeatmap({ data }: { data: ActivityData }) {
  const { theme } = useTheme();
  const [platform, setPlatform] = useState<Platform>("github");
  const [tip, setTip] = useState<Tip>(null);
  const [blockSize, setBlockSize] = useState(8);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tab = TABS.find((t) => t.id === platform)!;

  // Size the blocks so a year fits the column; narrow phones scroll instead
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const fit = () => {
      const pitch = Math.floor((wrap.clientWidth - LABEL_WIDTH) / WEEKS);
      setBlockSize(Math.max(6, Math.min(12, pitch - BLOCK_MARGIN)));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // When it does scroll, start at the most recent weeks
  useEffect(() => {
    const scroller = wrapRef.current?.querySelector<HTMLElement>("[class*='scroll'], div[style*='overflow']");
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, [platform, blockSize]);

  // The tooltip is fixed to the viewport, so it can't follow a scroll
  useEffect(() => {
    if (!tip) return;
    const hide = () => setTip(null);
    window.addEventListener("scroll", hide, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", hide, { capture: true });
  }, [tip]);

  const renderBlock = (block: React.ReactElement<React.SVGProps<SVGRectElement>>, activity: Activity) =>
    React.cloneElement(block, {
      onMouseEnter: (e: React.MouseEvent<SVGRectElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTip({ x: r.left + r.width / 2, y: r.top - 8, count: activity.count, date: activity.date });
      },
      onMouseLeave: () => setTip(null),
    });

  return (
    <section id="activity">
      <div className="mb-4 flex items-center gap-4 text-[13px]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setPlatform(t.id);
              setTip(null);
            }}
            className={`transition-colors ${
              platform === t.id
                ? "text-[var(--foreground)]"
                : "text-[var(--muted-light)] hover:text-[var(--foreground)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div ref={wrapRef} className="activity-calendar text-[var(--muted-light)]">
        <ActivityCalendar
          key={platform}
          data={data[platform]}
          theme={THEME}
          colorScheme={theme === "dark" ? "dark" : "light"}
          blockSize={blockSize}
          blockMargin={BLOCK_MARGIN}
          blockRadius={2}
          fontSize={11}
          showWeekdayLabels={["mon", "wed", "fri"]}
          labels={{
            totalCount: `{{count}} ${tab.unit} in the last year`,
            legend: { less: "less", more: "more" },
          }}
          renderBlock={renderBlock}
        />
      </div>

      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-[var(--foreground)] px-2.5 py-1.5 text-[11px] whitespace-nowrap text-[var(--background)] shadow-lg"
          style={{ left: tip.x, top: tip.y }}
        >
          <span className="font-medium">
            {tip.count === 0 ? "No" : tip.count} {tab.unit}
          </span>{" "}
          on {formatDate(tip.date)}
        </div>
      )}
    </section>
  );
}
