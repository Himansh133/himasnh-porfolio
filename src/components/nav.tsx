"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-md transition-colors">
        <div className="container-narrow flex h-14 items-center justify-between">
          {/* Left: ONLY Brand Name */}
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-[var(--foreground)] hover:opacity-85 transition-opacity flex items-center"
          >
            <span>Himanshu</span>
            <span className="text-[#D21319] font-bold">.</span>
          </Link>

          {/* Right: Things I've Built, Open Source, Drawer Toggle Button, Theme Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden sm:flex items-center gap-4 sm:gap-5 text-[13px] text-[var(--muted)]">
              <Link
                href="/projects"
                className={`transition-colors hover:text-[var(--foreground)] ${
                  pathname === "/projects" ? "text-[#D21319] font-medium" : ""
                }`}
              >
                Things I&apos;ve Built
              </Link>
              <Link
                href="/opensource"
                className={`transition-colors hover:text-[var(--foreground)] ${
                  pathname === "/opensource" ? "text-[#D21319] font-medium" : ""
                }`}
              >
                Open Source
              </Link>
            </nav>

            {/* Drawer Menu Button (Visible on both desktop & mobile, exactly like in the picture) */}
            <button
              id="menu-btn"
              type="button"
              aria-label="Toggle navigation drawer"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[#D21319]/40 transition-all cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Drawer Overlay (works on all screen sizes) */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Drawer Menu (opens on both desktop & mobile) */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] border-l border-[var(--border)] bg-[var(--drawer-bg)] p-6 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
            <Link
              href="/"
              onClick={() => setDrawerOpen(false)}
              className="text-base font-semibold tracking-tight text-[var(--foreground)]"
            >
              <span>Himanshu</span>
              <span className="text-[#D21319] font-bold">.</span>
            </Link>
            <button
              onClick={() => setDrawerOpen(false)}
              className="rounded-md p-1 text-[var(--muted)] hover:text-[var(--foreground)]"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Clean route paths with zero hashes */}
          <nav className="mt-6 flex flex-col space-y-4 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setDrawerOpen(false)}
              className={`transition-colors hover:text-[var(--foreground)] ${
                pathname === "/" ? "text-[#D21319]" : "text-[var(--muted)]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/projects"
              onClick={() => setDrawerOpen(false)}
              className={`transition-colors hover:text-[var(--foreground)] ${
                pathname === "/projects" ? "text-[#D21319]" : "text-[var(--muted)]"
              }`}
            >
              Things I&apos;ve Built
            </Link>
            <Link
              href="/opensource"
              onClick={() => setDrawerOpen(false)}
              className={`transition-colors hover:text-[var(--foreground)] ${
                pathname === "/opensource" ? "text-[#D21319]" : "text-[var(--muted)]"
              }`}
            >
              Open Source
            </Link>
            <Link
              href="/experience"
              onClick={() => setDrawerOpen(false)}
              className={`transition-colors hover:text-[var(--foreground)] ${
                pathname === "/experience" ? "text-[#D21319]" : "text-[var(--muted)]"
              }`}
            >
              Experience
            </Link>
            <Link
              href="/activity"
              onClick={() => setDrawerOpen(false)}
              className={`transition-colors hover:text-[var(--foreground)] ${
                pathname === "/activity" ? "text-[#D21319]" : "text-[var(--muted)]"
              }`}
            >
              Activity Heatmaps
            </Link>
            <Link
              href="/stack"
              onClick={() => setDrawerOpen(false)}
              className={`transition-colors hover:text-[var(--foreground)] ${
                pathname === "/stack" ? "text-[#D21319]" : "text-[var(--muted)]"
              }`}
            >
              Tech Stack
            </Link>
            <Link
              href="/resume"
              onClick={() => setDrawerOpen(false)}
              className={`transition-colors hover:text-[var(--foreground)] ${
                pathname === "/resume" ? "text-[#D21319]" : "text-[var(--muted)]"
              }`}
            >
              Resume
            </Link>
            <Link
              href="/terminal"
              onClick={() => setDrawerOpen(false)}
              className="font-mono text-[#D21319] hover:opacity-80 transition-colors pt-2 border-t border-[var(--border)]"
            >
              &gt;_ Terminal Mode
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)]">
          <p>© 2026 {site.name}</p>
        </div>
      </div>
    </>
  );
}
