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
  assert.match(html, /<title>VITRUS \| Your next AI Strategy Partner<\/title>/i);
  assert.match(html, /We’re your next/);
  assert.match(html, /AI Strategy Partner/);
  assert.match(html, /We find where AI can make or save the most money/);
  assert.match(html, /AI solutions as unique as your company/);
  assert.match(html, /The opportunity is real/);
  assert.match(html, /Boligsiden/);
  assert.match(html, /3,449/);
  assert.match(html, /A team you can trust/);
  assert.match(html, /André Rosario/);
  assert.match(html, /Kristian Hansen/);
  assert.match(html, /Let’s Chat/);
  assert.doesNotMatch(html, /Find it/);
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
  assert.match(motion, /export function HeroCloud/);
  assert.match(motion, /export function ProcessSystem/);
  assert.match(motion, /export function AnimatedStatistics/);
  assert.match(motion, /CountUp value=\{81\}/);
  assert.match(motion, /CountUp value=\{88\}/);
  assert.match(motion, /CountUp value=\{47\}/);
  assert.match(motion, /Sample reporting view/);
  assert.match(motion, /Facebook/);
  assert.match(motion, /Instagram/);
  assert.match(motion, /Blogs/);
  assert.match(motion, /requestAnimationFrame/);
  assert.match(packageJson, /"motion":/);
  assert.match(layout, /og-v2\.png/);
});

test("server-renders the focused 30 minute contact page", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /We’re yours for/);
  assert.match(html, /30 minutes/);
  assert.match(html, /Request a free 30 minute AI readiness call with one of our experts today\./);
  assert.match(html, /Request 30 minutes/);
  assert.doesNotMatch(html, /What happens next/);
});

test("keeps em dashes out of every rendered route", async () => {
  const forbiddenPunctuation = new RegExp(String.fromCodePoint(0x2014));
  for (const pathname of ["/", "/contact", "/privacy", "/ai-roi-calculator"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.doesNotMatch(await response.text(), forbiddenPunctuation, `${pathname} contains an em dash`);
  }
});
