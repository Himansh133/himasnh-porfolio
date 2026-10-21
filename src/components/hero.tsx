"use client";

import React from "react";
import Image from "next/image";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Horizontal Hero Layout - Exactly like dhirenderchoudhary.com with new palette */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        {/* Avatar Ring with User's Photo & Crimson Red / Stone / Navy Gradient */}
        <div className="avatar-ring shrink-0">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden bg-[var(--card)]">
            <Image
              src="/himanshu.jpg"
              alt={site.name}
              fill
              priority
              sizes="(max-width: 640px) 112px, 128px"
              className="avatar-image"
            />
          </div>
        </div>

        {/* Intro Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Himanshu <span className="text-neutral-950 dark:text-white font-bold">Kumar</span>
          </h1>

          <p className="mt-1.5 text-base sm:text-lg text-[var(--muted)] font-normal">
            Software Engineer • Systems Builder • LLM Agents
          </p>

          <p className="mt-1 text-xs text-[var(--muted-light)]">
            JIIT Noida (ECE-CS, 2023 - 2027) • Noida, India
          </p>

          {/* Social Icons Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            {/* GitHub */}
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all hover:scale-105"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all hover:scale-105"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* LeetCode */}
            <a
              href={site.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile (1700+)"
              title="LeetCode (1700+ Rating, 500+ Solved)"
              className="inline-flex h-9 items-center gap-1.5 px-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all hover:scale-105"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.26c-.347.35-.55.824-.55 1.314 0 .49.203.964.55 1.314l5.406 5.822a1.374 1.374 0 0 0 1.922 0 1.374 1.374 0 0 0 0-1.922L9.67 7.574l4.774-5.214A1.374 1.374 0 0 0 13.483 0zm4.846 7.423a1.374 1.374 0 0 0-.961.438l-7.797 8.397a1.374 1.374 0 0 0 0 1.922 1.374 1.374 0 0 0 1.922 0l7.797-8.397a1.374 1.374 0 0 0-.961-2.36z" />
              </svg>
              <span className="font-mono font-medium">1700+</span>
            </a>

            {/* Codeforces */}
            <a
              href={site.social.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Codeforces Profile"
              title="Codeforces (Pupil)"
              className="inline-flex h-9 items-center gap-1.5 px-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all hover:scale-105"
            >
              <span className="font-mono font-semibold text-[11px] text-[#D21319]">CF</span>
              <span className="text-[11px] text-[var(--muted)]">Pupil</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${site.email}`}
              aria-label="Send Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all hover:scale-105"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            {/* Resume Button */}
            <a
              href="/Himanshu_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#D21319] hover:bg-[#b00f14] px-3.5 text-xs font-medium text-white transition-all shadow-xs"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* About Paragraph */}
      <div className="mt-8 pt-8 border-t border-[var(--border)]">
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--muted)]">
          Hey, I&apos;m <span className="text-[var(--foreground)] font-semibold">Himanshu</span>. I engineer systems at the intersection of high-speed C++, scalable web backends, and AI agents. Currently at JIIT Noida (2027), I build developer tooling, contribute to Corsair (YC W25), and design reliable software built for scale.
        </p>
      </div>

      {/* Metric Quick Stats Ribbon */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="modern-card p-4 text-center sm:text-left">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            15K+
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-0.5">
            Stars on Contributed SDK
          </div>
        </div>

        <div className="modern-card p-4 text-center sm:text-left">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            50+
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-0.5">
            Engineers using C++ tool
          </div>
        </div>

        <div className="modern-card p-4 text-center sm:text-left">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#D21319]">
            500+
          </div>
          <div className="text-[11px] text-[var(--muted)] mt-0.5">
            DSA Solved (1700+ Rating)
          </div>
        </div>
      </div>
    </section>
  );
}
