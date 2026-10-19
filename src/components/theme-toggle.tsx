"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`h-9 w-9 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center opacity-0 ${className}`}
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300/80 bg-neutral-100/80 text-neutral-700 shadow-sm transition-all duration-300 hover:border-blue-500 hover:bg-neutral-200/80 hover:scale-105 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:border-cyan-400 dark:hover:bg-neutral-800 ${className}`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        // Sun Icon for Dark Mode (click to turn light)
        <svg
          className="h-4 w-4 transition-transform duration-500 rotate-0 group-hover:rotate-90 text-amber-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        // Moon Icon for Light Mode (click to turn dark)
        <svg
          className="h-4 w-4 transition-transform duration-500 -rotate-12 group-hover:rotate-0 text-neutral-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
