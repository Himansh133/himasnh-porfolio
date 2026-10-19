"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects, Project } from "@/lib/site";

export function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "ai" | "systems" | "web">("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple Store Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-[28px] sm:text-[38px] font-semibold tracking-[-0.02em] leading-[1.1]">
              <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">The Latest. </span>
              <span className="text-[#6e6e73] dark:text-[#86868b]">
                Take a look at what’s built, right now.
              </span>
            </h2>
          </div>

          {/* Apple Store Segmented Filter */}
          <div className="flex rounded-full bg-black/5 p-1 backdrop-blur-md dark:bg-white/10 self-start md:self-auto">
            {[
              { id: "all", label: "All" },
              { id: "ai", label: "AI Agents" },
              { id: "systems", label: "C++ Systems" },
              { id: "web", label: "Tools" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                  filter === tab.id
                    ? "bg-white text-[#1d1d1f] shadow-sm dark:bg-[#2c2c2e] dark:text-white"
                    : "text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Apple Store Cards Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.slug}
              className="apple-card group flex flex-col justify-between p-8 sm:p-9 min-h-[440px]"
            >
              <div>
                {/* Eyebrow */}
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6e6e73] dark:text-[#86868b]">
                  {project.eyebrow} · {project.year}
                </p>

                {/* Title */}
                <h3 className="mt-3 text-[26px] font-semibold tracking-[-0.015em] leading-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                  {project.title}
                </h3>

                {/* Subtitle / Narrative */}
                <p className="mt-3 text-[15px] leading-relaxed text-[#6e6e73] dark:text-[#86868b]">
                  {project.summary}
                </p>

                {/* Apple Store Spec Highlight Box */}
                <div className="mt-8 rounded-2xl bg-[#f5f5f7] p-4 dark:bg-[#232326] transition-colors">
                  <div className="text-xs font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                    Key Benchmark
                  </div>
                  <div className="mt-1 text-xs text-[#6e6e73] dark:text-[#a1a1a6]">
                    {project.metrics[0]}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] font-normal text-neutral-600 dark:bg-[#232326] dark:text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Apple Link Action */}
              <div className="mt-8 pt-5 border-t border-black/4 dark:border-white/8 flex items-center justify-between text-xs">
                <Link
                  href={`/work/${project.slug}`}
                  className="font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <span className="text-sm">›</span>
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors"
                  >
                    View on GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
