import Link from "next/link";
import type { Project } from "@/lib/site";
import { ExternalArrow } from "./external-arrow";

// Live demo when there is one, otherwise the repo
export function primaryLink(project: Project) {
  return project.liveUrl
    ? { label: "Live demo", href: project.liveUrl }
    : { label: "GitHub", href: project.githubUrl };
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-10">
      {projects.map((project) => {
        const link = primaryLink(project);
        return (
          <article key={project.slug}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[var(--foreground)]">
                <Link
                  href={`/projects/${project.slug}`}
                  className="transition-colors hover:text-[#D21319]"
                >
                  {project.title}
                </Link>
              </h3>
              <span className="shrink-0 text-[var(--muted-light)] tabular-nums">
                {project.year}
              </span>
            </div>
            <p className="text-[var(--muted-light)]">{project.eyebrow}</p>
            <p className="mt-2.5 text-[var(--muted)]">{project.summary}</p>

            <div className="mt-3 flex items-center gap-5 text-[13px]">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-[var(--foreground)] transition-colors hover:text-[#D21319]"
              >
                {link.label}
                <ExternalArrow />
              </a>
              <Link
                href={`/projects/${project.slug}`}
                className="text-[var(--muted-light)] transition-colors hover:text-[var(--foreground)]"
              >
                Read more →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
