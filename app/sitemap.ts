import type { MetadataRoute } from "next";
import { insights } from "./insights/content";
import { siteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes = ["", "/insights", "/ai-roi-calculator", "/contact", "/privacy"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-08-24T00:00:00Z"),
    changeFrequency: path === "/insights" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/insights" ? .8 : .6,
  }));

  const insightRoutes = insights.map((insight) => ({
    url: `${siteUrl}/insights/${insight.slug}`,
    lastModified: new Date(`${insight.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: .7,
  }));

  return [...coreRoutes, ...insightRoutes];
}
