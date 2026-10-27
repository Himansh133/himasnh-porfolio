import {
  type SimpleIcon,
  siC,
  siCplusplus,
  siDocker,
  siFastapi,
  siGithubactions,
  siGnubash,
  siGooglegemini,
  siHuggingface,
  siLangchain,
  siLinux,
  siMeta,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siQt,
  siReact,
  siTypescript,
} from "simple-icons";
import { site } from "@/lib/site";

// Outline glyphs for things without a logo, or whose makers have asked
// Simple Icons to remove theirs
const GLYPHS = {
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.75" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-13" />
      <path d="M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75" />
    </>
  ),
  cloud: <path d="M7 18.5h10a4 4 0 0 0 .6-7.95 6 6 0 0 0-11.4-1.4A4.6 4.6 0 0 0 7 18.5z" />,
  spark: (
    <>
      <path d="M11 4l1.7 4.8 4.8 1.7-4.8 1.7L11 17l-1.7-4.8-4.8-1.7 4.8-1.7z" />
      <path d="M18 15l.8 2.2 2.2.8-2.2.8L18 21l-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  wave: <path d="M2.5 12h3l2.25-6.5 4.5 13 3.25-9 1.75 2.5h4.25" />,
  curve: (
    <>
      <path d="M3 20.5h18" />
      <path d="M3.5 20c4.5 0 5.5-15 8.5-15s4 15 8.5 15" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2.75l8 4.5v9.5l-8 4.5-8-4.5v-9.5z" />
      <path d="M4 7.25l8 4.5 8-4.5M12 11.75v9.5" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9.5 2.5V6M14.5 2.5V6M9.5 18v3.5M14.5 18v3.5M2.5 9.5H6M2.5 14.5H6M18 9.5h3.5M18 14.5h3.5" />
    </>
  ),
};

type Icon = SimpleIcon | keyof typeof GLYPHS;

const ICONS: Record<string, Icon> = {
  "C++17": siCplusplus,
  C: siC,
  Python: siPython,
  TypeScript: siTypescript,
  SQL: "database",
  Bash: siGnubash,
  FastAPI: siFastapi,
  React: siReact,
  Qt6: siQt,
  "Next.js": siNextdotjs,
  LangChain: siLangchain,
  "Node.js": siNodedotjs,
  "Gemini API": siGooglegemini,
  "LLM tool calling": "spark",
  "RAG pipelines": "spark",
  "OpenAI API": "spark",
  Llama: siMeta,
  "Hugging Face": siHuggingface,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  AWS: "cloud",
  "Oracle Cloud (OCI)": "cloud",
  Linux: siLinux,
  PostgreSQL: siPostgresql,
  "SCPI / GPIB": "wave",
  "Keysight VISA": "wave",
  MATLAB: "curve",
  "ANSYS HFSS": "cube",
  "Cadence Virtuoso": "chip",
};

// Brand colours show on hover; ones too dark or too pale to read on either
// theme fall back to the text colour
function hoverColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const light = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return light < 0.12 || light > 0.85 ? "var(--foreground)" : `#${hex}`;
}

function TechIcon({ icon }: { icon?: Icon }) {
  if (!icon) return <span className="size-4 shrink-0" />;
  if (typeof icon === "string") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0"
      >
        {GLYPHS[icon]}
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
      <path d={icon.path} />
    </svg>
  );
}

export function SkillsSection() {
  return (
    <div className="flex flex-col gap-12">
      {site.skills.map((group) => (
        <section key={group.group} aria-label={group.group}>
          <p className="mb-5 text-[11px] text-[var(--muted-light)]">{group.group.toLowerCase()}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-3">
            {group.items.map((name) => {
              const icon = ICONS[name];
              const color = icon && typeof icon !== "string" ? hoverColor(icon.hex) : "var(--foreground)";
              return (
                <li
                  key={name}
                  style={{ "--brand": color } as React.CSSProperties}
                  className="group flex items-center gap-2.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  <span className="text-[var(--muted-light)] transition-colors duration-200 group-hover:text-[var(--brand)]">
                    <TechIcon icon={icon} />
                  </span>
                  {name}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
