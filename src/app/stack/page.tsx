import Link from "next/link";
import { SkillsSection } from "@/components/skills-section";

export const metadata = {
  title: "Tech Stack & Skills | Himanshu Kumar",
  description:
    "Core languages, backend frameworks, agentic AI tools, and hardware instrumentation protocols engineered by Himanshu Kumar.",
};

export default function StackPage() {
  return (
    <div className="container-narrow py-12">
      {/* Back to Home Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      <SkillsSection />
    </div>
  );
}
