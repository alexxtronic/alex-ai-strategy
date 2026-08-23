import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the VITRUS strategy proposition", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>VITRUS — Your next AI Strategy Partner<\/title>/i);
  assert.match(html, /We’re your next/);
  assert.match(html, /AI Strategy Partner/);
  assert.match(html, /We find where AI can make or save the most money/);
  assert.match(html, /Less AI theatre/);
  assert.match(html, /Custom AI integrations for your specific needs/);
  assert.match(html, /We know your business/);
  assert.doesNotMatch(html, /One connected client journey/i);
  assert.doesNotMatch(html, /↗/);
  assert.doesNotMatch(html, /<em\b/i);
});

test("keeps the experience light, roman, and motion-aware", async () => {
  const [css, motion, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ExperienceMotion.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(css, /body \* \{ font-weight: 300; \}/);
  assert.match(css, /em, i \{ font-style: normal; \}/);
  assert.doesNotMatch(css, /font-weight:\s*[5-9]00/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(motion, /from "motion\/react"/);
  assert.match(motion, /useReducedMotion/);
  assert.match(motion, /export function HeroOrb/);
  assert.match(motion, /export function ValueSequence/);
  assert.match(motion, /export function IntegrationTimeline/);
  assert.match(motion, /useScroll/);
  assert.match(packageJson, /"motion":/);
  assert.match(layout, /og-v2\.png/);
});
