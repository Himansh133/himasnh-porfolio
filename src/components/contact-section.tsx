"use client";

import React, { useState } from "react";
import { site } from "@/lib/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-3xl border border-neutral-200/90 bg-gradient-to-br from-white via-neutral-50 to-blue-50/30 p-8 shadow-xl backdrop-blur-md dark:border-neutral-800/90 dark:from-[#0f1626] dark:via-[#090d16] dark:to-[#0f1d38] sm:p-12">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            {/* Left Column: Bio & Message */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                Let&apos;s Connect
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
                Ready to build high-impact systems together.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                I am actively seeking software engineering roles and internships for 2026. Whether you need autonomous agent pipelines with ironclad guardrails or high-throughput C++ systems automation, my inbox is open.
              </p>

              <div className="mt-8 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-cyan-400">
                    📍
                  </span>
                  <span>{site.location} (Open to remote and on-site opportunities)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-cyan-400">
                    🎓
                  </span>
                  <span>{site.degree}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-cyan-400">
                    📞
                  </span>
                  <span>{site.phone}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Card */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/80 bg-white/80 p-8 text-center shadow-sm dark:border-neutral-800/80 dark:bg-[#131c31]/80">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 text-3xl text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-400 mb-4">
                ✉️
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Direct Email Contact
              </h3>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                Copy my email or open your email client directly
              </p>

              <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
                <button
                  onClick={copyEmail}
                  type="button"
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-500 active:scale-95 flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied {site.email}!</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${site.email}?subject=Software%20Engineering%20Opportunity%20-%20Himanshu%20Kumar`}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition-all hover:bg-neutral-100 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  Open in Mail App ↗
                </a>
              </div>

              {/* Quick links to profiles */}
              <div className="mt-8 flex items-center justify-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                >
                  GitHub
                </a>
                <span>·</span>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href={site.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition-colors"
                >
                  LeetCode
                </a>
                <span>·</span>
                <a
                  href={site.social.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500 transition-colors"
                >
                  Codeforces
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
