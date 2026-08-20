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
const homeCss = await readFile(join(root, "assets/css/styles.css"), "utf8");
const capabilitySource = await readFile(join(root, "assets/js/three-capability.jsx"), "utf8");
for (const id of ["how-i-work", "specialties", "past-projects"]) {
  if (!homeHtml.includes(`id="${id}"`)) failures.push(`Homepage is missing ${id}`);
}
if (!homeHtml.includes("Hi, I'm Alex,")) failures.push("Homepage headline is missing");
if (!homeHtml.includes('data-three-experience')) failures.push("Homepage is missing the 3D capability experience");
if (!homeHtml.includes("fallback-drawer--four")) failures.push("Homepage is missing the drawer-cabinet fallback");
if (!capabilitySource.includes("function CapabilityCabinet")) failures.push("3D drawer-cabinet experience is missing");
if (capabilitySource.includes("sphereGeometry") || capabilitySource.includes("CentralIntelligence")) failures.push("Legacy planet geometry remains in the capability experience");
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
if (!files.some((file) => relative(root, file) === "assets/js/three-capability.bundle.js")) failures.push("3D capability bundle is missing");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages and ${files.length} project files.`);
