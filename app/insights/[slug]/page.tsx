import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { formatInsightDate, getInsight, insights } from "../content";
import { siteUrl } from "../../lib/site";

type InsightPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Article not found | VITRUS", robots: { index: false, follow: false } };

  const title = `${insight.title} | VITRUS`;
  const url = `${siteUrl}/insights/${insight.slug}`;
  return {
    title,
    description: insight.description,
    alternates: { canonical: url },
    openGraph: { title, description: insight.description, type: "article", url, publishedTime: insight.publishedAt, authors: [insight.author], images: [] },
    twitter: { card: "summary", title, description: insight.description, images: [] },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const url = `${siteUrl}/insights/${insight.slug}`;
  const related = insights.filter((item) => item.slug !== insight.slug).slice(0, 2);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.publishedAt,
    dateModified: insight.publishedAt,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: insight.author, url: siteUrl },
    publisher: { "@type": "Organization", name: "VITRUS", url: siteUrl, logo: { "@type": "ImageObject", url: `${siteUrl}/vitrus-mark.png` } },
  };

  return (
    <main>
      <SiteHeader compact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <article className="insight-article">
        <header className="insight-article-header">
          <Link className="insight-back" href="/insights">All articles</Link>
          <div className="insight-article-meta"><span>{insight.category}</span><time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time><span>{insight.readingTime}</span></div>
          <h1>{insight.title}</h1>
          <p>{insight.description}</p>
        </header>
        <div className="insight-article-layout">
          <aside><span>Written by</span><strong>{insight.author}</strong><span>AI strategy and implementation</span></aside>
          <div className="insight-body">
            <p className="insight-opening">{insight.opening}</p>
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </section>
            ))}
            <p className="insight-closing">{insight.closing}</p>
          </div>
        </div>
      </article>
      <section className="related-insights">
        <h2>Continue reading.</h2>
        <div>{related.map((item) => <article key={item.slug}><span>{item.category}</span><h3><Link href={`/insights/${item.slug}`}>{item.title}</Link></h3><Link href={`/insights/${item.slug}`}>Read article</Link></article>)}</div>
      </section>
      <section className="insight-cta"><h2>Have an AI opportunity worth examining?</h2><Link className="button button-gold" href="/contact"><span>Let’s Chat</span></Link></section>
      <SiteFooter />
    </main>
  );
}
