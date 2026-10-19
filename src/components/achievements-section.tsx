"use client";

import React from "react";
import { achievements } from "@/lib/site";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-neutral-400 dark:text-neutral-500 uppercase">
            Honors & Leadership
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.035em] text-neutral-900 dark:text-white leading-[1.05]">
            Recognitions & Leadership.
          </h2>
        </div>

        {/* Clean Apple List */}
        <div className="mt-16 divide-y divide-black/8 dark:divide-white/10 border-t border-b border-black/8 dark:border-white/10">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="grid gap-6 py-10 lg:grid-cols-12 items-baseline"
            >
              {/* Date & Badge */}
              <div className="lg:col-span-3">
                <span className="text-xs font-medium text-[#86868b]">
                  {item.date}
                </span>
                <p className="mt-1 text-xs font-semibold text-[#0066cc] dark:text-[#2997ff]">
                  {item.badge}
                </p>
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-9">
                <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-[#86868b] mt-0.5">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>

                {item.link && (
                  <div className="mt-4">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline flex items-center gap-1"
                    >
                      <span>View verification</span>
                      <span>›</span>
                    </a>
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
