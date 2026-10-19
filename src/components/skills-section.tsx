"use client";

import React, { useState } from "react";
import { site } from "@/lib/site";

export function SkillsSection() {
  const [activeSkillGroup, setActiveSkillGroup] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            Technical Arsenal
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Skills & Core Competencies
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Spanning low-level C++ systems and SCPI instrument protocols to autonomous LLM agent frameworks and cloud DevOps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.skills.map((skillGroup, idx) => {
            const isHovered = activeSkillGroup === idx;

            return (
              <div
                key={skillGroup.group}
                onMouseEnter={() => setActiveSkillGroup(idx)}
                onMouseLeave={() => setActiveSkillGroup(null)}
                className={`relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:border-neutral-800/90 dark:bg-[#0f1626]/80 ${
                  isHovered
                    ? "border-blue-500/60 -translate-y-1 dark:border-cyan-400/60"
                    : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {skillGroup.group}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {skillGroup.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-neutral-200 bg-neutral-100/80 px-3 py-1.5 text-xs font-medium text-neutral-800 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:border-cyan-400 dark:hover:bg-cyan-950/30 dark:hover:text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-neutral-100 pt-3 text-[11px] font-mono text-neutral-400 dark:border-neutral-800/60 dark:text-neutral-500">
                  {skillGroup.items.length} verified technologies
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
