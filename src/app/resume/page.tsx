import Link from "next/link";
import { site, experiences, projects, achievements } from "@/lib/site";

export const metadata = {
  title: "Resume | Himanshu Kumar",
  description:
    "Official resume of Himanshu Kumar - Software Engineer building LLM agents, backend APIs, and C++ automation.",
};

export default function ResumePage() {
  return (
    <div className="container-narrow py-12">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[#D21319] transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>

        <a
          href="/Himanshu_Kumar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#D21319] hover:bg-[#b00f14] px-4 py-2 text-xs font-medium text-white transition-all shadow-xs"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download PDF</span>
        </a>
      </div>

      {/* Header */}
      <div className="mb-2">
        <h1 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Curriculum Vitae</span>
        </h1>
      </div>

      <p className="text-sm text-[var(--muted)] mb-8">
        Full verified engineering credentials, work experience, open source, and technical background.
      </p>

      {/* Printable / Viewable Resume Card */}
      <div className="modern-card p-6 sm:p-10 space-y-8 text-[13.5px]">
        {/* Name and Contact */}
        <div className="text-center pb-6 border-b border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            HIMANSHU KUMAR
          </h2>
          <p className="mt-1.5 text-xs text-[var(--muted)] font-mono">
            +91 9110058109 • Noida, India •{" "}
            <a href={`mailto:${site.email}`} className="text-[#D21319] hover:underline">
              {site.email}
            </a>
          </p>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--muted)] font-mono">
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#D21319]">
              linkedin.com/in/himanshu-kumar-8686aa2a1
            </a>
            <span>•</span>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#D21319]">
              github.com/Himansh133
            </a>
            <span>•</span>
            <a href={site.social.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-[#D21319]">
              leetcode.com/u/UM00P4fvdz
            </a>
            <span>•</span>
            <a href={site.social.codeforces} target="_blank" rel="noopener noreferrer" className="hover:text-[#D21319]">
              codeforces.com/profile/himanshuCodes
            </a>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#D21319] mb-2">
            SUMMARY
          </h3>
          <p className="text-[var(--muted)] leading-relaxed">
            Software engineer (B.Tech ECE-CS, 2027) building LLM agents, backend APIs, and C++ automation in Python, C++, and TypeScript. Shipped an RF test tool used by engineers and 3 approved PRs to a YC-backed SDK.
          </p>
        </div>

        {/* Education */}
        <div className="pt-6 border-t border-[var(--border)]">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#D21319] mb-3">
            EDUCATION
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <span className="font-semibold text-[var(--foreground)]">
              Jaypee Institute of Information Technology
            </span>
            <span className="text-xs font-mono text-[var(--muted)]">Noida, India</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-[var(--muted)] mt-1">
            <span>B.Tech in Electronics and Communication Engineering (ECE-CS)</span>
            <span className="font-mono">2023 - 2027</span>
          </div>
        </div>

        {/* Work Experience */}
        <div className="pt-6 border-t border-[var(--border)]">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#D21319] mb-4">
            WORK EXPERIENCE
          </h3>

          <div className="space-y-6">
            {/* JV Micronics */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <span className="font-semibold text-[var(--foreground)]">
                    Software Engineering Intern
                  </span>
                  <span className="text-[var(--muted)]"> | JV Micronics</span>
                </div>
                <span className="text-xs font-mono text-[var(--muted)]">
                  May 2026 - July 2026
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-[var(--muted)] mt-0.5 mb-2.5">
                <span className="text-[#D21319] font-mono font-semibold">
                  Antenna Measurement &amp; Automation Software | C++17, Qt6, SCPI, GPIB
                </span>
                <span className="font-mono">Faridabad, India</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted)] list-disc pl-5">
                <li>
                  Built a production Windows tool in C++17 / Qt6 that drives a Keysight FieldFox N9951B VNA over SCPI (GPIB/USB), replacing manual RF test runs and cutting a full antenna sweep from 10 hours to 7 minutes.
                </li>
                <li>
                  Designed a layered architecture (instrument control, data acquisition, positioner automation, test sequencing) so new instruments and test plans plug in without touching the UI.
                </li>
                <li>
                  Shipped a real-time Qt GUI for test setup and live plots, and auto-generated reports used by 50 engineers.
                </li>
              </ul>
            </div>

            {/* Corsair */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <span className="font-semibold text-[var(--foreground)]">
                    Open Source Contributor
                  </span>
                  <span className="text-[var(--muted)]"> | Corsair (YC W25)</span>
                </div>
                <span className="text-xs font-mono text-[var(--muted)]">Oct 2026</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-[var(--muted)] mt-0.5 mb-2.5">
                <span className="text-[#D21319] font-mono font-semibold">
                  Open-source AI-agent integration SDK, 15K+ GitHub stars | 3 PRs, all approved by maintainers
                </span>
                <span className="font-mono">TypeScript</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted)] list-disc pl-5">
                <li>
                  <strong className="text-[var(--foreground)]">PR #1828:</strong> Built the Turbot Pipes plugin end to end: 17 API modules, typed schemas, docs, 86 tests.
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">PR #1893:</strong> Fixed GitLab delete sync for issues, MRs, and projects, ending stale agent data; added 14 tests.
                </li>
                <li>
                  <strong className="text-[var(--foreground)]">PR #1892:</strong> Fixed Trello to remove deleted cards and boards locally, keeping state in sync; added 4 tests.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="pt-6 border-t border-[var(--border)]">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#D21319] mb-4">
            PROJECTS
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span className="font-semibold text-[var(--foreground)]">
                  Revenue Rescue Agent
                </span>
                <span className="text-xs font-mono text-[var(--muted)]">Sep 2026</span>
              </div>
              <p className="text-xs text-[#D21319] font-mono mt-0.5 mb-2 font-semibold">
                Python, FastAPI, PostgreSQL, Razorpay API, Gemini API
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--muted)] list-disc pl-5">
                <li>
                  Developed an autonomous AI agent (Gemini, 5 tools) that ranks failed invoices, picks offers, and sends outreach.
                </li>
                <li>
                  Isolated money logic from the LLM in deterministic services that enforce offer floors, compute recovery value, and validate payments, so the model cannot issue an unsafe discount.
                </li>
                <li>
                  Trained an offer-acceptance model on 30K synthetic transactions; decisions become Razorpay payment links.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span className="font-semibold text-[var(--foreground)]">
                  GitHub Commit Explorer (hyperSprint 2026 winner)
                </span>
                <span className="text-xs font-mono text-[var(--muted)]">Aug 2026</span>
              </div>
              <p className="text-xs text-[#D21319] font-mono mt-0.5 mb-2 font-semibold">
                React, Vite, GitHub REST API, TypeScript
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--muted)] list-disc pl-5">
                <li>
                  Built a natural-language search component that parses queries like &quot;github repo facebook/react&quot; into user or repo lookups.
                </li>
                <li>
                  Fetches commits, repos, and contribution calendars in parallel from the GitHub API, falling back to a second calendar provider on failure.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="pt-6 border-t border-[var(--border)]">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#D21319] mb-3">
            TECHNICAL SKILLS
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-[var(--muted)]">
            <p>
              <strong className="text-[var(--foreground)]">Languages:</strong> C++, C, Python, TypeScript, SQL, Bash
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Frameworks:</strong> FastAPI, React.js, Qt6, LangChain, Next.js
            </p>
            <p>
              <strong className="text-[var(--foreground)]">AI/ML:</strong> RAG, LLM tool-calling / agents, OpenAI &amp; Llama APIs, Hugging Face
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Cloud &amp; DevOps:</strong> Docker, GitHub Actions (CI/CD), AWS, Oracle Cloud (OCI), Linux, PostgreSQL
            </p>
            <p>
              <strong className="text-[var(--foreground)]">Hardware &amp; EDA:</strong> SCPI/GPIB instrument control, MATLAB, ANSYS HFSS, Cadence Virtuoso
            </p>
          </div>
        </div>

        {/* Achievements & Certifications */}
        <div className="pt-6 border-t border-[var(--border)]">
          <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-[#D21319] mb-3">
            ACHIEVEMENTS &amp; CERTIFICATIONS
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted)] list-disc pl-5">
            <li>
              Winner, hyperSprint 2026 (hyperDart hackathon at JIIT) for GitHub Commit Explorer.
            </li>
            <li>
              500+ DSA problems solved; 1700+ LeetCode rating, Pupil on Codeforces.
            </li>
            <li>
              Oracle Cloud Infrastructure (OCI) DevOps certified (CI/CD, containers, deployment).
            </li>
          </ul>
        </div>

        {/* Leadership */}

      </div>
    </div>
  );
}
