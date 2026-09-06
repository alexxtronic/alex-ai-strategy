import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AnimatedStatistics, CaseStudyVisual, HeroCloud, HeroTitle, ProcessSystem, Reveal, ServicesGrid } from "./components/ExperienceMotion";
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
  { name: "André Dimmer", role: "Director of Integration", image: "/andre-dimmer.jpg", focus: "Connects AI with CRM, MarTech, data, and the systems teams already use." },
  { name: "Kristian Hampsted", role: "Deliverables Lead", image: "/kristian-hampsted.jpg", focus: "Keeps every deliverable clear, useful, and ready for the people doing the work." },
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
          {[...clients, ...clients].map((client, index) => (
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

      <section className="case-section section-light" id="work">
        <div className="case-section-intro">
          <Reveal><h2>Proof, not prototypes.</h2></Reveal>
          <Reveal delay={0.1}>
            <div>
              <p>Two governed systems built for mission-driven teams and real operating work.</p>
              <a className="case-intro-link" href="/contact" data-analytics-event="cta_click" data-analytics-cta-id="proof_intro" data-analytics-placement="proof">Bring us your hardest workflow</a>
            </div>
          </Reveal>
        </div>
        <div className="case-grid">
          <Reveal>
            <article className="case-card" data-analytics-view="case_study_engaged" data-analytics-content-id="global_citizen_listening">
              <CaseStudyVisual variant="intelligence" />
              <h3>Live social intelligence for Global Citizen.</h3>
              <p className="case-summary">Connected listening sources created one live sentiment dashboard, with every signal available for human review.</p>
              <dl className="case-proof-list">
                <div><dt>Challenge</dt><dd>Conversation and sentiment signals spread across listening sources.</dd></div>
                <div><dt>System</dt><dd>Secure connectors and MCP integrations brought the signals together.</dd></div>
                <div><dt>Operating value</dt><dd>One source-linked view of emerging narratives and sentiment.</dd></div>
                <div><dt>Human control</dt><dd>Source evidence remains available for review.</dd></div>
              </dl>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="case-card case-card-offset" data-analytics-view="case_study_engaged" data-analytics-content-id="grant_drafting_workflow">
              <CaseStudyVisual variant="visibility" />
              <h3>Grant drafting, grounded in evidence.</h3>
              <p className="case-summary">For a mission-driven organization, one structured workflow brought funder requirements, approved evidence, and prior applications into a review-ready draft.</p>
              <dl className="case-proof-list">
                <div><dt>Challenge</dt><dd>Requirements, evidence, and prior applications lived in separate places.</dd></div>
                <div><dt>System</dt><dd>A structured path from requirement to draft.</dd></div>
                <div><dt>Operating value</dt><dd>A reusable, evidence-grounded path from requirements to reviewed draft.</dd></div>
                <div><dt>Human control</dt><dd>Every proposal is reviewed before submission.</dd></div>
              </dl>
            </article>
          </Reveal>
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

      <section className="statistics-section section-dark" id="proof">
        <div className="statistics-intro"><Reveal><h2>More capacity.<br />More impact.</h2></Reveal><Reveal delay={0.1}><p>You do not need another AI experiment. You need a working system your team can trust.</p></Reveal></div>
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
