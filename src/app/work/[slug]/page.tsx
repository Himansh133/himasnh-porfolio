import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductStage } from "@/components/product-stage";
import { getProject, projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="min-h-screen py-16">
      <header className="mx-auto max-w-4xl px-6 pt-12 pb-16 text-center">
        <p className="text-xs font-semibold tracking-[0.24em] text-neutral-400 dark:text-neutral-500 uppercase">
          {project.eyebrow} · {project.year}
        </p>
        <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-neutral-900 dark:text-white">
          {project.title}.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-[#86868b] font-normal">
          {project.summary}
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        <ProductStage project={project} large />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-20 space-y-16">
        {/* Architecture Narrative */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Architecture & Design.
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            {project.description}
          </p>
        </div>

        {/* Challenge & Solution Grid (Minimal hairline separation, no bulky boxes) */}
        <div className="grid gap-12 sm:grid-cols-2 border-t border-b border-black/8 py-12 dark:border-white/10">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase">
              The Engineering Problem
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
              {project.challenge}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase">
              The Implementation
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-700 dark:text-neutral-300">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Outcomes & Validated Benchmarks */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Verified Outcomes.
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-300">
            {project.outcome}
          </p>

          <div className="mt-8 divide-y divide-black/8 border-t border-b border-black/8 dark:divide-white/10 dark:border-white/10">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex items-center justify-between py-4 text-sm">
                <span className="text-[#86868b]">Metric 0{i + 1}</span>
                <span className="font-medium text-neutral-900 dark:text-white">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase">
            Technologies
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#f5f5f7] px-3.5 py-1 text-xs text-neutral-700 dark:bg-[#1c1c1e] dark:text-neutral-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-black/8 dark:border-white/10 text-sm">
          <div className="flex items-center gap-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline"
              >
                View Repository ↗
              </a>
            )}
            {project.liveUrl && project.liveUrl !== project.githubUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline"
              >
                Live Demo ↗
              </a>
            )}
          </div>

          <Link
            href="/#work"
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
          >
            <span>‹ All work</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
