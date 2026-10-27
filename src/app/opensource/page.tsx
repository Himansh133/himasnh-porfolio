import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Open Source Contributions | Himanshu Kumar",
  description:
    "Open source pull requests and engineering contributions by Himanshu Kumar across YC-backed SDKs and developer tooling.",
};

export default function OpenSourcePage() {
  const prs = [
    {
      prNumber: "#1828",
      repo: "Corsair (YC W25) SDK",
      title: "Built Turbot Pipes Plugin End-to-End",
      stars: "15K+ GitHub Stars",
      status: "Approved & Merged",
      tests: "86 tests",
      details: [
        "Architected the Turbot Pipes connector across 17 distinct API modules with zero external schema drift.",
        "Created strictly typed TypeScript schemas, input validation, and comprehensive request builders.",
        "Wrote 86 unit and integration tests covering happy paths, edge cases, error fallbacks, and rate limit retries.",
        "Documented end-user setup guides and authentication configuration for enterprise pipelines.",
      ],
      tags: ["TypeScript", "Turbot Pipes API", "Vitest", "Zod", "Error Handling"],
      link: "https://github.com/Himansh133",
    },
    {
      prNumber: "#1893",
      repo: "Corsair (YC W25) SDK",
      title: "Fixed GitLab Delete Sync for Issues, MRs, & Projects",
      stars: "15K+ GitHub Stars",
      status: "Approved & Merged",
      tests: "14 tests",
      details: [
        "Diagnosed an asynchronous race condition in the GitLab synchronization loop where deleted projects and merge requests persisted in agent memory.",
        "Rebuilt the deletion event lifecycle to reconcile local state caches against GitLab REST and GraphQL webhooks.",
        "Added 14 deterministic regression tests preventing zombie entity retrieval during autonomous agent tool executions.",
      ],
      tags: ["TypeScript", "GitLab API", "GraphQL", "State Reconciliation", "Jest"],
      link: "https://github.com/Himansh133",
    },
    {
      prNumber: "#1892",
      repo: "Corsair (YC W25) SDK",
      title: "Fixed Trello Local Mirror Sync for Deleted Boards",
      stars: "15K+ GitHub Stars",
      status: "Approved & Merged",
      tests: "4 tests",
      details: [
        "Fixed a localized state bug where deleting boards or cards directly on Trello left orphaned reference pointers in the agent storage cache.",
        "Implemented proactive tombstone cleanup during synchronization passes.",
        "Added 4 targeted test suites verifying cache consistency before and after board mutations.",
      ],
      tags: ["TypeScript", "Trello API", "Cache Invalidation", "Regression Testing"],
      link: "https://github.com/Himansh133",
    },
  ];

  return (
    <div className="container-narrow py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-2">
        <h1 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Open Source Contributions</span>
        </h1>
      </div>

      <p className="text-sm text-[var(--muted)] mb-8">
        Reading real-world codebases, isolating bugs, and shipping production-tested improvements to YC-backed repositories.
      </p>

      {/* Metrics Banner */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="modern-card p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-[var(--accent)] font-mono">
            3
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">
            Approved PRs Merged
          </div>
        </div>

        <div className="modern-card p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-[var(--foreground)] font-mono">
            104
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">
            Tests Written &amp; Passing
          </div>
        </div>

        <div className="modern-card p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-[var(--accent)] font-mono">
            15K+
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-1">
            SDK Stars on GitHub
          </div>
        </div>
      </div>

      {/* PR Cards */}
      <div className="space-y-6">
        {prs.map((pr, idx) => (
          <article
            key={idx}
            className="modern-card p-6 sm:p-7 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-base text-[var(--accent)]">
                  {pr.prNumber}
                </span>
                <span className="text-xs text-[var(--muted)]">•</span>
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {pr.repo}
                </span>
                <span className="rounded-full bg-[var(--tag-bg)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--muted)] border border-[var(--border)]">
                  {pr.stars}
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--accent)] border border-[var(--accent)]/25">
                  {pr.status}
                </span>
                <span className="text-xs font-mono text-[var(--muted)] bg-[var(--tag-bg)] px-2.5 py-0.5 rounded border border-[var(--border)]">
                  {pr.tests}
                </span>
              </div>
            </div>

            <h2 className="mt-4 text-lg font-bold text-[var(--foreground)]">
              {pr.title}
            </h2>

            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-[var(--muted)]">
              {pr.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2.5">
                  <span className="text-[var(--accent)] mt-1 text-xs font-bold">▸</span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {pr.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-[var(--tag-bg)] px-2.5 py-1 text-[11px] font-mono text-[var(--tag-fg)] border border-[var(--border)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={pr.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[var(--accent)] hover:opacity-80 hover:underline flex items-center gap-1"
              >
                <span>View on GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
