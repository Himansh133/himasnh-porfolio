export interface Project {
  slug: string;
  title: string;
  year: string;
  eyebrow: string;
  category: "ai" | "systems" | "web";
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  tone: "blue" | "cyan" | "emerald" | "amber";
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  badge?: string;
  period: string;
  location: string;
  summary: string;
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
      "I am a software engineer (B.Tech ECE-CS, 2027 at JIIT Noida) working at the intersection of robust backend APIs, C++ systems automation, and autonomous LLM agents.",
      "At JV Micronics, I engineered a production RF test suite in C++17/Qt6 that automated Keysight FieldFox VNA sweeps, cutting test cycles from 10 hours to 7 minutes for 50 RF engineers. As an open-source contributor to Corsair (YC W25), I built plugins and fixed critical state sync issues across major integrations with 100+ tests.",
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
    { value: "10h → 7h", label: "RF sweep cycle time reduction", highlight: "98.8% faster" },
    { value: "15K+", label: "GitHub Stars on Corsair SDK", highlight: "3 PRs Merged" },
    { value: "50+", label: "Engineers using production tool", highlight: "JV Micronics" },
    { value: "500+", label: "DSA problems solved", highlight: "1700+ Rating" },
  ],
  skills: [
    {
      group: "Languages",
      description: "Core languages for high-performance systems and backend APIs",
      items: ["C++17", "C", "Python", "TypeScript", "SQL", "Bash"],
    },
    {
      group: "Frameworks & Backend",
      description: "Modern frameworks for web services and native GUI applications",
      items: ["FastAPI", "React.js", "Qt6", "Next.js", "LangChain", "Node.js"],
    },
    {
      group: "AI / ML & Agents",
      description: "Autonomous reasoning, deterministic guardrails, and LLM tooling",
      items: ["Gemini API", "LLM Tool-Calling", "RAG Pipelines", "OpenAI & Llama APIs", "Hugging Face"],
    },
    {
      group: "Cloud & DevOps",
      description: "Automated pipelines, containerization, and enterprise deployments",
      items: ["Docker", "GitHub Actions (CI/CD)", "AWS", "Oracle Cloud (OCI Certified)", "Linux", "PostgreSQL"],
    },
    {
      group: "Hardware & EDA",
      description: "Instrument communication protocols and RF design software",
      items: ["SCPI / GPIB Protocol", "Keysight VNA VISA", "MATLAB", "ANSYS HFSS", "Cadence Virtuoso"],
    },
  ],
};

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "JV Micronics",
    period: "May 2026 - July 2026",
    location: "dabad, India",
    summary:
      "Engineered automated RF test software and high-throughput instrument control for microwave & antenna testing.",
    stack: ["C++17", "Qt6", "SCPI", "GPIB", "USB VISA", "Keysight FieldFox"],
    points: [
      "Built a production Windows desktop tool in C++17 and Qt6 that drives a Keysight FieldFox N9951B VNA over SCPI (GPIB/USB), replacing manual RF test runs and slashing antenna sweep duration from 10 hours to 7 minutes.",
      "Designed a clean layered architecture separating instrument control, data acquisition, positioner automation, and test sequencing so new instruments and test plans plug in seamlessly without modifying the UI layer.",
      "Shipped a real-time Qt GUI with live plotting, automated calibration checks, and one-click test report generation adopted by 50 RF engineers.",
    ],
    links: [
      { label: "Antenna Measurement Software", url: "https://github.com/Himansh133" },
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Corsair (YC W25)",
    badge: "15K+ Stars SDK",
    period: "Oct 2026",
    location: "Remote / Open Source",
    summary:
      "Core contributor to the high-performance AI-agent integration SDK powering modern agentic workflows.",
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
    eyebrow: "Autonomous AI Agent",
    category: "ai",
    summary:
      "Autonomous agent using Gemini and 5 custom tools to recover failed invoices with deterministic discount guardrails.",
    description:
      "Revenue Rescue Agent is an intelligent invoice recovery system that ranks overdue invoices, predicts offer acceptance probability, and dynamically negotiates payments over multichannel outreach.",
    challenge:
      "Direct LLM financial decisions risk hallucinations, unsafe discounts, and unvalidated payouts. The system needed deterministic guardrails preventing the model from ever issuing unauthorized terms.",
    solution:
      "Decoupled financial logic from LLM prompt execution into deterministic verification services. The AI agent (powered by Gemini) invokes 5 specialized tools to score debts, while strict mathematical floors protect margin and automatically generate authenticated Razorpay links.",
    outcome:
      "Trained an offer-acceptance classifier on 30K synthetic invoice transactions, enabling dynamic discount optimization that turns delinquent accounts into completed Razorpay settlements.",
    metrics: [
      "30,000 synthetic transaction dataset",
      "5 autonomous agent tools",
      "Zero hallucinatory discount breach guarantee",
    ],
    stack: ["Python", "FastAPI", "Gemini API", "PostgreSQL", "Razorpay API", "Docker"],
    githubUrl: "https://github.com/Himansh133",
    liveUrl: "https://github.com/Himansh133",
    tone: "blue",
    featured: true,
  },
  {
    slug: "github-commit-explorer",
    title: "GitHub Commit Explorer",
    year: "2026",
    eyebrow: "hyperSprint 2026 Winner",
    category: "web",
    summary:
      "Natural-language Git explorer parsing natural queries into deep commit analytics with parallelized API fetches.",
    description:
      "An award-winning developer tool that converts plain English developer questions like 'github repo facebook/react commits last month' into instant visual commit graphs, repository insights, and contributor heatmaps.",
    challenge:
      "GitHub REST API rate limits and sporadic calendar endpoint throttling caused sluggish searches and broken contribution graphs.",
    solution:
      "Engineered parallelized async fetching for commits, repository metadata, and contribution calendars with automatic failover to a secondary calendar cache provider.",
    outcome:
      "Won 1st Prize at hyperSprint 2026 (hyperDart hackathon hosted at JIIT) for its intuitive natural language interface and zero-latency visual exploration.",
    metrics: [
      "1st Place Hackathon Winner",
      "Parallelized async multi-endpoint pipeline",
      "Automatic secondary calendar failover",
    ],
    stack: ["React", "TypeScript", "Vite", "GitHub REST API", "Tailwind CSS"],
    githubUrl: "https://github.com/Himansh133",
    liveUrl: "https://github.com/Himansh133",
    tone: "emerald",
    featured: true,
  },
  {
    slug: "fieldfox-rf-suite",
    title: "FieldFox RF Measurement Suite",
    year: "2026",
    eyebrow: "Production C++17 Tool",
    category: "systems",
    summary:
      "C++17/Qt6 automation software driving Keysight FieldFox VNA over SCPI, cutting 10-hour test runs to 7 minutes.",
    description:
      "High-reliability desktop automation application for high-frequency microwave and antenna testing, connecting multi-axis positioners and Keysight FieldFox N9951B Vector Network Analyzers.",
    challenge:
      "Manual RF test runs required continuous engineer intervention, taking up to 10 hours per antenna test matrix with high error susceptibility in manual calibration and angle indexing.",
    solution:
      "Engineered a modular, layered C++17 architecture with asynchronous SCPI communication across GPIB and USB VISA backends, automated stepper positioners, and real-time polar/Cartesian Qt6 visualization.",
    outcome:
      "Cut end-to-end antenna test sweep duration from 10 hours down to 7 minutes (98.8% time saved) and deployed into active production workflows across 50 RF engineers.",
    metrics: [
      "10h -> 7h sweep reduction (98.8%)",
      "50 production engineers using the tool",
      "Modular SCPI driver with zero UI coupling",
    ],
    stack: ["C++17", "Qt6", "SCPI Protocol", "GPIB / USB VISA", "CMake"],
    githubUrl: "https://github.com/Himansh133",
    tone: "cyan",
    featured: true,
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
