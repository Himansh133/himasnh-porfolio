import { experiences } from "@/lib/site";
import { ExternalArrow } from "./external-arrow";

export function ExperienceSection() {
  return (
    <section aria-labelledby="experience" className="rise">
      <h2 id="experience" className="sr-only">
        Experience
      </h2>

      <div className="flex flex-col gap-10">
        {experiences.map((job) => (
          <article key={job.company}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[var(--foreground)]">
                {job.url ? (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 transition-colors hover:text-[var(--accent)]"
                  >
                    {job.company}
                    <ExternalArrow />
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <span className="shrink-0 text-[var(--muted-light)] tabular-nums">
                {job.period}
              </span>
            </div>
            <p className="text-[var(--muted-light)]">{job.role}</p>
            <div className="mt-2.5 flex flex-col gap-2.5 text-[var(--muted)]">
              {job.blurb.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
