import Link from "next/link";
import { projects } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Things I&apos;ve Built</span>
        </h2>

        <Link
          href="/projects"
          className="text-xs font-mono text-[var(--muted)] hover:text-[#D21319] transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} wide={i === 0} />
        ))}
      </div>
    </section>
  );
}
