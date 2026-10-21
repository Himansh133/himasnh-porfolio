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
    <section id="projects" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h2 className="section-title-modern">
            <div className="corner-dots">
              <div className="dot top-left" />
              <div className="dot top-right" />
              <div className="dot bottom-left" />
              <div className="dot bottom-right" />
            </div>
            <span className="title-text">Things I&apos;ve Built</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex rounded-lg border border-[var(--border)] bg-[var(--card)] p-1 text-xs self-start sm:self-auto">
          {[
            { id: "all", label: "All" },
            { id: "ai", label: "AI Agents" },
            { id: "systems", label: "C++ Systems" },
            { id: "web", label: "Web Tools" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`rounded-md px-3 py-1 font-medium transition-all ${
                filter === tab.id
                  ? "bg-[#D21319] text-white shadow-xs"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] mb-8">
        Recent production software, autonomous LLM agents, and automation tools.
      </p>

      {/* Modern Projects Grid */}
      <div className="space-y-6">
        {filteredProjects.map((project: Project) => (
          <article
            key={project.slug}
            className="modern-card p-6 sm:p-7 relative overflow-hidden group"
          >
            {/* Tone Accent Bar - Clean neutral grey matching other cards */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#AFAEA2] dark:bg-neutral-800" />

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#D21319] font-semibold">
                    {project.eyebrow}
                  </span>
                  <span className="text-xs text-[var(--muted)]">•</span>
                  <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] mt-1">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-[#D21319] transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)] hover:border-[#D21319]/40 hover:text-[#D21319] transition-all flex items-center gap-1"
                  >
                    <span>Live</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-xs font-medium text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                )}
                <Link
                  href={`/work/${project.slug}`}
                  className="rounded-md bg-[#D21319]/10 border border-[#D21319]/25 px-2.5 py-1 text-xs font-medium text-[#D21319] hover:bg-[#D21319]/20 transition-all flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Summary */}
            <p className="mt-4 text-[14px] text-[var(--muted)] leading-relaxed">
              {project.summary}
            </p>

            {/* Benchmark highlight box */}
            <div className="mt-4 rounded-lg bg-[var(--tag-bg)] p-3 border border-[var(--border)] flex items-center justify-between text-xs">
              <span className="text-[var(--muted)] font-mono">Key Result:</span>
              <span className="font-semibold text-[var(--foreground)]">
                {project.metrics[0]}
              </span>
            </div>

            {/* Tech stack tags */}
            <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-[var(--tag-bg)] px-2.5 py-1 text-[11px] font-mono text-[var(--tag-fg)] border border-[var(--border)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Button to view all projects */}
      <div className="mt-8 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-xs font-medium text-[var(--foreground)] hover:border-[#D21319]/40 hover:text-[#D21319] hover:bg-[var(--card-hover)] transition-all"
        >
          <span>Show All Projects &amp; Case Studies</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
