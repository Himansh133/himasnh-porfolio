import Link from "next/link";
import { ExperienceSection } from "@/components/experience-section";

export const metadata = {
  title: "Engineering Experience | Himanshu Kumar",
  description:
    "Production engineering roles and open source internships by Himanshu Kumar across C++ instrumentation, RF automation, and YC-backed SDKs.",
};

export default function ExperiencePage() {
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

      <ExperienceSection />
    </div>
  );
}
