import type { Project } from "@/lib/site";

export function ProductStage({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] bg-[#f5f5f7] dark:bg-[#161617] border border-black/5 dark:border-white/10 ${
        large ? "aspect-[16/9] min-h-[340px]" : "aspect-[4/3]"
      } p-8 sm:p-12 flex flex-col justify-between`}
    >
      {/* Header */}
      <div className="flex items-center justify-between text-xs text-[#86868b]">
        <span className="font-semibold tracking-[0.2em] uppercase">{project.eyebrow}</span>
        <span className="font-mono">{project.year}</span>
      </div>

      {/* Centerpiece Typographic Display */}
      <div className="my-auto max-w-xl">
        <p className="text-xs font-mono uppercase tracking-widest text-[#0066cc] dark:text-[#2997ff]">
          Production Artifact
        </p>
        <h4 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          {project.title}
        </h4>
        <p className="mt-3 text-sm text-[#86868b] leading-relaxed max-w-md">
          {project.summary}
        </p>
      </div>

      {/* Footer Specs Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/6 dark:border-white/10 text-xs text-[#86868b]">
        <span>{project.stack.join(" · ")}</span>
        <span className="font-medium text-neutral-900 dark:text-white">
          {project.metrics[0]}
        </span>
      </div>
    </div>
  );
}
