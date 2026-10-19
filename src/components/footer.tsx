"use client";

import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white py-10 text-[11px] text-[#86868b] dark:border-white/10 dark:bg-black transition-colors">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p>
          Copyright © 2026 {site.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={site.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            LeetCode
          </a>
          <a
            href={site.social.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Codeforces
          </a>
        </div>
      </div>
    </footer>
  );
}
