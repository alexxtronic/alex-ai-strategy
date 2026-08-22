import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const ignored = new Set([".git", "node_modules"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const files = await walk(root);
const htmlFiles = files.filter((file) => extname(file) === ".html");
const failures = [];

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  if (!source.includes("<title>")) failures.push(`${relative(root, file)} has no title`);
  if (!source.includes('name="viewport"')) failures.push(`${relative(root, file)} has no viewport metadata`);
  if (/target="_blank"/.test(source) && !/rel="[^"]*noopener/.test(source)) failures.push(`${relative(root, file)} has an unsafe external target`);

  for (const match of source.matchAll(/(?:href|src)="([^"#?]+)"/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const target = resolve(file, "..", ref);
    let candidates = [target];
    if (ref.endsWith("/")) candidates.push(join(target, "index.html"));
    const exists = files.some((candidate) => candidates.includes(candidate));
    if (!exists) failures.push(`${relative(root, file)} references missing ${ref}`);
  }
}

const contactHtml = await readFile(join(root, "work-with-me/index.html"), "utf8");
if (/id="help-request"[^>]*required/.test(contactHtml)) failures.push("Help request must remain optional");
for (const id of ["full-name", "email", "phone"]) {
  if (!new RegExp(`id="${id}"[^>]*required`).test(contactHtml)) failures.push(`${id} should be required`);
}
for (const id of ["company", "title"]) {
  if (new RegExp(`id="${id}"[^>]*required`).test(contactHtml)) failures.push(`${id} should be optional`);
}

const homeHtml = await readFile(join(root, "index.html"), "utf8");
const calculatorHtml = await readFile(join(root, "ai-roi-calculator/index.html"), "utf8");
const homeCss = await readFile(join(root, "assets/css/styles.css"), "utf8");
for (const id of ["how-i-work", "specialties", "past-projects"]) {
  if (!homeHtml.includes(`id="${id}"`)) failures.push(`Homepage is missing ${id}`);
}
if (!homeHtml.includes("We're your next<br />AI Strategy Partner")) failures.push("Vitrus homepage headline is missing");
if (!homeHtml.includes("vitrus_full_logo_black_transparent.png")) failures.push("Homepage is missing the Vitrus header logo");
if (homeHtml.includes("data-business-rotator") || homeHtml.includes("I help")) failures.push("Legacy rotating industry copy remains");
if (!homeHtml.includes('data-capability-experience')) failures.push("Homepage is missing the 2D capability experience");
if (!homeHtml.includes("capability-mountain")) failures.push("Homepage is missing the Vitrus vector mountain range");
if ((homeHtml.match(/capability-route--progress/g) || []).length !== 1) failures.push("Vector mountain must contain one continuous progress route");
if (!homeHtml.includes('pathLength="100"')) failures.push("Vector mountain progress route must use normalized path geometry");
if (homeHtml.includes("capability-route--segment") || homeHtml.includes("data-capability-segment")) failures.push("Legacy segmented mountain route remains");
if (/<circle[^>]*class="capability/.test(homeHtml)) failures.push("Vector mountain must not contain decorative circle elements");
if (homeHtml.includes("capability-sun") || homeHtml.includes("capability-aurora")) failures.push("Vector mountain contains legacy ambient shapes");
if (homeHtml.includes("data-three-experience") || homeHtml.includes("interactive 3D")) failures.push("Legacy 3D capability language remains");
if (homeCss.includes("backdrop-filter: blur(1.5px)")) failures.push("Investigate lens must not blur discovered words");
if (!homeHtml.includes('data-build-report="typing-v2"')) failures.push("Homepage is missing the resilient Build-card report");
if (homeHtml.includes("A tailored recommendation")) failures.push("Homepage still contains the legacy Build-card recommendation");
const reportMatch = homeHtml.match(/data-typing-report>([\s\S]*?)<\/p>/);
if (!reportMatch || reportMatch[1].trim().split("\n").length !== 3) failures.push("Build-card report must contain exactly three lines");
for (const phrase of ["Content Strategy", "Email Workflow Automation", "Q2 Strategy Report"]) {
  if (!homeHtml.includes(phrase)) failures.push(`Build-card report is missing ${phrase}`);
}
for (const phrase of ["Investigate", "We find where AI makes the biggest impact.", "Email", "Content", "Reporting"]) {
  if (!homeHtml.includes(phrase)) failures.push(`Investigate card is missing ${phrase}`);
}
for (const phrase of ["bespoke system catered to your needs", "as technology evolves so do we"]) {
  if (!homeHtml.includes(phrase)) failures.push(`Process card is missing ${phrase}`);
}
for (const phrase of ["How we work", "Investigate", "Quantify", "Free Intro Call", "AI ROI Calculator", "© <span data-current-year></span> Vitrus"]) {
  if (!homeHtml.includes(phrase)) failures.push(`Vitrus homepage is missing ${phrase}`);
}
if (!homeHtml.includes('href="./ai-roi-calculator/"')) failures.push("Homepage navigation must link to the dedicated AI ROI Calculator page");
if (homeHtml.includes("data-roi-calculator") || homeHtml.includes('id="business-case"')) failures.push("ROI calculator must not remain on the homepage");
for (const phrase of ["Meet the team", "Alexander D'Amore", "Founder &amp; CEO", "André Dimmer", "Director of Integration", "Kristian Hampsted", "Deliverables Lead"]) {
  if (!homeHtml.includes(phrase)) failures.push(`Team section is missing ${phrase}`);
}
if ((homeHtml.match(/class="team-card"/g) || []).length !== 3) failures.push("Team section must contain exactly three team members");
for (const image of ["alexander-damore.jpg", "andre-dimmer.jpg", "kristian-hampsted.jpg"]) {
  if (!homeHtml.includes(`assets/images/team/${image}`)) failures.push(`Team section is missing ${image}`);
}
for (const phrase of ["data-approval-timeline", "data-approval-progress", "Investigate", "Quantify", "Build", "Improve"]) {
  if (!homeHtml.includes(phrase)) failures.push(`How we work timeline is missing ${phrase}`);
}
if ((homeHtml.match(/data-approval-step=/g) || []).length !== 4) failures.push("How we work timeline must contain exactly four steps");
if ((homeHtml.match(/id="how-i-work"/g) || []).length !== 1) failures.push("Homepage must contain exactly one How we work anchor");
if (homeHtml.includes("work-steps") || homeHtml.includes("work-step\"")) failures.push("Legacy How we work cards remain");
for (const phrase of ["AI drafts", "Human review", "<h3>Approve</h3>", "<h3>Publish</h3>", "<h3>Measure</h3>"]) {
  if (homeHtml.includes(phrase)) failures.push(`Legacy approval timeline content remains: ${phrase}`);
}
if (homeHtml.includes("approval-flow") || homeHtml.includes("Human approval included")) failures.push("Legacy approval flow remains");
const siteJs = await readFile(join(root, "assets/js/site.js"), "utf8");
if (siteJs.includes("startApprovalTimeline") || siteJs.includes("approvalTimer") || siteJs.includes("}, 3000)")) failures.push("How we work timeline must be controlled by scroll, not a timer");
if (homeHtml.includes("roi-builder__kicker") || homeHtml.includes("project-type")) failures.push("Small decorative subheading copy remains");
if (!calculatorHtml.includes("AI ROI Calculator | Vitrus")) failures.push("Dedicated ROI calculator page title is missing");
if (!calculatorHtml.includes('href="https://vitrus.org/ai-roi-calculator/"')) failures.push("Dedicated ROI calculator canonical URL is missing");
for (const phrase of ['data-roi-calculator', 'data-roi-use-case="reporting"', 'data-roi-use-case="email"', 'data-roi-use-case="knowledge"', 'data-roi-range="horizon"', 'data-roi-range="hourly"', "data-roi-hours"]) {
  if (!calculatorHtml.includes(phrase)) failures.push(`Dedicated ROI calculator page is missing ${phrase}`);
}
for (const phrase of ["Illustrative ROI model", "Baseline cost"]) {
  if (homeHtml.includes(phrase) || calculatorHtml.includes(phrase)) failures.push(`Legacy static ROI copy remains: ${phrase}`);
}
for (const phrase of ["Work with me", "How I work", "Prioritize"]) {
  if (homeHtml.includes(phrase)) failures.push(`Legacy personal-site language remains: ${phrase}`);
}
const cname = await readFile(join(root, "CNAME"), "utf8");
if (cname.trim() !== "vitrus.org") failures.push("CNAME must point to vitrus.org");
if (files.some((file) => relative(root, file).startsWith("assets/js/three-capability"))) failures.push("Legacy 3D capability assets remain");

const copyExtensions = new Set([".html", ".js", ".jsx", ".md"]);
for (const file of files.filter((candidate) => copyExtensions.has(extname(candidate)))) {
  const source = await readFile(file, "utf8");
  if (source.includes("—")) failures.push(`${relative(root, file)} contains an em dash`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages and ${files.length} project files.`);
