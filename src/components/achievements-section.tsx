"use client";

import React from "react";
import { achievements } from "@/lib/site";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 border-t border-black/5 dark:border-white/5 bg-neutral-50/40 dark:bg-[#0b101c]/40">
      <div className="mx-auto max-w-5xl px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
            Honors & Roles
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Achievements & Leadership
          </h2>
          <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Hackathon victories, certified DevOps competencies, algorithmic competitive ratings, and IEEE chapter leadership.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/90 bg-white/90 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg dark:border-neutral-800/90 dark:bg-[#0f1626]/90 dark:hover:border-cyan-500/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-cyan-300">
                    {item.badge}
                  </span>
                  <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                    {item.date}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {item.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>

              {item.link && (
                <div className="mt-6 border-t border-neutral-100 pt-4 dark:border-neutral-800/70">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-cyan-400"
                  >
                    <span>View Profile</span>
                    <span>↗</span>
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
