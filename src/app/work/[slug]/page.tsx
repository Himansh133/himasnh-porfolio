import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectCover } from "@/components/project-card";
import { getProject, projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Himanshu Kumar`,
    description: project.summary,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="container-narrow py-12">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[#D21319] transition-colors"
        >
          <span>←</span>
          <span>Back to Things I&apos;ve Built</span>
        </Link>
      </div>

      <header className="pb-8 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#D21319] font-bold">
            {project.eyebrow}
          </span>
          <span className="text-xs text-[var(--muted)]">•</span>
          <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
        </div>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
          {project.title}
        </h1>

        <p className="mt-3 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          {project.summary}
        </p>

        {/* Action Links */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#D21319] hover:bg-[#b00f14] px-4 py-2 text-xs font-medium text-white transition-all shadow-xs"
            >
              <span>Live Demonstration</span>
              <span>↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-medium text-[var(--foreground)] hover:border-[#D21319]/40 hover:text-[#D21319] transition-all"
            >
              <span>View Source Code</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero Visual Stage */}
      <div className="my-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border)]">
          <ProjectCover project={project} sizes="(min-width: 820px) 780px, 100vw" priority />
        </div>
      </div>

      {/* Deep-Dive Case Study Narrative */}
      <div className="space-y-10">
        {/* Architecture & Design */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Architecture &amp; System Design
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Engineering Challenge vs Solution */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="modern-card p-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#D21319] font-bold">
              The Engineering Challenge
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="modern-card p-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
              The Technical Solution
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Verified Outcomes */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Verified Outcomes &amp; Benchmarks
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
            {project.outcome}
          </p>

          <div className="mt-4 space-y-2">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 text-xs"
              >
                <span className="font-mono text-[var(--muted)]">Metric 0{i + 1}</span>
                <span className="font-semibold text-[var(--foreground)]">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="pt-6 border-t border-[var(--border)]">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
            Stack &amp; Tooling
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-md bg-[var(--tag-bg)] px-2.5 py-1 text-xs font-mono text-[var(--tag-fg)] border border-[var(--border)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
