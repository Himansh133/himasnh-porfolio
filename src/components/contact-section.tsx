"use client";

import React, { useState } from "react";
import { site } from "@/lib/site";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-[32px] sm:text-[46px] font-semibold tracking-[-0.025em] leading-[1.08]">
          <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">Let’s build together. </span>
          <span className="text-[#6e6e73] dark:text-[#86868b]">
            Open for summer & fall 2026 roles.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-[17px] text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Looking for software engineering opportunities where I can ship high-throughput C++ drivers, deterministic agent workflows, and scalable APIs.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={copyEmail}
            type="button"
            className="rounded-full bg-[#1d1d1f] px-8 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:opacity-85 active:scale-95 dark:bg-white dark:text-black"
          >
            {copied ? "Email copied to clipboard" : site.email}
          </button>

          <a
            href={`mailto:${site.email}`}
            className="text-sm font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline flex items-center gap-1"
          >
            <span>Open in Mail</span>
            <span className="text-sm">›</span>
          </a>
        </div>

        {/* Profiles */}
        <div className="mt-16 flex items-center justify-center gap-8 text-xs text-[#6e6e73] dark:text-[#86868b]">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={site.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            LeetCode
          </a>
          <a
            href={site.social.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
          >
            Codeforces
          </a>
        </div>
      </div>
    </section>
  );
}
