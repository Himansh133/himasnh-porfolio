import Link from "next/link";
import { CodingActivitySection } from "@/components/coding-activity-section";

export const metadata = {
  title: "Coding Activity & Heatmaps | Himanshu Kumar",
  description:
    "Live-verified contribution heatmaps and consistency metrics across GitHub, LeetCode, and Codeforces for Himanshu Kumar.",
};

export default function ActivityPage() {
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

      <CodingActivitySection />
    </div>
  );
}
