import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AnimatedStatistics, HeroCloud, HeroTitle, ProcessSystem, Reveal, ServicesGrid } from "./components/ExperienceMotion";
import { CaseStudyDiagram } from "./components/CaseStudyDiagram";
import { siteUrl } from "./lib/site";

const clients = [
  { name: "Empire State Building", slug: "empire-state", image: "/clients/empire-state-realty-trust.png" },
  { name: "Humana", slug: "humana", image: "/clients/humana.png" },
  { name: "Global Citizen", slug: "global-citizen", image: "/clients/global-citizen.png" },
  { name: "DFIN", slug: "dfin", image: "/clients/dfin.png" },
  { name: "Scaleup Finance", slug: "scaleup-finance", image: "/clients/scaleup-finance.webp" },
];

const team = [
  { name: "Alexander D'Amore", role: "Founder & CEO", image: "/alexander-damore.jpg", portraitClass: "portrait-image-crop-corners", focus: "Leads AI strategy, business-case development, solution design, and delivery." },
  { name: "Thomas Heiberg", role: "Co-Founder & CTO", image: "/thomas-heiberg.jpg", focus: "Shapes the technical architecture, security, and systems behind every implementation." },
  { name: "Michael Guldborg", role: "Tech Lead", image: "/michael-guldborg.jpg", focus: "Leads the build, integration, and reliable delivery of each working AI system." },
];

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VITRUS",
    url: siteUrl,
    logo: `${siteUrl}/vitrus-logo-black.png`,
    description: "VITRUS builds governed AI systems for established mission-driven organizations.",
  };

  return (
    <main data-page-type="home">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <HeroCloud />
        <div className="hero-copy">
          <HeroTitle />
          <Reveal className="hero-lede-wrap" delay={0.3}>
            <p className="hero-lede">We build governed AI systems that return capacity to established nonprofits, NGOs, foundations, and associations.</p>
          </Reveal>
          <div className="hero-actions"><a className="button button-dark" href="/contact" data-analytics-event="cta_click" data-analytics-cta-id="hero_intro" data-analytics-placement="hero"><span>Request a free intro call</span></a></div>
        </div>
      </section>

      <section className="client-strip" aria-label="Selected past clients">
        <div className="client-track">
          {Array.from({ length: 4 }, () => clients).flat().map((client, index) => (
            <div className={`client-logo client-logo-${client.slug}`} aria-hidden={index >= clients.length} key={`${client.name}-${index}`}>
              {client.image ? (
                <Image src={client.image} alt={index < clients.length ? client.name : ""} fill sizes="190px" />
              ) : (
                <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", fontFamily: "var(--font-sans), Arial, sans-serif", fontSize: client.slug === "dfin" ? "28px" : "17px", letterSpacing: client.slug === "dfin" ? ".08em" : ".02em", lineHeight: 1.1 }}>
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="process-section section-light" id="process">
        <div className="section-intro process-intro"><Reveal><h2>From friction to working system.</h2></Reveal><Reveal delay={0.1}><p>We find the right problem, quantify the value, build one governed system, and improve it with your team.</p></Reveal></div>
        <ProcessSystem />
      </section>

      <section className="services-section section-light" id="services" aria-label="VITRUS solutions">
        <div className="section-intro services-intro"><Reveal><h2>Where AI can return capacity.</h2></Reveal><Reveal delay={0.1}><p>Focused systems for the recurring work behind fundraising, reporting, knowledge, and operations.</p></Reveal></div>
        <ServicesGrid />
      </section>

      <section className="case-section section-light" id="work">
        <div className="case-editorial-intro">
          <Reveal><h2>Our work speaks for itself.</h2></Reveal>
        </div>
        <div className="case-grid">
          <Reveal>
            <article className="case-card" data-analytics-view="case_study_engaged" data-analytics-content-id="global_citizen_listening">
              <CaseStudyDiagram variant="listening" />
              <p className="case-client-name">Global Citizen</p>
              <h3>A clearer view of<br />the conversation.</h3>
              <p className="case-summary">We connected Global Citizen’s listening sources through MCP integrations to create one live sentiment dashboard. AI brings emerging themes and shifts in conversation into focus, with the source evidence close at hand. The result is a shared view of what matters, ready for the team to review and act on.</p>
              <Link className="case-approach-link" href="/solutions/listening-decision-dashboards/" data-analytics-event="solution_select" data-analytics-solution-slug="listening-decision-dashboards" data-analytics-placement="case_study">Explore the approach <span aria-hidden="true">&#8594;</span></Link>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="case-card case-card-offset" data-analytics-view="case_study_engaged" data-analytics-content-id="grant_drafting_workflow">
              <CaseStudyDiagram variant="grants" />
              <p className="case-client-name">DFIN</p>
              <h3>Stronger proposals.<br />Less preparation.</h3>
              <p className="case-summary">We built a proposal workflow for DFIN that brings requirements, approved evidence, and past applications into one place. AI assembles that material into a structured, review-ready draft, with approval kept in the team’s hands. It gives specialists a reusable starting point for each application and more room to focus on the case they want to make.</p>
              <Link className="case-approach-link" href="/solutions/grant-reporting-automation/" data-analytics-event="solution_select" data-analytics-solution-slug="grant-reporting-automation" data-analytics-placement="case_study">Explore the approach <span aria-hidden="true">&#8594;</span></Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="statistics-section section-dark" id="proof">
        <div className="statistics-intro"><Reveal><h2>More capacity.<br />More impact.</h2></Reveal><Reveal delay={0.1}><p>Non-Profits and NGOs can truly benefit from emerging tech</p></Reveal></div>
        <AnimatedStatistics />
      </section>

      <section className="team-section section-light" id="team">
        <div className="section-intro compact-intro"><Reveal><h2>Senior people, start to finish.</h2></Reveal><Reveal delay={0.1}><p>The specialists who shape the strategy stay close through build, adoption, and improvement.</p></Reveal></div>
        <div className="team-grid">{team.map((person, index) => <Reveal key={person.name} delay={index * 0.08}><article className="team-card"><div className="portrait-wrap"><Image className={"portraitClass" in person ? person.portraitClass : undefined} src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div className="team-card-copy"><h3>{person.name}</h3><p className="team-role">{person.role}</p><p className="team-focus">{person.focus}</p></div></article></Reveal>)}</div>
      </section>

      <section className="final-cta section-dark"><Reveal><h2>Start with the right problem.</h2></Reveal><Reveal delay={0.12}><div><p>Give us 30 minutes. We will identify where AI could return the most capacity, and whether there is a responsible case to build.</p><a className="button button-gold" href="/contact" data-analytics-event="cta_click" data-analytics-cta-id="footer_intro" data-analytics-placement="final_cta"><span>Request a free intro call</span></a></div></Reveal></section>
      <SiteFooter />
    </main>
  );
}
