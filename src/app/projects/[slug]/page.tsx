import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalArrow } from "@/components/external-arrow";
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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[11px] text-[var(--muted-light)]">{label}</h2>
      <div className="mt-2 text-[var(--muted)]">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="container-narrow rise pt-12">
      <Link
        href="/projects"
        className="text-[13px] text-[var(--muted-light)] transition-colors hover:text-[var(--foreground)]"
      >
        ← projects
      </Link>

      <header className="mt-8">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-[19px] font-medium tracking-[-0.01em] text-[var(--foreground)]">
            {project.title}
          </h1>
          <span className="shrink-0 text-[var(--muted-light)] tabular-nums">{project.year}</span>
        </div>
        <p className="text-[var(--muted-light)]">{project.eyebrow}</p>
        <p className="mt-3 text-[var(--muted)]">{project.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-5 text-[13px]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            >
              Live demo
              <ExternalArrow />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-1 transition-colors hover:text-[var(--accent)] ${
              project.liveUrl ? "text-[var(--muted)]" : "text-[var(--foreground)]"
            }`}
          >
            GitHub
            <ExternalArrow />
          </a>
        </div>
      </header>

      {project.image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-[var(--border)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 640px) 580px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-10 flex flex-col gap-8">
        <Section label="overview">
          <p>{project.description}</p>
        </Section>
        <Section label="the problem">
          <p>{project.challenge}</p>
        </Section>
        <Section label="how it works">
          <p>{project.solution}</p>
        </Section>
        <Section label="result">
          <p>{project.outcome}</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {project.metrics.map((metric) => (
              <li key={metric} className="flex gap-2">
                <span aria-hidden className="text-[var(--muted-light)]">
                  –
                </span>
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section label="built with">
          <p>{project.stack.join(", ")}</p>
        </Section>
      </div>
    </article>
  );
}
