import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { formatInsightDate, insights } from "./content";
import { siteUrl } from "../lib/site";

const title = "Clear thinking on applied AI | VITRUS";
const description = "How to find the right AI opportunity, prove the case, govern the work, and build systems teams can trust.";

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
        <h1>Clear thinking on applied AI.</h1>
        <p>How to find the right opportunity, prove the case, govern the work, and build systems teams can trust.</p>
      </section>
      <section className="insights-index" aria-label="VITRUS articles">
        <article className="insight-featured">
          <div className="insight-card-meta"><span>{featured.category}</span><time dateTime={featured.publishedAt}>{formatInsightDate(featured.publishedAt)}</time><span>{featured.readingTime}</span></div>
          <h2><Link href={`/insights/${featured.slug}`}>{featured.title}</Link></h2>
          <p>{featured.description}</p>
          <Link className="insight-read-link" href={`/insights/${featured.slug}`}>Read the article</Link>
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
