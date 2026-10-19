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
    <section id="work" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              Selected Work
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Featured Engineering Projects
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
              Autonomous agents with financial guardrails, automated C++ instrument drivers, and award-winning developer tooling.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Projects" },
              { id: "ai", label: "AI & Agents" },
              { id: "systems", label: "Systems & C++" },
              { id: "web", label: "Web & Tools" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "border border-neutral-300/80 bg-white/70 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: Project) => {
            const toneBorder =
              project.tone === "blue"
                ? "hover:border-blue-500/60 dark:hover:border-blue-400/60"
                : project.tone === "cyan"
                ? "hover:border-cyan-500/60 dark:hover:border-cyan-400/60"
                : "hover:border-emerald-500/60 dark:hover:border-emerald-400/60";

            return (
              <article
                key={project.slug}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/90 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800/90 dark:bg-[#0f1626]/80 ${toneBorder}`}
              >
                {/* Top Eyebrow & Year */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {project.eyebrow}
                    </span>
                    <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {project.summary}
                  </p>

                  {/* Key Metrics Pill */}
                  <div className="mt-5 space-y-1.5 rounded-xl bg-neutral-50 p-3 text-xs dark:bg-[#131b2e]">
                    <div className="font-semibold text-neutral-700 dark:text-neutral-300">
                      Key Impact:
                    </div>
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                        <span className="text-blue-500 dark:text-cyan-400">✓</span>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Badges */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-neutral-200/80 bg-neutral-100/80 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/80">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-cyan-400"
                  >
                    <span>Read Case Study</span>
                    <span>→</span>
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
