export interface Project {
  slug: string;
  title: string;
  year: string;
  eyebrow: string;
  category: "ai" | "systems" | "web";
  /** Short blurb shown in the project list */
  summary: string;
  /** Optional screenshot under /public, shown on the project page */
  image?: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: string[];
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  badge?: string;
  /** Company site, linked from the experience list */
  url?: string;
  period: string;
  location: string;
  summary: string;
  /** Short paragraphs shown in the experience list */
  blurb: string[];
  stack: string[];
  points: string[];
  links?: { label: string; url: string }[];
}

export interface Achievement {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  category: "hackathon" | "dsa" | "certification" | "leadership";
  icon: "trophy" | "code" | "cert" | "users";
  badge?: string;
  link?: string;
}

export const site = {
  name: "Himanshu Kumar",
  role: "Software Engineer & Systems Builder",
  college: "Jaypee Institute of Information Technology (JIIT)",
  degree: "B.Tech in Electronics and Communication Engineering (ECE-CS), 2023 - 2027",
  location: "Noida, India",
  email: "himanshu3836@gmail.com",
  phone: "+91 9110058109",
  tagline: "Building autonomous LLM agents, scalable backend APIs, and high-performance C++ test automation.",
  about: {
    headline: "Bridging deterministic systems with intelligent LLM autonomy.",
    body: [
      "I engineer systems at the intersection of high-speed C++, scalable web backends, and AI agents. Currently at JIIT Noida (2027), I build developer tooling, contribute to Corsair (YC W25), and design reliable software built for scale.",
      "As an open-source contributor to Corsair (YC W25), I build plugins and fix critical synchronization bugs across core SDK integrations with comprehensive automated tests.",
      "I believe in building software that does not just look sleek, but solves hard engineering challenges with provable speed, deterministic safety floors, and resilient architecture.",
    ],
  },
  social: {
    github: "https://github.com/Himansh133",
    linkedin: "https://linkedin.com/in/himanshu-kumar-8686aa2a1",
    leetcode: "https://leetcode.com/u/UM00P4fvdz",
    codeforces: "https://codeforces.com/profile/himanshuCodes",
    email: "mailto:himanshu3836@gmail.com",
  },
  stats: [
    { value: "15K+", label: "GitHub Stars on Corsair SDK", highlight: "3 PRs Merged" },
    { value: "500+", label: "DSA problems solved", highlight: "1700+ Rating" },
  ],
  skills: [
    {
      group: "Languages",
      description: "Core languages for high-performance systems and backend APIs",
      items: ["C++17", "C", "Python", "TypeScript", "SQL", "Bash"],
    },
    {
      group: "Frameworks",
      description: "Modern frameworks for web services and native GUI applications",
      items: ["FastAPI", "React", "Qt6", "Next.js", "LangChain", "Node.js"],
    },
    {
      group: "AI & agents",
      description: "Autonomous reasoning, deterministic guardrails, and LLM tooling",
      items: ["Gemini API", "OpenAI API", "Llama", "Hugging Face", "LLM tool calling", "RAG pipelines"],
    },
    {
      group: "Cloud & DevOps",
      description: "Automated pipelines, containerization, and enterprise deployments",
      items: ["Docker", "GitHub Actions", "AWS", "Oracle Cloud (OCI)", "Linux", "PostgreSQL"],
    },
    {
      group: "Hardware & EDA",
      description: "Instrument communication protocols and RF design software",
      items: ["SCPI / GPIB", "Keysight VISA", "MATLAB", "ANSYS HFSS", "Cadence Virtuoso"],
    },
  ],
};

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "JV Micronics",
    period: "May – Jul 2026",
    location: "Faridabad, India",
    summary:
      "Engineered automated RF test software and high-throughput instrument control for microwave & antenna testing.",
    blurb: [
      "Built a Windows desktop tool in C++17 and Qt6 that drives a Keysight FieldFox VNA over SCPI, replacing manual antenna test runs.",
      "It drives the analyzer and the positioners through a full antenna sweep on its own, then writes the report.",
    ],
    stack: ["C++17", "Qt6", "SCPI", "GPIB", "USB VISA", "Keysight FieldFox"],
    points: [
      "Built a production Windows desktop tool in C++17 and Qt6 that drives a Keysight FieldFox N9951B VNA over SCPI (GPIB/USB), replacing manual RF test runs with automated antenna sweeps.",
      "Designed a clean layered architecture separating instrument control, data acquisition, positioner automation, and test sequencing so new instruments and test plans plug in seamlessly without modifying the UI layer.",
      "Shipped a real-time Qt GUI with live plotting, automated calibration checks, and one-click test report generation.",
    ],
    links: [
      { label: "Antenna Measurement Software", url: "https://github.com/Himansh133" },
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Corsair (YC W25)",
    badge: "15K+ Stars SDK",
    url: "https://corsair.dev",
    period: "Oct 2026",
    location: "Remote / Open Source",
    summary:
      "Core contributor to the high-performance AI-agent integration SDK powering modern agentic workflows.",
    blurb: [
      "Built the Turbot Pipes plugin end to end for the agent-integration SDK: 17 API modules and 86 tests.",
      "Also fixed delete-sync bugs in the GitLab and Trello integrations so agents stop acting on stale state.",
    ],
    stack: ["TypeScript", "Node.js", "Jest / Vitest", "Turbot Pipes", "GitLab API", "Trello API"],
    points: [
      "PR #1828: Built the Turbot Pipes plugin end-to-end featuring 17 API modules, strictly typed schemas, comprehensive documentation, and 86 unit and integration tests.",
      "PR #1893: Resolved GitLab delete sync race condition for issues, merge requests, and projects, eliminating stale agent state across long-running pipelines; added 14 tests.",
      "PR #1892: Fixed Trello local mirror sync to reliably prune deleted cards and boards, maintaining state consistency; added 4 regression tests.",
    ],
    links: [
      { label: "PR #1828 (Turbot Pipes)", url: "https://github.com/Himansh133" },
      { label: "PR #1893 (GitLab Sync)", url: "https://github.com/Himansh133" },
      { label: "PR #1892 (Trello Sync)", url: "https://github.com/Himansh133" },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "revenue-rescue-agent",
    title: "Revenue Rescue Agent",
    year: "2026",
    eyebrow: "Autonomous AI agent",
    category: "ai",
    summary:
      "An agent that chases overdue invoices on its own. Gemini picks the offer, but plain code sets the discount limit, so it can never give away margin.",
    description:
      "Revenue Rescue Agent is an invoice recovery system. It ranks overdue invoices, predicts how likely each customer is to accept an offer, and negotiates payment over multichannel outreach.",
    challenge:
      "Letting an LLM make financial decisions risks hallucinated terms and unsafe discounts. The system needed hard guardrails so the model could never issue terms nobody authorized.",
    solution:
      "Financial logic lives in deterministic verification services, separate from the prompt. The Gemini agent calls 5 specialized tools to score each debt, while strict mathematical floors protect margin and generate authenticated Razorpay payment links.",
    outcome:
      "An offer-acceptance classifier trained on 30K synthetic invoice transactions drives dynamic discounts, turning delinquent accounts into completed Razorpay settlements.",
    metrics: [
      "30,000 synthetic transactions in the training set",
      "5 autonomous agent tools",
      "Discounts can never breach the margin floor",
    ],
    stack: ["Python", "FastAPI", "Gemini API", "PostgreSQL", "Razorpay API", "Docker"],
    githubUrl: "https://github.com/Himansh133/razorpay--revenue-rescue",
    liveUrl: "https://razorpay-revenue-rescue.vercel.app",
    featured: true,
  },
  {
    slug: "github-commit-explorer",
    title: "GitHub Commit Explorer",
    year: "2026",
    eyebrow: "hyperSprint 2026 winner",
    category: "web",
    summary:
      "Ask about a repo in plain English, like “github repo facebook/react”, and get its commits, stats and contributor activity back. Won 1st place at hyperSprint 2026.",
    description:
      "A developer tool built for the HyperDart hackathon. It turns plain-English questions such as “show github activity for gaearon” into commit history, repository insights and contributor activity.",
    challenge:
      "GitHub's REST API rate limits and a flaky contribution-calendar endpoint made searches slow and graphs incomplete.",
    solution:
      "Commits, repository metadata and contribution calendars are fetched in parallel, with automatic failover to a secondary calendar provider when the primary one throttles.",
    outcome:
      "Won 1st prize at hyperSprint 2026, the HyperDart hackathon hosted at JIIT, for its natural-language interface and fast visual exploration.",
    metrics: [
      "1st place at hyperSprint 2026",
      "Parallel multi-endpoint fetching",
      "Automatic calendar failover",
    ],
    stack: ["React", "TypeScript", "Vite", "GitHub REST API"],
    githubUrl: "https://github.com/Himansh133/HyperDart_Hackathon",
    featured: true,
  },
  {
    slug: "fieldfox-rf-suite",
    title: "FieldFox RF Measurement Suite",
    year: "2026",
    eyebrow: "C++17 desktop tool",
    category: "systems",
    summary:
      "Desktop software that runs antenna tests on a Keysight FieldFox VNA over SCPI. Built at JV Micronics to replace manual test runs.",
    description:
      "A desktop automation app for microwave and antenna testing. It connects multi-axis positioners and a Keysight FieldFox N9951B vector network analyzer, and plots results live.",
    challenge:
      "Manual RF test runs needed an engineer at the bench for the whole sweep, with plenty of room for error in calibration and angle indexing.",
    solution:
      "A layered C++17 architecture keeps instrument control, data acquisition, positioner automation and test sequencing apart, so new instruments plug in without touching the UI. SCPI runs over GPIB and USB VISA, with real-time polar and Cartesian plots in Qt6.",
    outcome:
      "A full antenna sweep runs on its own, from calibration checks to the finished report.",
    metrics: [
      "Sweeps run unattended, end to end",
      "Calibration checks and reports built in",
      "SCPI driver fully decoupled from the UI",
    ],
    stack: ["C++17", "Qt6", "SCPI", "GPIB / USB VISA", "CMake"],
    githubUrl: "https://github.com/Himansh133/AMAS_JV",
    featured: true,
  },
  {
    slug: "vivobook-smart-power",
    title: "Vivobook Smart Power",
    year: "2026",
    eyebrow: "Linux utility",
    category: "systems",
    summary:
      "A small background service that switches a Linux laptop's power profile based on what it's doing. A rough stand-in for Windows' Dynamic mode.",
    description:
      "A background service for Linux laptops. It samples CPU and NVIDIA GPU load every 10 seconds and talks to power-profiles-daemon through powerprofilesctl to pick the right profile.",
    challenge:
      "Switching profiles on every load spike makes a machine twitchy, and cooling has to stay with the firmware, not with a script.",
    solution:
      "Heavy load has to last about 30 seconds before it switches to performance, and the load has to be gone for about 2 minutes before it drops back to balanced. A hot CPU package forces balanced until it cools down. Fan speed is never touched.",
    outcome:
      "Works as intended on the one laptop it has been tested on. It is experimental (v0.1.0), and the README lists its limitations.",
    metrics: [
      "Samples CPU and GPU every 10 seconds",
      "30 s of sustained load before switching up",
      "Never touches fan control",
    ],
    stack: ["Shell", "power-profiles-daemon", "NVIDIA GPU stats"],
    githubUrl: "https://github.com/Himansh133/vivobook-smart-power",
    featured: false,
  },
];

export const achievements: Achievement[] = [
  {
    title: "1st Place Winner : hyperSprint 2026",
    subtitle: "hyperDart Hackathon at JIIT",
    date: "August 2026",
    description:
      "Awarded 1st place among top engineering teams for designing and building GitHub Commit Explorer, recognized for its natural-language parsing and parallel API architecture.",
    category: "hackathon",
    icon: "trophy",
    badge: "1st Place",
  },
  {
    title: "500+ DSA Problems Solved",
    subtitle: "LeetCode & Codeforces",
    date: "Active",
    description:
      "Strong algorithmic foundation with 500+ problems solved across data structures, graph theory, dynamic programming, and greedy algorithms. 1700+ LeetCode rating and Pupil on Codeforces.",
    category: "dsa",
    icon: "code",
    badge: "1700+ Rating",
    link: "https://leetcode.com/u/UM00P4fvdz",
  },
  {
    title: "Oracle Cloud Infrastructure (OCI) DevOps Certified",
    subtitle: "Oracle Official Certification",
    date: "2026",
    description:
      "Certified in enterprise cloud infrastructure, containerized deployments, Kubernetes orchestration, and continuous integration / continuous delivery (CI/CD) pipelines.",
    category: "certification",
    icon: "cert",
    badge: "Certified",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
