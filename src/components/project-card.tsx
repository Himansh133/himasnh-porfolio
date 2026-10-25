import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/site";

const TONES: Record<Project["tone"], string> = {
  blue: "59, 130, 246",
  cyan: "6, 182, 212",
  emerald: "16, 185, 129",
  amber: "245, 158, 11",
};

export function ProjectCover({
  project,
  sizes = "(min-width: 640px) 400px, 100vw",
  priority = false,
}: {
  project: Project;
  sizes?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }

  // Generated cover until a real screenshot is added
  const rgb = TONES[project.tone];
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[#0b0b0b] transition-transform duration-500 group-hover:scale-[1.03]"
      style={{
        backgroundImage: `radial-gradient(120% 90% at 85% 10%, rgba(${rgb}, 0.45), transparent 60%), radial-gradient(80% 70% at 0% 100%, rgba(210, 19, 25, 0.25), transparent 60%), radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
        backgroundSize: "auto, auto, 14px 14px",
      }}
    >
      <span className="absolute left-4 bottom-3 font-mono text-[10px] uppercase tracking-widest text-white/60">
        {project.eyebrow}
      </span>
      <span className="absolute right-4 top-2 text-5xl sm:text-6xl font-bold tracking-tighter text-white/10 select-none">
        {project.title
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 3)}
      </span>
    </div>
  );
}

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block ${wide ? "sm:col-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl border border-[var(--border)] ${
          wide ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]"
        }`}
      >
        <ProjectCover project={project} priority={wide} />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[#D21319] transition-colors">
          {project.title}
        </h3>
        <span className="text-xs text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[#D21319]">
          →
        </span>
      </div>
      <p className="mt-1 text-[13px] text-[var(--muted)] leading-snug">{project.hook}</p>
    </Link>
  );
}
