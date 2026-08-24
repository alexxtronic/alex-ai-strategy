import { insights } from "../insights/content";
import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ?? character);
}

export async function GET() {
  const items = insights.map((insight) => `
    <item>
      <title>${escapeXml(insight.title)}</title>
      <link>${siteUrl}/insights/${insight.slug}</link>
      <guid>${siteUrl}/insights/${insight.slug}</guid>
      <pubDate>${new Date(`${insight.publishedAt}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(insight.description)}</description>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>VITRUS Articles</title>
        <link>${siteUrl}/insights</link>
        <description>Practical thinking on enterprise AI strategy and implementation.</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
