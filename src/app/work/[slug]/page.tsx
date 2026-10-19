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
      <header className="mx-auto max-w-4xl px-6 pt-8 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-cyan-400">
          <span>{project.eyebrow}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
          {project.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-neutral-600 dark:text-neutral-400">
          {project.summary}
        </p>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        <ProductStage project={project} large />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 space-y-12">
        {/* Deep Dive Sections */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Architecture Overview
          </h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {project.description}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white/80 p-6 dark:border-neutral-800 dark:bg-[#0f1626]/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
              The Engineering Challenge
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.challenge}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white/80 p-6 dark:border-neutral-800 dark:bg-[#0f1626]/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
              The Technical Solution
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.solution}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Key Results & Outcome
          </h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {project.outcome}
          </p>

          <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-50/50 p-6 dark:border-cyan-500/20 dark:bg-cyan-950/20">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              Validated Metrics
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              {project.metrics.map((metric, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✔</span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Technologies Used
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action links */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              View Repository on GitHub ↗
            </a>
          )}
          {project.liveUrl && project.liveUrl !== project.githubUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Live Demo ↗
            </a>
          )}
          <Link
            href="/#work"
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white ml-auto"
          >
            ← Back to All Projects
          </Link>
        </div>
      </div>
    </article>
  );
}
