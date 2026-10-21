"use client";

import React from "react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 text-xs text-[var(--muted)] transition-colors mt-12">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-[var(--foreground)]">Let&apos;s connect</p>
          <small className="text-[var(--muted-light)]">Find me on these platforms</small>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            GitHub
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={site.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            LeetCode
          </a>
          <a
            href={site.social.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D21319] transition-colors"
          >
            Codeforces
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hover:text-[#D21319] transition-colors"
          >
            Mail
          </a>
        </div>

        <p className="text-[11px] text-[var(--muted-light)] font-mono">
          © 2026 {site.name}.
        </p>
      </div>
    </footer>
  );
}
