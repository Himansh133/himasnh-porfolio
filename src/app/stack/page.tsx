import Link from "next/link";
import { SkillsSection } from "@/components/skills-section";

export const metadata = {
  title: "Stack",
  description: "The languages, frameworks and tools Himanshu Kumar builds with.",
};

export default function StackPage() {
  return (
    <div className="container-narrow rise pt-12">
      <Link
        href="/"
        className="text-[13px] text-[var(--muted-light)] transition-colors hover:text-[var(--foreground)]"
      >
        ← home
      </Link>
      <h1 className="mt-8 text-[19px] font-medium tracking-[-0.01em] text-[var(--foreground)]">Stack</h1>
      <p className="mt-2 mb-10 text-[var(--muted)]">What I reach for, from lab instruments to language models.</p>
      <SkillsSection />
    </div>
  );
}
