import type { Project } from "@/lib/site";

const tones = {
  blue: "from-blue-600/20 via-indigo-600/15 to-blue-900/20 border-blue-500/30",
  cyan: "from-cyan-500/20 via-sky-600/15 to-slate-900/20 border-cyan-500/30",
  emerald: "from-emerald-500/20 via-teal-600/15 to-emerald-950/20 border-emerald-500/30",
  amber: "from-amber-500/20 via-orange-600/15 to-amber-950/20 border-amber-500/30",
} as const;

export function ProductStage({ project, large = false }: { project: Project; large?: boolean }) {
  const toneClasses = tones[project.tone] || tones.blue;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${toneClasses} ${
        large ? "aspect-[16/9] min-h-[300px]" : "aspect-[4/3]"
      } p-6 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col justify-between`}
    >
      {/* Decorative Grid Lines */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Top Header Card */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md dark:border-white/10 dark:bg-black/30">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{project.eyebrow}</span>
        </div>
        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
          {project.year} · Production Artifact
        </span>
      </div>

      {/* Middle Architecture Showcase Badge */}
      <div className="relative z-10 my-auto rounded-2xl border border-white/30 bg-white/70 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1d]/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              System Specification
            </p>
            <h4 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {project.title}
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-md border border-black/5 bg-black/5 px-2 py-0.5 text-[11px] font-mono text-neutral-700 dark:border-white/10 dark:bg-white/10 dark:text-neutral-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Mockup Visualizer */}
        <div className="mt-5 space-y-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">✔</span>
            <span>{project.metrics[0] || "Architecture verified"}</span>
          </div>
          {project.metrics[1] && (
            <div className="flex items-center gap-2">
              <span className="text-cyan-500">✔</span>
              <span>{project.metrics[1]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status strip */}
      <div className="relative z-10 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono">
        <span>Verified by Himanshu Kumar</span>
        <span>Status: Shipped & Evaluated</span>
      </div>
    </div>
  );
}
