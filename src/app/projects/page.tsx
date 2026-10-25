"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "ai" | "systems" | "web">("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="container-narrow py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[#D21319] transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Things I&apos;ve Built</span>
        </h1>

        {/* Filter Tabs */}
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

      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
