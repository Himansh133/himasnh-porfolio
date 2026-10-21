import type { Project } from "@/lib/site";

export function ProductStage({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] ${
        large ? "aspect-[16/9] min-h-[280px]" : "aspect-[4/3]"
      } p-6 sm:p-8 flex flex-col justify-between`}
    >
      {/* Header */}
      <div className="flex items-center justify-between text-xs text-[var(--muted)]">
        <span className="font-mono text-[#D21319] font-bold tracking-wider uppercase">
          {project.eyebrow}
        </span>
        <span className="font-mono">{project.year}</span>
      </div>

      {/* Centerpiece Typographic Display */}
      <div className="my-auto max-w-lg">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#D21319] mb-1">
          Production Architecture
        </div>
        <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
          {project.title}
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Footer Specs Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        <span className="font-mono">{project.stack.slice(0, 4).join(" • ")}</span>
        <span className="font-medium text-[var(--foreground)]">
          {project.metrics[0]}
        </span>
      </div>
    </div>
  );
}
