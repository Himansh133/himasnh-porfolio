"use client";

import React, { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-12 border-b border-black/8 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80 transition-colors">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6 text-[12px]">
        {/* Apple Brand */}
        <Link
          href="/"
          className="font-semibold tracking-tight text-neutral-900 transition-opacity hover:opacity-70 dark:text-white"
        >
          {site.name}
        </Link>

        {/* Center / Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-neutral-500 dark:text-neutral-400">
          <Link
            href="/#overview"
            className="transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Overview
          </Link>
          <Link
            href="/#work"
            className="transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Experience
          </Link>
          <Link
            href="/#specs"
            className="transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Tech Specs
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>

          <ThemeToggle />

          <a
            href={`mailto:${site.email}`}
            className="hidden sm:inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
          >
            Contact
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Navigation"
            className="text-neutral-600 dark:text-neutral-400 md:hidden"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-b border-black/8 bg-white/95 px-6 py-4 dark:border-white/10 dark:bg-black/95 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-300">
            <Link href="/#overview" onClick={() => setOpen(false)} className="hover:text-black dark:hover:text-white">
              Overview
            </Link>
            <Link href="/#work" onClick={() => setOpen(false)} className="hover:text-black dark:hover:text-white">
              Work
            </Link>
            <Link href="/#experience" onClick={() => setOpen(false)} className="hover:text-black dark:hover:text-white">
              Experience
            </Link>
            <Link href="/#specs" onClick={() => setOpen(false)} className="hover:text-black dark:hover:text-white">
              Tech Specs
            </Link>
            <Link href="/#contact" onClick={() => setOpen(false)} className="hover:text-black dark:hover:text-white">
              Contact
            </Link>
            <div className="pt-2 border-t border-black/6 dark:border-white/10 flex items-center justify-between">
              <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0066cc] dark:text-[#2997ff]">
                GitHub Profile ›
              </a>
              <a href={`mailto:${site.email}`} className="text-xs text-[#0066cc] dark:text-[#2997ff]">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
