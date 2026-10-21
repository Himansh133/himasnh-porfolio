"use client";

import React, { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-12 border-t border-[var(--border)]">
      {/* Corner Dots Header */}
      <div className="mb-2">
        <h2 className="section-title-modern">
          <div className="corner-dots">
            <div className="dot top-left" />
            <div className="dot top-right" />
            <div className="dot bottom-left" />
            <div className="dot bottom-right" />
          </div>
          <span className="title-text">Hire Me</span>
        </h2>
      </div>

      <p className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--muted)] max-w-2xl">
        I could be an ideal fit if you are looking for an engineer who combines rigorous systems thinking with modern autonomous agent development. Someone who treats <strong className="text-[var(--foreground)] font-semibold">your product like their own</strong>, ships reliable code with extensive test suites, and takes pride in cutting bottlenecks from hours to minutes.
      </p>

      {/* Role Tree Structure - Like dhirenderchoudhary.com */}
      <div className="my-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="rounded-lg border border-[#D21319]/25 bg-[#D21319]/10 px-4 py-3 text-sm font-semibold text-[#D21319] text-center sm:text-left">
            I build my best work as:
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--tag-bg)] px-4 py-2 text-xs font-mono text-center text-[var(--foreground)]">
              AI Agent Engineer
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--tag-bg)] px-4 py-2 text-xs font-mono text-center text-[var(--foreground)]">
              C++ Systems Builder
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--tag-bg)] px-4 py-2 text-xs font-mono text-center text-[var(--foreground)]">
              Full Stack API Engineer
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center mt-6">
        <p className="text-sm text-[var(--muted)] mb-5">
          If you have read this far, let us connect and build something impactful.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#D21319] hover:bg-[#b00f14] px-5 py-2.5 text-xs font-medium text-white transition-all shadow-xs"
          >
            <div className="relative h-5 w-5 rounded-full overflow-hidden shrink-0">
              <Image
                src="/himanshu.jpg"
                alt="Himanshu"
                fill
                sizes="20px"
                className="object-cover"
              />
            </div>
            <span>Send Email ({site.email})</span>
          </a>

          <button
            onClick={copyEmail}
            type="button"
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-xs font-medium text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all"
          >
            {copied ? "Copied to clipboard!" : "Copy Email"}
          </button>

          <a
            href="/Himanshu_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-xs font-medium text-[var(--muted)] hover:text-[#D21319] hover:border-[#D21319]/40 transition-all flex items-center gap-1.5"
          >
            <svg className="h-3.5 w-3.5 text-[#D21319]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download Resume PDF</span>
          </a>
        </div>

        {/* Profiles Row */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--muted)]">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            GitHub (Himansh133)
          </a>
          <span>•</span>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={site.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            LeetCode (1700+)
          </a>
          <span>•</span>
          <a
            href={site.social.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            Codeforces (Pupil)
          </a>
        </div>
      </div>
    </section>
  );
}
