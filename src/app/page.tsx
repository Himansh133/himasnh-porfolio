import Link from "next/link";
import { ExperienceSection } from "@/components/experience-section";
import { CodingActivitySection } from "@/components/coding-activity-section";
import { PrismCanvas } from "@/components/prism-canvas";
import { ProjectList } from "@/components/projects-section";
import { projects } from "@/lib/site";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-[11px] text-[var(--muted-light)]">{children}</p>;
}

export default function Home() {
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="container-narrow">
      <section className="pt-16 sm:pt-24">
        <div className="flex flex-col gap-5">
          <p className="max-w-[560px] text-[17px] leading-[1.4] tracking-[-0.01em] text-[var(--foreground)] sm:text-[19px]">
            I build autonomous LLM agents, scalable backends and high-performance C++ tools.
            This summer at JV Micronics I took an antenna test sweep from 10 hours to 7
            minutes. I also contribute to Corsair (YC W25), and I&apos;m in my final year at
            JIIT Noida.
          </p>
          <p className="max-w-[520px] text-[var(--muted)]">
            I like systems that are fast and can&apos;t lie to you.{" "}
            <em className="text-[var(--foreground)]">
              Deterministic where it matters, intelligent where it helps.
            </em>
          </p>
        </div>
      </section>

      <div className="mt-10 sm:mt-14">
        <PrismCanvas />
      </div>

      <div className="mt-10 sm:mt-14">
        <Label>work</Label>
        <ExperienceSection />
      </div>

      <div className="mt-16 sm:mt-20">
        <Label>things i&apos;ve built</Label>
        <ProjectList projects={featured} />
        <Link
          href="/projects"
          className="mt-8 inline-block text-[13px] text-[var(--muted-light)] transition-colors hover:text-[var(--foreground)]"
        >
          All projects →
        </Link>
      </div>

      <div className="mt-16 sm:mt-20">
        <Label>activity</Label>
        <CodingActivitySection />
      </div>
    </div>
  );
}
