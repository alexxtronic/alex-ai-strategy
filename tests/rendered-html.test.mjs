import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const relativePath = pathname === "/"
    ? "../out/index.html"
    : isFile
      ? `../out${pathname}`
      : `../out${pathname}/index.html`;
  const body = await readFile(new URL(relativePath, import.meta.url));
  const contentType = pathname.endsWith(".xml")
    ? pathname === "/feed.xml" ? "application/rss+xml; charset=utf-8" : "application/xml; charset=utf-8"
    : pathname.endsWith(".txt")
      ? "text/plain; charset=utf-8"
      : "text/html; charset=utf-8";

  return new Response(body, { status: 200, headers: { "content-type": contentType } });
}

test("server-renders the VITRUS mission-driven proposition", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>VITRUS \| AI Systems for Missions That Matter<\/title>/i);
  assert.match(html, /AI systems for/);
  assert.match(html, /missions that matter/);
  assert.match(html, /high-friction work into governed AI systems/);
  assert.match(html, /From friction to working system/);
  assert.match(html, /Where AI can return capacity/);
  assert.match(html, /Funder and partner intelligence/);
  assert.match(html, /Grant and reporting automation/);
  assert.match(html, /Live listening and decision dashboards/);
  assert.match(html, /Secure knowledge systems/);
  assert.match(html, /Workflow and CRM integration/);
  assert.match(html, /href="\/#services"/);
  assert.match(html, /href="\/#team"/);
  assert.match(html, /More capacity/);
  assert.match(html, /More impact/);
  assert.match(html, /Proof, not prototypes/);
  assert.match(html, /Live social intelligence for Global Citizen/);
  assert.match(html, /social listening sources through MCP integrations/);
  assert.match(html, /Grant drafting, grounded in evidence/);
  assert.match(html, /human review before submission/);
  assert.doesNotMatch(html, /The proof is in the prompt/);
  assert.doesNotMatch(html, /3,449/);
  assert.doesNotMatch(html, /Custom GEO \/ AEO solution for a property platform/);
  assert.match(html, /Selected past clients/);
  assert.match(html, /Empire State Building/);
  assert.match(html, /Humana/);
  assert.match(html, /Global Citizen/);
  assert.match(html, /DFIN/);
  assert.match(html, /\/clients\/dfin\.png/);
  assert.match(html, /Scaleup Finance/);
  assert.match(html, /\/clients\/scaleup-finance\.webp/);
  assert.match(html, /STATE Grill (?:&amp;|&) Bar/);
  assert.doesNotMatch(html, /Specsavers/);
  assert.doesNotMatch(html, /LEMAN/);
  assert.doesNotMatch(html, /Candy King/);
  assert.match(html, /Senior people, start to finish/);
  assert.match(html, /portrait-image-crop-corners/);
  assert.match(html, /specialists who shape the strategy stay close/);
  assert.match(html, /André Rosario/);
  assert.match(html, /Kristian Hansen/);
  assert.match(html, /business-case development/);
  assert.match(html, /enterprise operating systems/);
  assert.match(html, /leadership alignment/);
  assert.match(html, /Book a free intro call/);
  assert.match(html, /href="\/insights"/);
  assert.match(html, />Articles</);
  assert.doesNotMatch(html, />Insights</);
  assert.match(html, /aria-controls="mobile-menu"/);
  assert.match(html, /Mobile navigation/);
  assert.match(html, /ROI calculator/);
  assert.doesNotMatch(html, /Find it/);
  assert.doesNotMatch(html, /One connected client journey/i);
  assert.doesNotMatch(html, /↗/);
  assert.doesNotMatch(html, /<em\b/i);

  const sectionLinks = [...html.matchAll(/href="\/#([a-z0-9-]+)"/gi)].map((match) => match[1]);
  for (const section of sectionLinks) {
    assert.match(html, new RegExp(`id="${section}"`), `Navigation target #${section} is missing`);
  }
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
  assert.match(motion, /hero-ambient-glow/);
  assert.match(motion, /hero-organic-form-upper/);
  assert.match(motion, /hero-organic-form-lower/);
  assert.match(motion, /hero-organic-contour/);
  assert.match(motion, /hero-organic-echo/);
  assert.doesNotMatch(css, /\.hero::before/);
  assert.doesNotMatch(motion, /corner-signal-sweep/);
  assert.doesNotMatch(motion, /glass-lens/);
  assert.doesNotMatch(motion, /future-orbit/);
  assert.match(motion, /export function ProcessSystem/);
  assert.match(motion, /export function ServicesGrid/);
  assert.match(motion, /service-visual-visibility/);
  assert.match(motion, /service-visual-agents/);
  assert.match(motion, /service-visual-dashboard/);
  assert.match(motion, /service-visual-local/);
  assert.match(motion, /service-visual-crm/);
  assert.match(motion, /}, 2000\);/);
  assert.doesNotMatch(motion, /opacity: active \? 1 : \.38/);
  assert.match(motion, /export function AnimatedStatistics/);
  assert.match(motion, /CountUp value=\{81\}/);
  assert.match(motion, /CountUp value=\{88\}/);
  assert.match(motion, /CountUp value=\{47\}/);
  assert.match(motion, /Global Citizen social intelligence/);
  assert.match(motion, /Grant application workspace/);
  assert.match(motion, /Live sentiment view/);
  assert.match(motion, /SentimentLoop/);
  assert.match(motion, /channel-sparkline/);
  assert.doesNotMatch(motion, /3449/);
  assert.doesNotMatch(motion, /dashboard-scan/);
  assert.match(motion, /requestAnimationFrame/);
  assert.match(packageJson, /"motion":/);
  assert.match(layout, /og-v2\.png/);
});

test("uses native header links so every navigation item works without the client router", async () => {
  const header = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(header, /from ["']next\/link["']/);
  assert.match(header, /<a href=\{item\.href\}/);
  assert.match(header, /href: "\/ai-roi-calculator"/);
  assert.match(header, /href: "\/#process"/);
  assert.match(header, /href: "\/#services"/);
  assert.match(header, /href: "\/#work"/);
});

test("server-renders the focused 30 minute contact page", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Show us where/);
  assert.match(html, /the work gets stuck/);
  assert.match(html, /Book a free 30 minute call to find where responsible AI could return the most capacity to your team\./);
  assert.match(html, /Book intro call/);
  assert.doesNotMatch(html, /What happens next/);
});

test("server-renders the four-input AI savings calculator", async () => {
  const response = await render("/ai-roi-calculator");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /What is repetitive work costing your mission/);
  assert.match(html, /AI could return/);
  assert.match(html, /€51,840/);
  assert.match(html, /18 hrs \/ week/);
  assert.match(html, /864 hrs \/ year/);
  assert.match(html, /€86,400 \/ year/);
  assert.match(html, /How is this calculated/);
  assert.match(html, /not guaranteed payroll reduction/);
  assert.match(html, /Find the workflow behind the number/);
  assert.doesNotMatch(html, /Illustrative first-year net value/);
  assert.doesNotMatch(html, /Potential capacity/);
  assert.doesNotMatch(html, /Pressure-test the case/);
});

test("renders a crawlable Articles index and article pages", async () => {
  const indexResponse = await render("/insights");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /Clear thinking on applied AI/);
  assert.match(indexHtml, /build systems teams can trust/);
  assert.match(indexHtml, /Read the article/);
  assert.match(indexHtml, /Clear thinking on applied AI/);
  assert.match(indexHtml, /where-enterprise-ai-value-actually-lives/);
  assert.match(indexHtml, /ai-business-case-finance-can-trust/);
  assert.match(indexHtml, /from-ai-pilot-to-operating-system/);
  assert.match(indexHtml, /application\/rss\+xml/);

  const articles = [
    ["/insights/where-enterprise-ai-value-actually-lives", "The AI opportunity is rarely where the demo is"],
    ["/insights/ai-business-case-finance-can-trust", "How to build an AI business case that finance can trust"],
    ["/insights/from-ai-pilot-to-operating-system", "From AI pilot to operating system"],
  ];

  for (const [pathname, title] of articles) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /BlogPosting/);
    assert.match(html, /rel="canonical"/);
    assert.doesNotMatch(html, /og-v2\.png/);
  }
});

test("publishes discovery files for search and subscribers", async () => {
  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<urlset/);
  assert.match(sitemap, /\/insights\/ai-business-case-finance-can-trust/);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap:/);

  const feedResponse = await render("/feed.xml");
  assert.equal(feedResponse.status, 200);
  assert.match(feedResponse.headers.get("content-type") ?? "", /application\/rss\+xml/);
  assert.match(await feedResponse.text(), /<rss version="2.0">/);
});

test("keeps em dashes out of every rendered route", async () => {
  const forbiddenPunctuation = new RegExp(String.fromCodePoint(0x2014));
  for (const pathname of ["/", "/contact", "/privacy", "/ai-roi-calculator", "/insights", "/insights/where-enterprise-ai-value-actually-lives", "/insights/ai-business-case-finance-can-trust", "/insights/from-ai-pilot-to-operating-system"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.doesNotMatch(await response.text(), forbiddenPunctuation, `${pathname} contains an em dash`);
  }
});
