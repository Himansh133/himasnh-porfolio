"use client";

import React from "react";
import { experiences } from "@/lib/site";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 border-t border-black/5 dark:border-white/5 bg-neutral-50/40 dark:bg-[#0b101c]/40">
      <div className="mx-auto max-w-5xl px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            Work Experience
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Engineering & Open Source Impact
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Production instrument automation for microwave engineers and open-source contributions to a YC-backed agent SDK.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-white/90 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg dark:border-neutral-800/90 dark:bg-[#0f1626]/90 dark:hover:border-cyan-500/40"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white sm:text-2xl">
                      {exp.role}
                    </h3>
                    <span className="text-neutral-400 dark:text-neutral-500">·</span>
                    <span className="text-lg font-semibold text-blue-600 dark:text-cyan-400">
                      {exp.company}
                    </span>
                    {exp.badge && (
                      <span className="hidden sm:inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {exp.location}
                  </p>
                </div>
                <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 rounded-full px-3 py-1 self-start sm:self-auto">
                  {exp.period}
                </div>
              </div>

              {/* Summary */}
              <p className="mt-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {exp.summary}
              </p>

              {/* Bullet points */}
              <ul className="mt-5 space-y-3">
                {exp.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <span className="mt-1 flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Stack & Links */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-5 dark:border-neutral-800/70">
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-neutral-200/80 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {exp.links && (
                  <div className="flex flex-wrap gap-3">
                    {exp.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-cyan-400"
                      >
                        <span>{link.label}</span>
                        <span>↗</span>
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
