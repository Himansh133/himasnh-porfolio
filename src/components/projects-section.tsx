"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/site";

export function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeProject = projects[selectedIndex];

  return (
    <section id="work" className="bg-[#f5f5f7] dark:bg-[#161617] py-24 sm:py-32 transition-colors">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.24em] text-neutral-400 dark:text-neutral-500 uppercase">
            Featured Projects
          </p>
          <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.75rem)] font-semibold tracking-[-0.04em] text-neutral-900 dark:text-white leading-[1.05]">
            Engineered for performance. Built without compromise.
          </h2>
          <p className="mt-6 text-lg text-[#86868b]">
            Switch between systems to see architectural decisions, verified benchmarks, and deployment outcomes.
          </p>
        </div>

        {/* Apple Segmented Switcher Bar with Animation */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex max-w-full overflow-x-auto rounded-full bg-black/5 p-1.5 backdrop-blur-md dark:bg-white/10 scrollbar-none">
            {projects.map((p, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={p.slug}
                  onClick={() => setSelectedIndex(idx)}
                  type="button"
                  className={`relative whitespace-nowrap rounded-full px-5 py-2 text-xs font-medium transition-all duration-300 ${
                    active
                      ? "bg-white text-neutral-900 shadow-sm dark:bg-[#2c2c2e] dark:text-white"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  {p.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Display (Apple Product Stage with Smooth Transition) */}
        <div className="mt-12 overflow-hidden rounded-[32px] bg-white p-8 sm:p-14 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)] dark:bg-[#000000] dark:border dark:border-white/10 dark:shadow-none transition-all duration-500">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div key={`info-${activeProject.slug}`} className="animate-[fadeIn_0.4s_ease-out]">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#0066cc] dark:text-[#2997ff] uppercase">
                {activeProject.eyebrow} · {activeProject.year}
              </p>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-neutral-900 dark:text-white sm:text-4xl">
                {activeProject.title}
              </h3>

              <p className="mt-4 text-xl leading-8 text-[#86868b] font-normal">
                {activeProject.summary}
              </p>

              {/* Apple-style Architecture Highlights */}
              <div className="mt-8 space-y-4 border-t border-black/8 pt-6 dark:border-white/10">
                <div>
                  <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    The Challenge
                  </p>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    The Solution
                  </p>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs text-neutral-600 dark:bg-[#1c1c1e] dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="mt-8 flex items-center gap-6">
                <Link
                  href={`/work/${activeProject.slug}`}
                  className="font-medium text-[#0066cc] dark:text-[#2997ff] text-sm hover:underline flex items-center gap-1"
                >
                  <span>Read full case study</span>
                  <span className="text-base">›</span>
                </Link>

                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                  >
                    View on GitHub ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right Product Graphic Stage */}
            <div
              key={`stage-${activeProject.slug}`}
              className="relative flex flex-col justify-between rounded-[24px] bg-[#f5f5f7] p-8 dark:bg-[#161617] border border-black/5 dark:border-white/10 min-h-[360px] animate-[fadeIn_0.5s_ease-out]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
                  <span className="font-mono">SPECIFICATION 0{selectedIndex + 1}</span>
                  <span>VERIFIED RESULT</span>
                </div>

                {/* Primary Metric Hero Display */}
                <div className="mt-8">
                  <div className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
                    {activeProject.slug === "fieldfox-rf-suite" && "98.8%"}
                    {activeProject.slug === "revenue-rescue-agent" && "30,000"}
                    {activeProject.slug === "github-commit-explorer" && "1st Place"}
                  </div>
                  <p className="mt-2 text-sm text-[#86868b]">
                    {activeProject.slug === "fieldfox-rf-suite" && "Reduction in full antenna sweep test cycle"}
                    {activeProject.slug === "revenue-rescue-agent" && "Synthetic transactions trained for offer-acceptance"}
                    {activeProject.slug === "github-commit-explorer" && "Winner of hyperSprint 2026 hackathon at JIIT"}
                  </p>
                </div>

                {/* Spec List */}
                <div className="mt-8 space-y-3 border-t border-black/6 pt-6 dark:border-white/10">
                  {activeProject.metrics.map((metric, i) => (
                    <div key={i} className="flex items-baseline justify-between text-xs sm:text-sm">
                      <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                        Metric 0{i + 1}
                      </span>
                      <span className="font-medium text-neutral-900 dark:text-white text-right">
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/6 dark:border-white/10 flex items-center justify-between text-[11px] text-[#86868b]">
                <span>Designed by Himanshu Kumar</span>
                <span>Production Shipped</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apple-style 3-Column Editorial Grid for All Projects */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={project.slug}
              className="flex flex-col justify-between rounded-[24px] bg-white p-8 dark:bg-[#000000] dark:border dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400 dark:text-neutral-500 uppercase">
                  {project.eyebrow}
                </p>
                <h4 className="mt-3 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                  {project.title}
                </h4>
                <p className="mt-3 text-sm leading-6 text-[#86868b]">
                  {project.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/6 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedIndex(idx);
                    window.scrollTo({ top: document.getElementById("work")?.offsetTop || 0, behavior: "smooth" });
                  }}
                  className="text-xs font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline"
                >
                  View on Stage ›
                </button>
                <Link
                  href={`/work/${project.slug}`}
                  className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
