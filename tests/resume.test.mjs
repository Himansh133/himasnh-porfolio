// Issue #1: the resume should download, not open as a page or a new tab.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const PDF = "/Himanshu_Kumar_Resume.pdf";

test("footer Resume link downloads the PDF instead of opening /resume", () => {
  const footer = read("src/components/footer.tsx");
  assert.doesNotMatch(footer, /href:\s*["']\/resume["']/, "footer still links to the /resume page");
  assert.ok(footer.includes(PDF), "footer does not link to the resume PDF");
  assert.match(footer, /\bdownload\b/, "footer resume link has no download attribute");
});

test("terminal `resume` command downloads the PDF instead of opening a tab", () => {
  const terminal = read("src/app/terminal/page.tsx");
  const start = terminal.indexOf('case "resume":');
  assert.notEqual(start, -1, 'terminal has no "resume" command');
  const block = terminal.slice(start, terminal.indexOf("break;", start));
  assert.ok(!block.includes("window.open"), "resume command still opens the PDF in a new tab");
  assert.ok(block.includes(PDF), "resume command does not use the resume PDF");
  assert.match(block, /\bdownload\b/, "resume command does not trigger a download");
});
