"use client";

import React from "react";
import { experiences } from "@/lib/site";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Modern Header */}
      <div className="mb-2">
        <h2 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Experience</span>
        </h2>
      </div>

      <p className="text-sm text-[var(--muted)] mb-8">
        Production systems engineering and open source contributions.
      </p>

      {/* Experience Cards */}
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <article
            key={idx}
            className="modern-card p-6 sm:p-7 relative overflow-hidden"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-[#D21319]">
                    {exp.company}
                  </span>
                  {exp.badge && (
                    <span className="inline-flex items-center rounded-full bg-[#D21319]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#D21319] border border-[#D21319]/25">
                      {exp.badge}
                    </span>
                  )}
                  <span className="text-xs text-[var(--muted)]">• {exp.location}</span>
                </div>
              </div>

              <span className="self-start sm:self-auto text-xs font-mono text-[var(--muted)] bg-[var(--tag-bg)] px-2.5 py-1 rounded-md border border-[var(--border)]">
                {exp.period}
              </span>
            </div>

            {/* Summary */}
            <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">
              {exp.summary}
            </p>

            {/* Bullet Points */}
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--foreground)]/90">
              {exp.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2.5">
                  <span className="text-[#D21319] mt-1 text-xs font-bold">▸</span>
                  <span className="leading-relaxed text-[13.5px] text-[var(--muted)]">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footer with Stack Tags & Links */}
            <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {exp.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-[var(--tag-bg)] px-2.5 py-1 text-[11px] font-mono text-[var(--tag-fg)] border border-[var(--border)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {exp.links && (
                <div className="flex items-center gap-3">
                  {exp.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#D21319] hover:opacity-80 hover:underline flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <span>↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
