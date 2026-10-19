"use client";

import React from "react";
import { experiences } from "@/lib/site";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Apple Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.24em] text-neutral-400 dark:text-neutral-500 uppercase">
            Experience
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.035em] text-neutral-900 dark:text-white leading-[1.05]">
            Engineering at scale. From low-level C++ to open source SDKs.
          </h2>
        </div>

        {/* Apple Keynote Style Experience Flow (Minimal, hairline separated, no boxes) */}
        <div className="mt-16 divide-y divide-black/8 dark:divide-white/10">
          {experiences.map((exp, idx) => (
            <article key={idx} className="py-14 first:pt-0 last:pb-0">
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Company & Role Column */}
                <div className="lg:col-span-5">
                  <p className="text-xs font-medium text-[#86868b]">
                    {exp.period} · {exp.location}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                    {exp.company}
                  </h3>
                  <p className="mt-1 text-base text-[#0066cc] dark:text-[#2997ff]">
                    {exp.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#86868b] max-w-sm">
                    {exp.summary}
                  </p>

                  {/* Tech stack pills */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {exp.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#f5f5f7] px-2.5 py-1 text-[11px] font-normal text-neutral-600 dark:bg-[#1c1c1e] dark:text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bullets & Impact Column */}
                <div className="lg:col-span-7 space-y-4">
                  {exp.points.map((point, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base leading-7 text-neutral-700 dark:text-neutral-300 font-normal"
                    >
                      {point}
                    </p>
                  ))}

                  {exp.links && (
                    <div className="pt-4 flex flex-wrap gap-4">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
