import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { formatInsightDate, insights } from "./content";
import { siteUrl } from "../lib/site";

const title = "Insights on enterprise AI strategy and implementation | VITRUS";
const description = "Practical thinking on AI opportunity selection, business cases, system design, and enterprise implementation from VITRUS.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/insights`, types: { "application/rss+xml": `${siteUrl}/feed.xml` } },
  openGraph: { title, description, type: "website", url: `${siteUrl}/insights` },
  twitter: { card: "summary_large_image", title, description },
};

export default function InsightsPage() {
  const [featured, ...moreInsights] = insights;

  return (
    <main>
      <SiteHeader compact />
      <section className="insights-hero">
        <div className="insights-orbit" aria-hidden="true"><i /><i /><i /></div>
        <h1>Ideas for making AI operational.</h1>
        <p>Practical thinking on where AI creates value, how to prove the case, and what it takes to build systems companies can trust.</p>
      </section>
      <section className="insights-index" aria-label="VITRUS insights">
        <article className="insight-featured">
          <div className="insight-card-meta"><span>{featured.category}</span><time dateTime={featured.publishedAt}>{formatInsightDate(featured.publishedAt)}</time><span>{featured.readingTime}</span></div>
          <h2><Link href={`/insights/${featured.slug}`}>{featured.title}</Link></h2>
          <p>{featured.description}</p>
          <Link className="insight-read-link" href={`/insights/${featured.slug}`}>Read the insight</Link>
        </article>
        <div className="insights-grid">
          {moreInsights.map((insight) => (
            <article className="insight-card" key={insight.slug}>
              <div className="insight-card-meta"><span>{insight.category}</span><time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time></div>
              <h2><Link href={`/insights/${insight.slug}`}>{insight.title}</Link></h2>
              <p>{insight.description}</p>
              <div className="insight-card-foot"><span>{insight.readingTime}</span><Link href={`/insights/${insight.slug}`}>Read</Link></div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
