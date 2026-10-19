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
    <section id="contact" className="bg-[#f5f5f7] dark:bg-[#161617] py-28 text-center transition-colors">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-semibold tracking-[0.24em] text-neutral-400 dark:text-neutral-500 uppercase">
          Connect
        </p>

        <h2 className="mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-[-0.04em] text-neutral-900 dark:text-white leading-[1.02]">
          Let’s build something quiet and powerful.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-[#86868b] leading-relaxed">
          Open to software engineering roles and internships for 2026. If you value systems that are fast, deterministic, and built to scale, reach out.
        </p>

        {/* Apple Pill Email Action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={copyEmail}
            type="button"
            className="rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition-all hover:opacity-85 active:scale-95 dark:bg-white dark:text-black"
          >
            {copied ? "Email copied to clipboard" : site.email}
          </button>

          <a
            href={`mailto:${site.email}`}
            className="text-sm font-medium text-[#0066cc] dark:text-[#2997ff] hover:underline flex items-center gap-1"
          >
            <span>Open in Mail</span>
            <span>›</span>
          </a>
        </div>

        {/* Minimal Social Links */}
        <div className="mt-14 flex items-center justify-center gap-8 text-xs text-neutral-500 dark:text-neutral-400">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={site.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            LeetCode
          </a>
          <a
            href={site.social.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Codeforces
          </a>
        </div>
      </div>
    </section>
  );
}
