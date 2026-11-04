import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/components/prism-canvas.tsx", import.meta.url), "utf8");
// Execute the actual drawing expressions without requiring a browser or React renderer.
const pulseCode = source.slice(source.indexOf("        for (let k = 0; k < PULSES; k++)"),
  source.indexOf("        pulseGrad.addColorStop(1,"));
assert.ok(pulseCode.includes("pulseGrad.addColorStop"));
const drawPulses = new Function("t", "dark", "pulseGrad", `
  const PULSES = 3;
  const ink = dark ? "255,255,255" : "29,29,31";
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  ${pulseCode}
`);
const dtExpression = source.match(/const dt = ([^;]+);/)[1];
const frameDelta = new Function("elapsed", `return ${dtExpression};`);

function stopsAt(time, dark = true) {
  const stops = [];
  drawPulses(time, dark, { addColorStop(position, color) {
    assert.ok(Number.isFinite(position) && position >= 0 && position <= 1,
      `invalid gradient stop: ${position}`);
    assert.ok(!/NaN|Infinity/.test(color), `invalid color: ${color}`);
    stops.push([position, color]);
  } });
  assert.equal(stops.length, 9);
  for (let i = 0; i < stops.length; i += 3) {
    assert.ok(stops[i][0] <= stops[i + 1][0]);
    assert.ok(stops[i + 1][0] <= stops[i + 2][0]);
  }
  return stops;
}

test("pulse stops remain finite and ordered at negative, wrap and invalid times", () => {
  for (const time of [-0.0025454 / 0.22, -100, -Number.EPSILON, 0,
    (1 - 1e-12) / 0.22, 1 / 0.22, (1 + 1e-12) / 0.22,
    Number.MAX_VALUE, NaN, Infinity, -Infinity]) {
    stopsAt(time, true);
    stopsAt(time, false);
  }
});

test("normal pulse positions and colors are unchanged across repeated cycles", () => {
  for (const dark of [true, false]) {
    const ink = dark ? "255,255,255" : "29,29,31";
    for (let frame = 0; frame < 1800; frame++) {
      const time = frame / 60;
      const expected = [];
      for (let k = 0; k < 3; k++) {
        const f = (time * 0.22 + k / 3) % 1;
        const peak = (dark ? 0.85 : 0.5) * Math.min(1, f * 2.5);
        expected.push([Math.max(0, f - 0.07), `rgba(${ink},0)`],
          [f, `rgba(${ink},${peak})`], [Math.min(1, f + 0.07), `rgba(${ink},0)`]);
      }
      assert.deepEqual(stopsAt(time, dark), expected);
    }
  }
});

test("frame delta rejects backwards or invalid timestamps and retains the time cap", () => {
  for (const elapsed of [-11.57, -1, 0, NaN, Infinity, -Infinity]) {
    assert.equal(frameDelta(elapsed), 0.016);
  }
  assert.equal(frameDelta(16), 0.016);
  assert.equal(frameDelta(8), 0.008);
  assert.equal(frameDelta(1000), 1 / 30);
});
