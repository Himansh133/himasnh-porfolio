"use client";

import React from "react";
import { site } from "@/lib/site";

export function SkillsSection() {
  return (
    <section id="specs" className="bg-[#f5f5f7] dark:bg-[#161617] py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-5xl px-6">
        {/* Apple Tech Specs Header */}
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-neutral-400 dark:text-neutral-500 uppercase">
            Technical Specifications
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.035em] text-neutral-900 dark:text-white leading-[1.05]">
            Architecture & Technologies.
          </h2>
          <p className="mt-4 text-lg text-[#86868b] max-w-xl">
            A comprehensive breakdown of engineering competencies across systems, backend, and machine learning.
          </p>
        </div>

        {/* Apple Tech Specs Table Layout (Zero boxes, pure hairline dividers) */}
        <div className="mt-16 divide-y divide-black/8 dark:divide-white/10 border-t border-b border-black/8 dark:border-white/10">
          {site.skills.map((skillGroup) => (
            <div
              key={skillGroup.group}
              className="grid gap-6 py-10 lg:grid-cols-12 items-baseline"
            >
              {/* Category */}
              <div className="lg:col-span-4">
                <h3 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {skillGroup.group}
                </h3>
                <p className="mt-1 text-xs text-[#86868b]">
                  {skillGroup.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="lg:col-span-8 flex flex-wrap gap-2.5">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:bg-[#2c2c2e] dark:text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
