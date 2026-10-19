"use client";

import React, { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#080c14]/85 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight text-neutral-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 font-mono text-sm font-bold text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            H
          </span>
          <span className="flex flex-col">
            <span className="flex items-center gap-2">
              {site.name}
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Available for 2026 roles" />
            </span>
            <span className="text-[11px] font-normal text-neutral-500 dark:text-neutral-400">
              ECE-CS · JIIT
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-neutral-600 dark:text-neutral-300">
          <Link
            href="/#work"
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
          >
            Projects
          </Link>
          <Link
            href="/#experience"
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
          >
            Experience
          </Link>
          <Link
            href="/#showcase"
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
          >
            Interactive Lab
          </Link>
          <Link
            href="/#skills"
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
          >
            Skills
          </Link>
          <Link
            href="/#achievements"
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
          >
            Achievements
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions: GitHub, Theme Toggle, Resume */}
        <div className="flex items-center gap-3">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
          >
            <svg
              className="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>

          <ThemeToggle />

          <a
            href={`mailto:${site.email}`}
            className="hidden sm:inline-flex rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-blue-500/25 active:scale-95"
          >
            Get in touch
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-300 md:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-black/8 bg-white/95 px-6 py-4 dark:border-white/10 dark:bg-[#080c14]/95 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <Link
              href="/#work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              Projects
            </Link>
            <Link
              href="/#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              Experience
            </Link>
            <Link
              href="/#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              Interactive Lab
            </Link>
            <Link
              href="/#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              Skills
            </Link>
            <Link
              href="/#achievements"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              Achievements
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-600 dark:hover:text-cyan-400"
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 dark:text-cyan-400"
              >
                GitHub Profile →
              </a>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
              >
                Email Me
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
