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
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(html, /<title>VITRUS \| AI Systems for Missions That Matter<\/title>/i);
  assert.match(html, /AI systems for/);
  assert.match(html, /missions that matter/);
  assert.match(html, /governed AI systems that return capacity to established nonprofits, NGOs, foundations, and associations/);
  assert.match(html, /From friction to working system/);
  assert.match(html, /Where AI can return capacity/);
  assert.match(html, /Fundraising and partner intelligence/);
  assert.match(html, /Grant and reporting automation/);
  assert.match(html, /Live listening and decision dashboards/);
  assert.match(html, /Secure organizational knowledge/);
  assert.doesNotMatch(html, /Workflow and CRM integration/);
  assert.match(html, /href="\/solutions\/grant-reporting-automation"/);
  assert.match(html, /href="\/solutions\/funder-partner-intelligence"/);
  assert.match(html, /href="\/solutions\/listening-decision-dashboards"/);
  assert.match(html, /href="\/solutions\/secure-knowledge-systems"/);
  assert.match(html, /More capacity/);
  assert.match(html, /More impact/);
  assert.match(html, /Our work speaks for itself/);
  assert.match(html, /A clearer view of/);
  assert.match(html, /listening sources through MCP integrations/);
  assert.match(html, /Stronger proposals/);
  assert.match(html, /review-ready draft/);
  assert.match(html, />Quantify</);
  assert.doesNotMatch(html, /The proof is in the prompt/);
  assert.doesNotMatch(html, /3,449/);
  assert.doesNotMatch(html, /Custom GEO \/ AEO solution for a property platform/);
  assert.match(html, /Selected past clients/);
  assert.match(page, /Array\.from\(\{ length: 4 \}, \(\) => clients\)\.flat\(\)/);
  assert.match(html, /Empire State Building/);
  assert.match(html, /Humana/);
  assert.match(html, /Global Citizen/);
  assert.match(html, /DFIN/);
  assert.match(html, /\/clients\/dfin\.png/);
  assert.match(html, /Scaleup Finance/);
  assert.match(html, /\/clients\/scaleup-finance\.webp/);
  assert.doesNotMatch(html, /STATE Grill (?:&amp;|&) Bar/);
  assert.doesNotMatch(html, /Specsavers/);
  assert.doesNotMatch(html, /LEMAN/);
  assert.doesNotMatch(html, /Candy King/);
  assert.match(html, /Senior people, start to finish/);
  assert.match(html, /portrait-image-crop-corners/);
  assert.match(html, /specialists who shape the strategy stay close/);
  assert.match(html, /Thomas Heiberg/);
  assert.match(html, /Michael Guldborg/);
  assert.match(html, /Co-Founder (?:&amp;|&) CTO/);
  assert.match(html, /Tech Lead/);
  assert.match(html, /\/thomas-heiberg\.jpg/);
  assert.match(html, /\/michael-guldborg\.jpg/);
  assert.doesNotMatch(html, /André Dimmer/);
  assert.doesNotMatch(html, /Kristina Hampsted/);
  assert.doesNotMatch(html, /Thomas Bjarke/);
  assert.match(html, /business-case development/);
  assert.match(html, /technical architecture, security/);
  assert.match(html, /reliable delivery of each working AI system/);
  assert.match(html, /Request a free intro call/);
  assert.match(html, /href="\/insights"/);
  assert.match(html, />Articles</);
  assert.doesNotMatch(html, />Insights</);
  assert.match(html, /aria-controls="mobile-menu"/);
  assert.match(html, /Mobile navigation/);
  assert.match(html, /ROI calculator/);
  assert.match(html, /aria-controls="solutions-menu"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /data-analytics-event="cta_click"/);
  assert.match(html, /data-analytics-view="case_study_engaged"/);
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
  assert.match(css, /\.hero-actions \{ align-items: center; flex-direction: column; \}/);
  assert.match(css, /\.client-logo-empire-state img \{ padding: 0; transform: scale\(1\.24\); \}/);
  assert.match(css, /\.client-logo-humana img \{ padding: 0; transform: scale\(1\.12\); \}/);
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
  assert.doesNotMatch(motion, /title: "Workflow and CRM integration"/);
  assert.match(motion, /}, 2000\);/);
  assert.doesNotMatch(motion, /opacity: active \? 1 : \.38/);
  assert.match(motion, /export function AnimatedStatistics/);
  assert.match(motion, /CountUp value=\{68\}/);
  assert.match(motion, /CountUp value=\{48\}/);
  assert.match(motion, /CountUp value=\{11\}/);
  assert.match(motion, /Google for Nonprofits 2025/);
  assert.match(motion, /European Nonprofit Pulse 2025/);
  assert.match(motion, /Center for Effective Philanthropy 2025/);
  assert.match(motion, /Global Citizen social intelligence/);
  assert.match(motion, /Grant application workspace/);
  assert.match(motion, /Sources linked/);
  assert.match(motion, /status: "Reviewed"/);
  assert.doesNotMatch(motion, /Connected view/);
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
  assert.match(header, /href: "\/#work"/);
  assert.match(header, /aria-expanded=\{solutionsOpen\}/);
  assert.match(header, /aria-controls="solutions-menu"/);
  assert.match(header, /solutionLinks\.map/);
  assert.doesNotMatch(header, /label: "Team"/);
});

test("server-renders the focused 30 minute contact page", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Show us where/);
  assert.match(html, /the work gets stuck/);
  assert.match(html, /Request a free 30 minute call to find where responsible AI could return the most capacity to your team\./);
  assert.match(html, /Request a free intro call/);
  assert.match(html, /Phone/);
  assert.match(html, /Phone <b[^>]*>\*/);
  assert.doesNotMatch(html, /Optional/);
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
    ["/insights/ai-business-case-finance-can-trust", "How to build an AI business case leaders can trust"],
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
    assert.match(html, /og-v2\.png/);
  }
});

test("renders four focused solution articles with metadata, systems, and controls", async () => {
  const solutionRoutes = [
    ["/solutions/grant-reporting-automation", "Grant and reporting automation, grounded in your evidence"],
    ["/solutions/funder-partner-intelligence", "Know who to approach, why now, and what matters to them"],
    ["/solutions/listening-decision-dashboards", "Turn a noisy public conversation into a usable signal"],
    ["/solutions/secure-knowledge-systems", "Make trusted knowledge easier to find and safer to use"],
  ];

  for (const [pathname, headline] of solutionRoutes) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(headline));
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /schema\.org/);
    assert.match(html, /Service/);
    assert.match(html, /BreadcrumbList/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /VITRUS SYSTEM/);
    assert.match(html, /AI/);
    assert.match(html, /CRM/);
    assert.match(html, /MARTECH/);
    assert.match(html, /Human approval|Human review|Human escalation/i);
    assert.match(html, /Request a free intro call/);
    assert.match(html, /og-v2\.png/);
  }
});

test("publishes discovery files for search and subscribers", async () => {
  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<urlset/);
  assert.match(sitemap, /\/insights\/ai-business-case-finance-can-trust/);
  assert.match(sitemap, /\/solutions\/grant-reporting-automation/);
  assert.match(sitemap, /\/solutions\/funder-partner-intelligence/);
  assert.match(sitemap, /\/solutions\/listening-decision-dashboards/);
  assert.match(sitemap, /\/solutions\/secure-knowledge-systems/);
  assert.match(sitemap, /\/solutions\/secure-knowledge-systems\//);

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
  for (const pathname of ["/", "/contact", "/privacy", "/ai-roi-calculator", "/insights", "/insights/where-enterprise-ai-value-actually-lives", "/insights/ai-business-case-finance-can-trust", "/insights/from-ai-pilot-to-operating-system", "/solutions/grant-reporting-automation", "/solutions/funder-partner-intelligence", "/solutions/listening-decision-dashboards", "/solutions/secure-knowledge-systems"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.doesNotMatch(await response.text(), forbiddenPunctuation, `${pathname} contains an em dash`);
  }
});

test("instruments a privacy-conscious conversion funnel without form PII", async () => {
  const [analytics, provider, form, calculator, layout] = await Promise.all([
    readFile(new URL("../app/lib/analytics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AnalyticsProvider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact/ContactForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ai-roi-calculator/RoiCalculator.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /AnalyticsProvider/);
  assert.match(provider, /campaign_landing/);
  assert.match(provider, /case_study_engaged/);
  assert.match(provider, /solution_page_complete/);
  assert.match(form, /contact_form_start/);
  assert.match(form, /contact_form_submit/);
  assert.match(form, /contact_form_response_loaded/);
  assert.match(form, /Interested in:/);
  assert.match(calculator, /calculatorBands/);
  assert.match(calculator, /roi_calculator_update/);
  assert.match(calculator, /IntersectionObserver/);
  assert.match(analytics, /allowedPropertyKeys/);
  assert.match(provider, /usePathname/);
  assert.match(provider, /isApprovedCampaignValue/);
  assert.doesNotMatch(provider, /link\.href\s*=/);
  assert.doesNotMatch(provider, /NEXT_PUBLIC_GA_MEASUREMENT_ID|googletagmanager|gtag/);
  assert.doesNotMatch(analytics, /gtag|generate_lead/);
  assert.doesNotMatch(analytics, /\| "name"|\| "email"|\| "phone"|\| "company"|\| "message"/);
  assert.doesNotMatch(form, /trackEvent\([^\n]+entry\./);
});
