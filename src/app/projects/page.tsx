import Link from "next/link";
import { ProjectList } from "@/components/projects-section";
import { projects } from "@/lib/site";

export const metadata = {
  title: "Projects",
  description: "Things Himanshu Kumar has built: AI agents, C++ systems and web tools.",
};

export default function ProjectsPage() {
  return (
    <div className="container-narrow rise pt-12">
      <Link
        href="/"
        className="text-[13px] text-[var(--muted-light)] transition-colors hover:text-[var(--foreground)]"
      >
        ← home
      </Link>
      <h1 className="mt-8 mb-8 text-[19px] font-medium tracking-[-0.01em] text-[var(--foreground)]">
        Things I&apos;ve built
      </h1>
      <ProjectList projects={projects} />
    </div>
  );
}
