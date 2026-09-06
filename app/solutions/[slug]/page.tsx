import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { SolutionVisual } from "../../components/SolutionVisual";
import { siteUrl } from "../../lib/site";
import { getSolution, solutions } from "../content";

type SolutionPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: "Solution not found | VITRUS", robots: { index: false, follow: false } };

  const title = `${solution.shortTitle} | VITRUS`;
  const url = `${siteUrl}/solutions/${solution.slug}/`;
  const image = `${siteUrl}/og-v2.png`;
  return {
    title,
    description: solution.description,
    alternates: { canonical: url },
    openGraph: { title, description: solution.description, type: "website", url, images: [{ url: image, width: 1731, height: 909, alt: "VITRUS. Responsible AI for mission-driven organizations." }] },
    twitter: { card: "summary_large_image", title, description: solution.description, images: [image] },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const url = `${siteUrl}/solutions/${solution.slug}/`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.shortTitle,
    description: solution.description,
    url,
    provider: { "@type": "Organization", name: "VITRUS", url: siteUrl },
    audience: { "@type": "Audience", audienceType: "Established nonprofits, NGOs, foundations, associations, and purpose-led organizations" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "VITRUS", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteUrl}/#services` },
      { "@type": "ListItem", position: 3, name: solution.shortTitle, item: url },
    ],
  };

  return (
    <main data-page-type="solution" data-solution-slug={solution.slug}>
      <SiteHeader compact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]).replace(/</g, "\\u003c") }} />

      <header className="solution-hero">
        <Link className="solution-back" href="/#services">All solutions</Link>
        <h1>{solution.hero}</h1>
        <p>{solution.description}</p>
        <Link className="button button-dark" href={`/contact?solution=${solution.slug}`} data-analytics-event="cta_click" data-analytics-cta-id="solution_hero_intro" data-analytics-placement="solution_hero"><span>Request a free intro call</span></Link>
      </header>

      <article className="solution-article">
        <section className="solution-opening" data-analytics-section="solution_problem">
          <span>01</span>
          <div>
            <h2>{solution.problemTitle}</h2>
            {solution.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <SolutionVisual variant={solution.visual} />

        <section className="solution-build" data-analytics-section="solution_build">
          <div className="solution-build-copy">
            <span>02</span>
            <h2>{solution.buildTitle}</h2>
            <p>{solution.buildIntro}</p>
          </div>
          <ul>{solution.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
        </section>

        <section className="solution-connections" data-analytics-section="solution_connections">
          <div>
            <span>03</span>
            <h2>{solution.connectionsTitle}</h2>
            {solution.connections.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="solution-tool-map" aria-label="Systems that may connect in this solution">
            {solution.tools.map((tool, index) => <span key={tool}><i>{String(index + 1).padStart(2, "0")}</i>{tool}</span>)}
          </div>
        </section>

        <section className="solution-controls section-dark" data-analytics-section="solution_controls">
          <div>
            <span>04</span>
            <h2>{solution.controlsTitle}</h2>
            <p>{solution.controlsIntro}</p>
          </div>
          <ul>{solution.controls.map((control) => <li key={control}>{control}</li>)}</ul>
        </section>

        <section className="solution-workflow" data-analytics-section="solution_workflow">
          <div className="solution-workflow-intro">
            <span>05</span>
            <h2>A practical first workflow.</h2>
          </div>
          <ol>{solution.workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
        </section>

        <section className="solution-value" data-analytics-section="solution_value">
          <span>Operating value</span>
          <h2>{solution.value}</h2>
        </section>

        {solution.proof && (
          <section className="solution-proof" data-analytics-view="case_study_engaged" data-analytics-content-id={solution.slug}>
            <span>{solution.proof.client}</span>
            <h2>{solution.proof.title}</h2>
            <p>{solution.proof.text}</p>
          </section>
        )}
      </article>

      <section className="solution-cta section-dark">
        <h2>{solution.ctaTitle}</h2>
        <div><p>{solution.ctaText}</p><Link className="button button-gold" href={`/contact?solution=${solution.slug}`} data-analytics-event="cta_click" data-analytics-cta-id="solution_footer_intro" data-analytics-placement="solution_footer"><span>Request a free intro call</span></Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
