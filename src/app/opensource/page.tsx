import Link from "next/link";
import { ExternalArrow } from "@/components/external-arrow";

export const metadata = {
  title: "Open source",
  description: "Himanshu Kumar's pull requests to Corsair (YC W25), an open-source integration SDK.",
};

interface Contribution {
  number: number;
  title: string;
  date: string;
  status: string;
  summary: string;
  stack: string[];
}

const REPO = "https://github.com/corsairdev/corsair";

// Written from the pull requests themselves; keep `status` in step with GitHub
const contributions: Contribution[] = [
  {
    number: 1828,
    title: "Turbot Pipes plugin",
    date: "Oct 2026",
    status: "Approved",
    summary:
      "A new plugin connecting Corsair to the Turbot Pipes API: 170 endpoints across 16 resource groups, local database schemas, error handling for rate limits, auth failures and bad requests, docs, and a Jest suite that covers every endpoint.",
    stack: ["TypeScript", "Jest", "REST"],
  },
  {
    number: 1893,
    title: "GitLab: clean up local records after a delete",
    date: "Oct 2026",
    status: "Approved",
    summary:
      "Deleting an issue, merge request or project on GitLab left its record behind in Corsair's local database. Now the local copy goes too, matched by project and IID, with numeric and path-style project IDs supported and a failed cleanup never hiding a successful delete.",
    stack: ["TypeScript", "GitLab API", "Jest"],
  },
  {
    number: 1892,
    title: "Trello: delete local cards and boards",
    date: "Oct 2026",
    status: "Approved",
    summary:
      "Deleting a card or board only marked the local copy as closed, which is archiving, not deleting. It now removes the record, so the local database matches Trello.",
    stack: ["TypeScript", "Trello API", "Jest"],
  },
];

export default function OpenSourcePage() {
  return (
    <div className="container-narrow rise pt-12">
      <Link
        href="/"
        className="text-[13px] text-[var(--muted-light)] transition-colors hover:text-[var(--foreground)]"
      >
        ← home
      </Link>
      <h1 className="mt-8 text-[19px] font-medium tracking-[-0.01em] text-[var(--foreground)]">Open source</h1>
      <p className="mt-2 mb-10 text-[var(--muted)]">
        I contribute to{" "}
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
        >
          Corsair
          <ExternalArrow />
        </a>
        , a YC W25 open-source SDK for connecting apps, with 15K+ stars on GitHub.
      </p>

      <div className="flex flex-col gap-10">
        {contributions.map((pr) => (
          <article key={pr.number}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[var(--foreground)]">
                <a
                  href={`${REPO}/pull/${pr.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 transition-colors hover:text-[var(--accent)]"
                >
                  {pr.title}
                  <ExternalArrow />
                </a>
              </h2>
              <span className="shrink-0 text-[var(--muted-light)] tabular-nums">{pr.date}</span>
            </div>
            <p className="text-[var(--muted-light)]">
              #{pr.number} · {pr.status}
            </p>
            <p className="mt-2.5 text-[var(--muted)]">{pr.summary}</p>
            <p className="mt-3 text-[13px] text-[var(--muted-light)]">{pr.stack.join(" · ")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
