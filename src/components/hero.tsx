"use client";

import React from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  const categories = [
    { id: "work", label: "Featured Work", sub: "3 projects" },
    { id: "ai", label: "AI Agents", sub: "Gemini & Tools" },
    { id: "systems", label: "C++ Systems", sub: "SCPI & VISA" },
    { id: "opensource", label: "Open Source", sub: "YC W25 SDK" },
    { id: "experience", label: "Experience", sub: "JV Micronics" },
    { id: "specs", label: "Tech Specs", sub: "Architecture" },
  ];

  return (
    <section id="overview" className="pt-10 pb-16 sm:pt-14 sm:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple Store Top Header: Large dual-tone typography */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] font-semibold tracking-[-0.025em] leading-[1.08]">
              <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">{site.name}. </span>
              <span className="text-[#6e6e73] dark:text-[#86868b]">
                Autonomous LLM agents, C++ automation, and production APIs.
              </span>
            </h1>
          </div>

          {/* Apple Store Side Info Card */}
          <div className="flex flex-col gap-1 text-xs text-[#6e6e73] dark:text-[#86868b] lg:text-right shrink-0">
            <span className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
              Open to 2026 Engineering Roles
            </span>
            <span>B.Tech ECE-CS (2023–2027) · JIIT Noida</span>
            <div className="mt-2 flex items-center lg:justify-end gap-3 text-xs">
              <a
                href={`mailto:${site.email}`}
                className="text-[#0066cc] dark:text-[#2997ff] hover:underline"
              >
                Email Himanshu ›
              </a>
              <span className="text-black/20 dark:text-white/20">|</span>
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0066cc] dark:text-[#2997ff] hover:underline"
              >
                GitHub Profile ›
              </a>
            </div>
          </div>
        </div>

        {/* Apple Store Category Navigation Shelf */}
        <div className="mt-12 overflow-x-auto pb-4 pt-2 -mx-6 px-6 scrollbar-none">
          <div className="flex items-center gap-4 min-w-max">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="apple-pill-item group flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:bg-[#161617] dark:shadow-none border border-black/4 dark:border-white/8 min-w-[140px] text-center"
              >
                <span className="text-sm font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[#0066cc] dark:text-[#f5f5f7] dark:group-hover:text-[#2997ff] transition-colors">
                  {cat.label}
                </span>
                <span className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-0.5">
                  {cat.sub}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Apple Store Stat Strip */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="apple-card p-6">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              10h → 7m
            </div>
            <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">
              RF sweep cycle reduction
            </div>
          </div>

          <div className="apple-card p-6">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              15,000+
            </div>
            <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">
              Stars on SDK contributed
            </div>
          </div>

          <div className="apple-card p-6">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              50
            </div>
            <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">
              Production RF engineers
            </div>
          </div>

          <div className="apple-card p-6">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              1,700+
            </div>
            <div className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">
              LeetCode contest rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
