import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-neutral-100/60 py-12 text-xs text-neutral-500 dark:border-white/10 dark:bg-[#060910] dark:text-neutral-400 transition-colors">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            {site.name} · {site.degree}
          </p>
          <p className="mt-1 text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} {site.name}. Built with Next.js, React & Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-medium">
          <a
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="transition-colors hover:text-amber-500"
            href={site.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode
          </a>
          <a
            className="transition-colors hover:text-purple-500"
            href={site.social.codeforces}
            target="_blank"
            rel="noopener noreferrer"
          >
            Codeforces
          </a>
          <a
            className="transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
            href={`mailto:${site.email}`}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
