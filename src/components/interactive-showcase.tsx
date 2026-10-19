"use client";

import React, { useState } from "react";

type LabMode = "agent" | "rf" | "parser";

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<LabMode>("agent");
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Ready. Select a project simulation below and press Run Simulation.",
  ]);
  const [progress, setProgress] = useState(0);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    setTerminalLogs([]);

    if (activeTab === "agent") {
      const logs = [
        "[Agent Init] Loading Revenue Rescue Agent (Gemini 1.5 Pro + 5 deterministic tools)...",
        "[Tool: InvoiceProfiler] Inspecting delinquent invoice #INV-8924: Principal $1,450.00, overdue: 42 days.",
        "[Guardrail Check] Invoking Deterministic Floor Validator (Enforcing min settlement >= $1,100.00)...",
        "[Guardrail Pass] Safe discount ceiling verified: Max allowable discount = 24.1%.",
        "[ML Model] Predicting acceptance probability across 30,000 synthetic transaction weights: 91.4% confidence.",
        "[Agent Action] Generating one-time payment settlement offer of $1,180.00 (18.6% recovery rate).",
        "[Payment Gateway] Razorpay API link generated: https://rzp.io/i/rescue-8924",
        "[Outreach Dispatch] Message payload scheduled for customer outreach via automated webhook.",
        "[SUCCESS] Settlement created with verified safety floor. Zero hallucination risk."
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setTerminalLogs((prev) => [...prev, log]);
          setProgress(Math.round(((index + 1) / logs.length) * 100));
          if (index === logs.length - 1) {
            setIsRunning(false);
          }
        }, (index + 1) * 350);
      });
    } else if (activeTab === "rf") {
      const logs = [
        "[Hardware Init] Initializing SCPI VISA Session over GPIB::16::INSTR...",
        "[FieldFox Connected] Keysight N9951B (Firmware A.12.04) identified.",
        "[Positioner Service] Zeroing dual-axis azimuth/elevation stepper motor...",
        "[Sweep Profile] Frequency range: 2.4 GHz - 5.8 GHz, 1601 points, IF BW: 10 kHz.",
        "[Automation Loop] Traditional manual test estimate: 10h 00m (600 mins).",
        "[Sweep Step 1/4] Azimuth 0° to 90°: 400 pts acquired in 1m 45s.",
        "[Sweep Step 2/4] Azimuth 90° to 180°: 400 pts acquired in 1m 45s.",
        "[Sweep Step 3/4] Azimuth 180° to 270°: 400 pts acquired in 1m 45s.",
        "[Sweep Step 4/4] Azimuth 270° to 360°: 400 pts acquired in 1m 45s.",
        "[Qt6 GUI Render] S11 Return Loss & Polar radiation pattern calculated in real time.",
        "[SUCCESS] Antenna sweep finished in 7m 00s (98.8% reduction vs manual 10 hours). Report saved."
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setTerminalLogs((prev) => [...prev, log]);
          setProgress(Math.round(((index + 1) / logs.length) * 100));
          if (index === logs.length - 1) {
            setIsRunning(false);
          }
        }, (index + 1) * 350);
      });
    } else {
      const logs = [
        "[Query Input] 'github repo facebook/react commits last month'",
        "[Tokenizer] Parsed intent: TYPE='repo', ORG='facebook', NAME='react', TIMEFRAME='P30D'.",
        "[Parallel Fetch 1/3] GET api.github.com/repos/facebook/react/commits?since=2026-09-19...",
        "[Parallel Fetch 2/3] GET api.github.com/repos/facebook/react/stats/contributors...",
        "[Parallel Fetch 3/3] GET secondary calendar provider for fallback redundancy...",
        "[Response Aggregation] 248 commits parsed in 142ms across parallel HTTP workers.",
        "[Fallback Engine] Primary rate limit healthy (4,890 remaining); fallback cached as failover.",
        "[UI Render] Commit heatmap, frequency histogram, and author breakdown generated.",
        "[SUCCESS] hyperSprint 2026 winning query engine executed successfully."
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          setTerminalLogs((prev) => [...prev, log]);
          setProgress(Math.round(((index + 1) / logs.length) * 100));
          if (index === logs.length - 1) {
            setIsRunning(false);
          }
        }, (index + 1) * 350);
      });
    }
  };

  return (
    <section id="showcase" className="py-20 border-t border-b border-black/5 dark:border-white/5 bg-neutral-50/50 dark:bg-[#0b101c]/50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-cyan-400">
              <span>Interactive System Lab</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Experience the Architecture Live
            </h2>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">
              Simulate the inner mechanics of Himanshu&apos;s AI agent guardrails, RF instrument sweeps, and query pipelines.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex rounded-xl bg-neutral-200/70 p-1 dark:bg-neutral-800/80">
            <button
              onClick={() => {
                setActiveTab("agent");
                setTerminalLogs(["Ready to test Revenue Rescue Agent (AI + Deterministic Guardrails)."]);
                setProgress(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "agent"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-[#131c31] dark:text-cyan-400"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              AI Agent Guardrail
            </button>
            <button
              onClick={() => {
                setActiveTab("rf");
                setTerminalLogs(["Ready to test C++17 FieldFox RF Sweep Automation (10h → 7m)."]);
                setProgress(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "rf"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-[#131c31] dark:text-cyan-400"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              FieldFox RF Sweep
            </button>
            <button
              onClick={() => {
                setActiveTab("parser");
                setTerminalLogs(["Ready to test Natural-Language GitHub Commit Explorer."]);
                setProgress(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "parser"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-[#131c31] dark:text-cyan-400"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              Git NL Parser
            </button>
          </div>
        </div>

        {/* Terminal Container */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-800 bg-[#090d16] text-neutral-200 shadow-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-neutral-800/80 bg-[#0d1322] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-neutral-400">
                {activeTab === "agent" && "revenue_rescue_agent.py (FastAPI / Gemini / Razorpay)"}
                {activeTab === "rf" && "keysight_fieldfox_sweep.cpp (C++17 / Qt6 / SCPI)"}
                {activeTab === "parser" && "nl_commit_explorer.ts (React / Vite / REST API)"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-500">
                {progress > 0 && `${progress}%`}
              </span>
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold shadow-sm transition-all ${
                  isRunning
                    ? "bg-neutral-800 text-neutral-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white active:scale-95 shadow-blue-500/20"
                }`}
              >
                {isRunning ? (
                  <>
                    <svg className="h-3 w-3 animate-spin text-neutral-400" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <span>▶ Run Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress bar line */}
          <div className="h-1 w-full bg-neutral-900">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Terminal Output Area */}
          <div className="min-h-[220px] max-h-[340px] overflow-y-auto p-5 font-mono text-xs leading-6 select-text">
            {terminalLogs.map((log, index) => {
              const isSuccess = log.includes("[SUCCESS]");
              const isGuardrail = log.includes("[Guardrail");
              const isAction = log.includes("[Agent Action]") || log.includes("[Qt6 GUI");

              return (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    isSuccess
                      ? "text-emerald-400 font-bold"
                      : isGuardrail
                      ? "text-amber-300 font-medium"
                      : isAction
                      ? "text-cyan-300 font-medium"
                      : "text-neutral-300"
                  }`}
                >
                  <span className="text-neutral-600 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom context caption */}
          <div className="border-t border-neutral-800/80 bg-[#0d1322]/80 px-4 py-2.5 flex items-center justify-between text-[11px] text-neutral-400">
            <div>
              {activeTab === "agent" && "Guardrail Service prevents LLM hallucinations from breaching financial margin."}
              {activeTab === "rf" && "Layered driver allows instrument swaps without touching the Qt6 presentation layer."}
              {activeTab === "parser" && "Won 1st prize at hyperSprint 2026 hackathon at JIIT Noida."}
            </div>
            <div className="text-neutral-500 font-mono">
              status: {isRunning ? "active" : "idle"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
