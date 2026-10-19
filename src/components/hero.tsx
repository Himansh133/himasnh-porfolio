"use client";

import React from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="overview" className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center px-6 pt-20 pb-24 text-center">
      {/* Eyebrow */}
      <p className="text-xs font-medium tracking-[0.24em] text-neutral-400 dark:text-neutral-500 uppercase">
        Software Engineer · ECE-CS &apos;27, JIIT
      </p>

      {/* Main Name Headline */}
      <h1 className="mt-5 text-[clamp(3rem,8vw,5.75rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-neutral-900 dark:text-white">
        {site.name}.
      </h1>

      {/* Product-like tagline */}
      <p className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-[#86868b]">
        Autonomous agents. C++ automation. Scalable APIs.
      </p>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-2xl text-[19px] leading-8 text-neutral-500 dark:text-neutral-400">
        Bridging deterministic systems with intelligent LLM autonomy. Shipped a production RF suite used by 50 engineers, authored approved PRs for Corsair (YC W25), and won hyperSprint 2026.
      </p>

      {/* Action links */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[15px]">
        <Link
          href="/#work"
          className="rounded-full bg-neutral-900 px-6 py-2.5 font-medium text-white transition-opacity hover:opacity-85 dark:bg-white dark:text-black"
        >
          Explore Work
        </Link>
        <a
          href={`mailto:${site.email}`}
          className="font-medium text-[#0066cc] dark:text-[#2997ff] transition-opacity hover:opacity-80 flex items-center gap-1"
        >
          <span>Open to 2026 roles</span>
          <span className="text-sm">›</span>
        </a>
      </div>

      {/* Apple-style Key Metrics (Clean, unboxed typography) */}
      <div className="mx-auto mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 border-t border-black/8 pt-12 sm:grid-cols-4 dark:border-white/10 text-left">
        <div>
          <div className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            10h → 7m
          </div>
          <p className="mt-1 text-xs text-[#86868b] leading-5">
            RF sweep duration reduction at JV Micronics
          </p>
        </div>

        <div>
          <div className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            15K+
          </div>
          <p className="mt-1 text-xs text-[#86868b] leading-5">
            GitHub stars on SDK contributed (Corsair YC W25)
          </p>
        </div>

        <div>
          <div className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            50
          </div>
          <p className="mt-1 text-xs text-[#86868b] leading-5">
            Production RF engineers actively using desktop tool
          </p>
        </div>

        <div>
          <div className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            1700+
          </div>
          <p className="mt-1 text-xs text-[#86868b] leading-5">
            LeetCode contest rating with 500+ solved
          </p>
        </div>
      </div>
    </section>
  );
}
