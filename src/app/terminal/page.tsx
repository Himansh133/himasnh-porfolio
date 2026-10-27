"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

interface CommandLog {
  id: number;
  command: string;
  output: React.ReactNode;
}

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 1,
      command: "welcome",
      output: (
        <div className="space-y-1 text-[var(--accent)]">
          <p className="font-bold">Himanshu Kumar Terminal [Version 2.0.26]</p>
          <p className="text-[#AFAEA2]">
            Type &apos;<span className="text-[var(--accent)] font-bold">help</span>&apos; to view all available commands.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response: React.ReactNode;

    switch (cmd) {
      case "help":
        response = (
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-[var(--accent)] font-semibold">Available commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1 text-[#AFAEA2]">
              <div><span className="text-[var(--accent)] font-mono">about</span> : Brief biography</div>
              <div><span className="text-[var(--accent)] font-mono">skills</span> : Technical capabilities</div>
              <div><span className="text-[var(--accent)] font-mono">projects</span> : Shipped applications</div>
              <div><span className="text-[var(--accent)] font-mono">experience</span> : Work &amp; Open Source</div>
              <div><span className="text-[var(--accent)] font-mono">socials</span> : Profiles &amp; handles</div>
              <div><span className="text-[var(--accent)] font-mono">contact</span> : Email &amp; phone</div>
              <div><span className="text-[var(--accent)] font-mono">resume</span> : View resume PDF</div>
              <div><span className="text-[var(--accent)] font-mono">clear</span> : Clear screen</div>
              <div><span className="text-[var(--accent)] font-mono">exit</span> : Back to portfolio</div>
            </div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="space-y-1.5 text-xs sm:text-sm text-neutral-200">
            <p className="font-semibold text-white">Himanshu Kumar</p>
            <p>Software Engineer (B.Tech ECE-CS, 2027 at JIIT Noida).</p>
            <p>
              Specializing in C++17 test automation, autonomous LLM agent pipelines, and high-performance backend APIs.
            </p>
            <p className="text-[#AFAEA2]">
              Shipped production RF instrumentation tool at JV Micronics (cut sweep from 10h to 7m) and approved PRs to Corsair (YC W25) SDK.
            </p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1.5 text-xs sm:text-sm text-neutral-200">
            <p className="text-[var(--accent)] font-semibold">Core Competencies:</p>
            <p>• Languages: C++, C, Python, TypeScript, SQL, Bash</p>
            <p>• Frameworks: FastAPI, React.js, Qt6, Next.js, LangChain</p>
            <p>• AI / ML: Gemini API, LLM Agents, Tool-Calling, RAG</p>
            <p>• Cloud &amp; DevOps: Docker, GitHub Actions, AWS, OCI Certified, Linux</p>
            <p>• Hardware: SCPI / GPIB Protocols, Keysight VNA VISA</p>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-xs sm:text-sm text-neutral-200">
            <div>
              <p className="text-[var(--accent)] font-semibold">1. Revenue Rescue Agent (Sep 2026)</p>
              <p className="text-[#AFAEA2]">
                Autonomous AI agent (Gemini, 5 tools) that recovers invoices with deterministic discount floors and Razorpay payment links.
              </p>
            </div>
            <div>
              <p className="text-[var(--accent)] font-semibold">2. GitHub Commit Explorer (Aug 2026 : hyperSprint 2026 Winner)</p>
              <p className="text-[#AFAEA2]">
                Natural-language Git explorer with parallel API fetching and calendar failover.
              </p>
            </div>
            <div>
              <p className="text-[var(--accent)] font-semibold">3. FieldFox RF Measurement Suite (May 2026)</p>
              <p className="text-[#AFAEA2]">
                C++17/Qt6 automation tool driving Keysight FieldFox VNA, slashing sweeps from 10h to 7m.
              </p>
            </div>
          </div>
        );
        break;

      case "experience":
        response = (
          <div className="space-y-2 text-xs sm:text-sm text-neutral-200">
            <div>
              <p className="text-[var(--accent)] font-semibold">
                Software Engineering Intern @ JV Micronics (May 2026 - July 2026)
              </p>
              <p className="text-[#AFAEA2]">
                C++17, Qt6, SCPI, GPIB • Automated RF test runs, 10h to 7m sweep reduction, deployed to 50 engineers.
              </p>
            </div>
            <div>
              <p className="text-[var(--accent)] font-semibold">
                Open Source Contributor @ Corsair (YC W25) (Oct 2026)
              </p>
              <p className="text-[#AFAEA2]">
                15K+ Stars SDK • PR #1828 (Turbot Pipes), PR #1893 (GitLab sync), PR #1892 (Trello sync) with 100+ tests.
              </p>
            </div>
          </div>
        );
        break;

      case "socials":
        response = (
          <div className="space-y-1 text-xs sm:text-sm text-neutral-200">
            <p>• GitHub: https://github.com/Himansh133</p>
            <p>• LinkedIn: https://linkedin.com/in/himanshu-kumar-8686aa2a1</p>
            <p>• LeetCode: https://leetcode.com/u/UM00P4fvdz (1700+ Rating, 500+ solved)</p>
            <p>• Codeforces: https://codeforces.com/profile/himanshuCodes (Pupil)</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-xs sm:text-sm text-neutral-200">
            <p>• Email: himanshu3836@gmail.com</p>
            <p>• Phone: +91 9110058109</p>
            <p>• Location: Noida / Faridabad, India</p>
          </div>
        );
        break;

      case "resume":
        window.open("/Himanshu_Kumar_Resume.pdf", "_blank");
        response = <p className="text-[var(--accent)]">Opening resume in a new tab...</p>;
        break;

      case "exit":
        window.location.href = "/";
        response = <p className="text-neutral-400">Redirecting to home...</p>;
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      default:
        response = (
          <p className="text-[var(--accent)]">
            Command not recognized: &apos;{cmd}&apos;. Type &apos;help&apos; for list of valid commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        command: input,
        output: response,
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#AFAEA2] font-mono py-8 px-4 sm:px-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[var(--accent)] inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#AFAEA2] inline-block" />
            <span className="h-3 w-3 rounded-full bg-neutral-700 inline-block" />
            <span className="ml-2 text-[#AFAEA2]">himanshu@terminal: ~</span>
          </div>

          <Link
            href="/"
            className="text-[#AFAEA2] hover:text-[var(--accent)] transition-colors"
          >
            [Exit Terminal]
          </Link>
        </div>

        {/* Command Output Stream */}
        <div className="mt-6 space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#AFAEA2]">
                <span className="text-[var(--accent)] font-bold">&gt;</span>
                <span className="text-white">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}
        </div>

        {/* Command Input Prompt */}
        <form onSubmit={handleCommand} className="mt-6 flex items-center gap-2">
          <span className="text-[var(--accent)] font-bold text-sm sm:text-base">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help'..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white focus:outline-hidden placeholder:text-neutral-600"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>

      <div className="max-w-4xl mx-auto w-full pt-8 text-center text-xs text-[#AFAEA2]/50">
        Himanshu Kumar Terminal Mode • Midnight Navy &amp; Crimson Edition
      </div>
    </div>
  );
}
