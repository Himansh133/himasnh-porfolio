// Issue #1: the resume should download, not open as a page or a new tab.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const PDF = "/himanshu_resume.pdf";
const FILENAME = "himanshu_resume.pdf";

const assertDownloadLink = (source, label) => {
  const anchor = [...source.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .find((match) => match[2].replace(/<[^>]*>/g, "").trim() === label);
  assert.ok(anchor, `missing native anchor for ${label}`);
  assert.ok(anchor[1].includes(`href="${PDF}"`), "link has the wrong PDF path");
  assert.ok(anchor[1].includes(`download="${FILENAME}"`), "link has no download filename");
  assert.doesNotMatch(anchor[1], /\btarget\s*=/, "download link should not open a browsing context");
};

test("footer Resume link downloads the PDF instead of opening /resume", () => {
  const footer = read("src/components/footer.tsx");
  assert.doesNotMatch(footer, /href:\s*["']\/resume["']/, "footer still links to the /resume page");
  assertDownloadLink(footer, "Resume");
});

test("resume page Download PDF button downloads the PDF without opening a tab", () => {
  assertDownloadLink(read("src/app/resume/page.tsx"), "Download PDF");
});

test("the download path points to the existing PDF asset", () => {
  const pdf = readFileSync(new URL(`../public${PDF}`, import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
});

test("terminal `resume` command downloads the PDF instead of opening a tab", () => {
  const terminal = read("src/app/terminal/page.tsx");
  const start = terminal.indexOf('case "resume":');
  assert.notEqual(start, -1, 'terminal has no "resume" command');
  const block = terminal.slice(start, terminal.indexOf("break;", start));
  assert.ok(!block.includes("window.open"), "resume command still opens the PDF in a new tab");
  assert.match(block, /document\.createElement\("a"\)/, "resume command does not create an anchor");
  assert.ok(block.includes(`link.href = "${PDF}"`), "resume command has the wrong PDF path");
  assert.ok(block.includes(`link.download = "${FILENAME}"`), "resume command has no download filename");
  assert.match(block, /document\.body\.appendChild\(link\);\s*link\.click\(\);\s*link\.remove\(\);/, "resume command must trigger the download and clean up the anchor");
  assert.doesNotMatch(block, /\btarget\s*=/, "resume command should not open a browsing context");
  assert.match(block, /Starting resume download/, "response should describe the download");
  assert.match(terminal, /resume<\/span> : Download resume PDF/, "help should describe the download");
});
