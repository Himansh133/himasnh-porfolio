"use client";

import React from "react";
import { experiences } from "@/lib/site";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#f5f5f7] dark:bg-[#000000] transition-colors">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <h2 className="text-[28px] sm:text-[38px] font-semibold tracking-[-0.02em] leading-[1.1]">
            <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">Engineering Experience. </span>
            <span className="text-[#6e6e73] dark:text-[#86868b]">
              Production systems and open-source impact.
            </span>
          </h2>
        </div>

        {/* Apple Store Feature Cards Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="apple-card flex flex-col justify-between p-8 sm:p-10"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between text-xs text-[#6e6e73] dark:text-[#86868b]">
                  <span className="font-semibold uppercase tracking-[0.06em]">
                    {exp.period}
                  </span>
                  <span>{exp.location}</span>
                </div>

                {/* Company & Role */}
                <h3 className="mt-4 text-[26px] font-semibold tracking-[-0.015em] leading-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {exp.company}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#0066cc] dark:text-[#2997ff]">
                  {exp.role}
                </p>

                {/* Summary */}
                <p className="mt-4 text-[15px] leading-relaxed text-[#6e6e73] dark:text-[#86868b]">
                  {exp.summary}
                </p>

                {/* Bullet Points */}
                <div className="mt-6 space-y-3.5 border-t border-black/4 pt-6 dark:border-white/8">
                  {exp.points.map((pt, pIdx) => (
                    <div key={pIdx} className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                      {pt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack & Links */}
              <div className="mt-8 pt-6 border-t border-black/4 dark:border-white/8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] text-neutral-600 dark:bg-[#232326] dark:text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {exp.links && (
                  <div className="flex gap-4">
                    {exp.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline flex items-center gap-1"
                      >
                        <span>{link.label}</span>
                        <span>›</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
