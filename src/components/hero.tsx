"use client";

import React, { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background radial gradients for ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[480px] w-[600px] rounded-full bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-purple-600/10 blur-3xl dark:from-blue-600/20 dark:via-cyan-400/20 dark:to-indigo-500/15" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Open to Software Engineering & Systems Roles (2026)</span>
        </div>

        {/* Main Title & Degree */}
        <div className="mt-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
              Himanshu Kumar
            </span>
          </h1>
          <p className="mt-3 text-lg font-medium text-neutral-600 dark:text-neutral-400 sm:text-xl">
            {site.degree} · <span className="text-neutral-900 dark:text-white font-semibold">JIIT Noida</span>
          </p>
        </div>

        {/* Tagline / elevator pitch */}
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-2xl">
          {site.tagline} Shipped a production RF test tool used by{" "}
          <span className="font-semibold text-neutral-900 dark:text-white underline decoration-blue-500 decoration-2 underline-offset-4">
            50 engineers
          </span>{" "}
          and 3 approved PRs to a YC-backed agent SDK.
        </p>

        {/* Action Buttons & Quick Copy */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View Featured Work</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/#showcase"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/80 px-5 py-3 text-sm font-medium text-neutral-800 backdrop-blur-sm transition-all hover:border-neutral-400 hover:bg-neutral-100 hover:-translate-y-0.5 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:border-cyan-400/50 dark:hover:bg-neutral-800"
          >
            <span className="text-cyan-500">⚡</span>
            <span>Launch Interactive Lab</span>
          </Link>

          <button
            onClick={copyEmail}
            type="button"
            className="group relative inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            title="Click to copy email address"
          >
            {copied ? (
              <>
                <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Email Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4 text-neutral-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{site.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Profile Badges */}
        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-medium text-neutral-400 dark:text-neutral-500">Profiles:</span>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white/60 px-2.5 py-1 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
          >
            <span>GitHub @Himansh133</span>
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white/60 px-2.5 py-1 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
          >
            <span>LinkedIn</span>
          </a>
          <a
            href={site.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white/60 px-2.5 py-1 transition-colors hover:border-amber-500 hover:text-amber-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-amber-400 dark:hover:text-amber-400"
          >
            <span>LeetCode (1700+ Rating)</span>
          </a>
          <a
            href={site.social.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white/60 px-2.5 py-1 transition-colors hover:border-purple-500 hover:text-purple-600 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-purple-400 dark:hover:text-purple-400"
          >
            <span>Codeforces (Pupil)</span>
          </a>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {site.stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-md hover:-translate-y-1 dark:border-neutral-800/80 dark:bg-[#0f1626]/70 dark:hover:border-cyan-500/50"
            >
              <div className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                {stat.highlight}
              </div>
              <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
