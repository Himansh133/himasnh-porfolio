"use client";

import React from "react";
import Link from "next/link";

export function OpenSourceSection() {
  const prs = [
    {
      prNumber: "#1828",
      repo: "Corsair (YC W25) SDK",
      title: "Built Turbot Pipes Plugin End-to-End",
      stars: "15K+ Stars",
      status: "Approved & Merged",
      tests: "86 tests",
      description:
        "Engineered the complete Turbot Pipes integration from scratch: 17 API modules, strictly typed schemas, automated sanitization, developer documentation, and 86 unit and integration tests.",
      tags: ["TypeScript", "Turbot Pipes", "Zod", "Vitest", "API Integration"],
      link: "https://github.com/Himansh133",
    },
    {
      prNumber: "#1893",
      repo: "Corsair (YC W25) SDK",
      title: "Fixed GitLab Delete Sync for Issues, MRs, & Projects",
      stars: "15K+ Stars",
      status: "Approved & Merged",
      tests: "14 tests",
      description:
        "Resolved an asynchronous race condition in the GitLab provider that caused stale agent metadata on deleted issues and merge requests. Added 14 unit and regression tests.",
      tags: ["TypeScript", "GitLab API", "State Sync", "Jest"],
      link: "https://github.com/Himansh133",
    },
    {
      prNumber: "#1892",
      repo: "Corsair (YC W25) SDK",
      title: "Fixed Trello Local Mirror Sync for Deleted Boards",
      stars: "15K+ Stars",
      status: "Approved & Merged",
      tests: "4 tests",
      description:
        "Patched the Trello connector to reliably prune deleted cards and boards locally, ensuring agent state remains completely synchronized with upstream changes.",
      tags: ["TypeScript", "Trello API", "Cache Pruning", "Regression Tests"],
      link: "https://github.com/Himansh133",
    },
  ];

  return (
    <section id="opensource" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Header */}
      <div className="mb-2">
        <h2 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Open Source</span>
        </h2>
      </div>

      <p className="text-sm text-[var(--muted)] mb-8">
        Pull requests contributed to real-world open source projects, agentic SDKs, and developer tooling.
      </p>

      {/* PR Cards Grid */}
      <div className="space-y-4">
        {prs.map((pr, idx) => (
          <article
            key={idx}
            className="modern-card p-5 sm:p-6 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-sm text-[#D21319]">
                  {pr.prNumber}
                </span>
                <span className="text-xs text-[var(--muted)]">•</span>
                <span className="text-xs font-semibold text-[var(--foreground)]">
                  {pr.repo}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--tag-bg)] px-2 py-0.5 text-[10px] font-mono text-[var(--muted)] border border-[var(--border)]">
                  <svg className="h-2.5 w-2.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{pr.stars}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center rounded-full bg-[#D21319]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#D21319] border border-[#D21319]/25">
                  {pr.status}
                </span>
                <span className="text-xs font-mono text-[var(--muted)] bg-[var(--tag-bg)] px-2 py-0.5 rounded border border-[var(--border)]">
                  {pr.tests}
                </span>
              </div>
            </div>

            <h3 className="mt-3 text-base font-semibold text-[var(--foreground)]">
              {pr.title}
            </h3>

            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
              {pr.description}
            </p>

            <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {pr.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-[var(--tag-bg)] px-2 py-0.5 text-[10.5px] font-mono text-[var(--tag-fg)] border border-[var(--border)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={pr.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#D21319] hover:opacity-80 hover:underline flex items-center gap-1"
              >
                <span>View Contribution</span>
                <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/opensource"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D21319] hover:opacity-80 hover:underline"
        >
          <span>View all open source activity</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
