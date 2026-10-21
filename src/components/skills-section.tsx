"use client";

import React, { useState } from "react";
import { site } from "@/lib/site";

export function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState<string>("all");

  const marqueeItems = [
    { name: "C++17", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "TypeScript", category: "Languages" },
    { name: "FastAPI", category: "Frameworks" },
    { name: "Qt6", category: "Frameworks" },
    { name: "Next.js", category: "Frameworks" },
    { name: "React", category: "Frameworks" },
    { name: "Gemini API", category: "AI/ML" },
    { name: "LLM Agents", category: "AI/ML" },
    { name: "LangChain", category: "AI/ML" },
    { name: "Docker", category: "DevOps" },
    { name: "GitHub Actions", category: "DevOps" },
    { name: "PostgreSQL", category: "Databases" },
    { name: "Oracle Cloud (OCI)", category: "DevOps" },
    { name: "SCPI / GPIB", category: "Hardware" },
    { name: "Linux / Bash", category: "Systems" },
  ];

  return (
    <section id="stack" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Header */}
      <div className="mb-2">
        <h2 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Tech stack I use</span>
        </h2>
      </div>

      <p className="text-sm text-[var(--muted)] mb-6">
        Technologies and frameworks I engineer systems and products with.
      </p>

      {/* Infinite Smooth Marquee (ReactBits style) with Crimson Red dots */}
      <div className="marquee-container py-3 mb-8 border-y border-[var(--border)] bg-[var(--card)]/40">
        <div className="marquee-track">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-mono text-[var(--foreground)] shadow-xs shrink-0"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D21319]" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setActiveGroup("all")}
          className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
            activeGroup === "all"
              ? "bg-[#D21319] text-white shadow-xs"
              : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[#D21319]/30"
          }`}
        >
          All Tech
        </button>
        {site.skills.map((grp) => (
          <button
            key={grp.group}
            onClick={() => setActiveGroup(grp.group)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
              activeGroup === grp.group
                ? "bg-[#D21319] text-white shadow-xs"
                : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[#D21319]/30"
            }`}
          >
            {grp.group}
          </button>
        ))}
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {site.skills
          .filter((grp) => activeGroup === "all" || activeGroup === grp.group)
          .map((skillGroup) => (
            <div
              key={skillGroup.group}
              className="modern-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    {skillGroup.group}
                  </h3>
                  <span className="text-[11px] font-mono text-[var(--muted-light)]">
                    {skillGroup.items.length} items
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                  {skillGroup.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-[var(--tag-bg)] px-2.5 py-1 text-[11.5px] font-mono text-[var(--tag-fg)] border border-[var(--border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
