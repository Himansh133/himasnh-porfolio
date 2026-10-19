"use client";

import React from "react";
import { achievements } from "@/lib/site";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 sm:py-28 bg-[#f5f5f7] dark:bg-[#000000] transition-colors">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <h2 className="text-[28px] sm:text-[38px] font-semibold tracking-[-0.02em] leading-[1.1]">
            <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">Honors & Leadership. </span>
            <span className="text-[#6e6e73] dark:text-[#86868b]">
              Recognitions, certifications, and community.
            </span>
          </h2>
        </div>

        {/* Apple Store Recognition Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="apple-card flex flex-col justify-between p-8 sm:p-9"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0066cc] dark:text-[#2997ff] uppercase tracking-[0.06em]">
                    {item.badge}
                  </span>
                  <span className="text-[#6e6e73] dark:text-[#86868b]">
                    {item.date}
                  </span>
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-[#6e6e73] dark:text-[#86868b]">
                  {item.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
              </div>

              {item.link && (
                <div className="mt-6 pt-4 border-t border-black/4 dark:border-white/8">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline flex items-center gap-1"
                  >
                    <span>View profile verification</span>
                    <span className="text-sm">›</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
