"use client";

import React from "react";
import { site } from "@/lib/site";

export function SkillsSection() {
  return (
    <section id="specs" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <h2 className="text-[28px] sm:text-[38px] font-semibold tracking-[-0.02em] leading-[1.1]">
            <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">Tech Specs. </span>
            <span className="text-[#6e6e73] dark:text-[#86868b]">
              Architecture and core competencies.
            </span>
          </h2>
        </div>

        {/* Apple Store Spec Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.skills.map((skillGroup) => (
            <div
              key={skillGroup.group}
              className="apple-card flex flex-col justify-between p-8"
            >
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {skillGroup.group}
                </h3>
                <p className="mt-1.5 text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
                  {skillGroup.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#f5f5f7] px-3.5 py-1.5 text-xs font-medium text-[#1d1d1f] dark:bg-[#232326] dark:text-[#f5f5f7] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/4 dark:border-white/8 text-[11px] text-[#86868b]">
                <span>{skillGroup.items.length} verified technologies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
