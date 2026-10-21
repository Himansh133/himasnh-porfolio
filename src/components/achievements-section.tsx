"use client";

import React from "react";
import { achievements } from "@/lib/site";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Header */}
      <div className="mb-2">
        <h2 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Achievements &amp; Certifications</span>
        </h2>
      </div>

      <p className="text-sm text-[var(--muted)] mb-8">
        Hackathon victories, algorithmic milestones, and enterprise certifications.
      </p>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className="modern-card p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#D21319] uppercase tracking-wider text-[11px]">
                  {item.badge}
                </span>
                <span className="font-mono text-[var(--muted)] text-[11px]">
                  {item.date}
                </span>
              </div>

              <h3 className="mt-3 text-base font-semibold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--muted-light)] mt-0.5">
                {item.subtitle}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                {item.description}
              </p>
            </div>

            {item.link && (
              <div className="mt-4 pt-3 border-t border-[var(--border)]">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#D21319] hover:opacity-80 hover:underline flex items-center gap-1"
                >
                  <span>Verify profile &amp; rating</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
