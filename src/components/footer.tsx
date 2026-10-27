import Link from "next/link";
import { site } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.social.github },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "LeetCode", href: site.social.leetcode },
  { label: "Codeforces", href: site.social.codeforces },
];

const pages = [
  { label: "Projects", href: "/projects" },
  { label: "Open source", href: "/opensource" },
  { label: "Activity", href: "/activity" },
  { label: "Stack", href: "/stack" },
  { label: "Resume", href: "/resume" },
];

export function Footer() {
  return (
    <footer className="container-narrow mt-20 pb-12 sm:mt-28">
      <div className="border-t border-[var(--border)] pt-5">
        <p className="text-[10px] text-[var(--muted-light)]">if you like writing emails:</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-3 inline-block border-b border-[var(--border)] text-[12px] text-[var(--muted)] transition-colors hover:border-[var(--muted-light)] hover:text-[var(--foreground)]"
        >
          {site.email}
        </a>

        <nav
          aria-label="Social profiles"
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[var(--muted)]"
        >
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#D21319]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <nav
          aria-label="Pages"
          className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[var(--muted-light)]"
        >
          {pages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
