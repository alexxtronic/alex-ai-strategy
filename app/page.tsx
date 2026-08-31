import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AnimatedStatistics, CaseStudyVisual, HeroCloud, HeroTitle, ProcessSystem, Reveal, ServicesGrid } from "./components/ExperienceMotion";

const clients = [
  { name: "Empire State Building", slug: "empire-state", image: "/clients/empire-state-realty-trust.png" },
  { name: "Humana", slug: "humana", image: "/clients/humana.png" },
  { name: "Global Citizen", slug: "global-citizen", image: "/clients/global-citizen.png" },
  { name: "DFIN", slug: "dfin", image: "/clients/dfin.png" },
  { name: "Scaleup Finance", slug: "scaleup-finance", image: "/clients/scaleup-finance.webp" },
  { name: "STATE Grill & Bar", slug: "state-grill" },
];

const team = [
  { name: "Alexander D'Amore", role: "Founder & CEO", image: "/alexander-damore.jpg", portraitClass: "portrait-image-crop-corners", focus: "Leads AI strategy, business-case development, solution design, and delivery." },
  { name: "André Rosario", role: "Senior Consultant, AI & CRM", image: "/andre-dimmer.jpg", focus: "Connects AI with CRM, customer journeys, and enterprise operating systems." },
  { name: "Kristian Hansen", role: "Advisor", image: "/kristian-hampsted.jpg", focus: "Advises on commercial priorities, leadership alignment, and practical adoption." },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <HeroCloud />
        <div className="hero-copy">
          <HeroTitle />
          <Reveal className="hero-lede-wrap" delay={0.3}>
            <p className="hero-lede">We turn high-friction work into governed AI systems, giving mission-driven teams more capacity to deliver.</p>
          </Reveal>
          <div className="hero-actions"><a className="button button-dark" href="/contact"><span>Book a free intro call</span></a></div>
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

      <section className="process-section section-light" id="process">
        <div className="section-intro process-intro"><Reveal><h2>From friction to working system.</h2></Reveal><Reveal delay={0.1}><p>We find the right problem, prove the value, build one governed system, and improve it with your team.</p></Reveal></div>
        <ProcessSystem />
      </section>

      <section className="services-section section-light" id="services">
        <div className="section-intro services-intro"><Reveal><h2>Where AI can return capacity.</h2></Reveal><Reveal delay={0.1}><p>Focused systems for the recurring work behind fundraising, reporting, knowledge, and operations.</p></Reveal></div>
        <ServicesGrid />
      </section>

      <section className="statistics-section section-dark" id="proof">
        <div className="statistics-intro"><Reveal><h2>More capacity.<br />More impact.</h2></Reveal><Reveal delay={0.1}><p>You do not need another AI experiment. You need a working system your team can trust.</p></Reveal></div>
        <AnimatedStatistics />
      </section>

      <section className="case-section section-light" id="work">
        <div className="case-section-intro">
          <Reveal><h2>Proof, not prototypes.</h2></Reveal>
          <Reveal delay={0.1}>
            <div>
              <p>Two governed systems built for mission-driven teams and real operating work.</p>
              <a className="case-intro-link" href="/contact">Bring us your hardest workflow</a>
            </div>
          </Reveal>
        </div>
        <div className="case-grid">
          <Reveal>
            <article className="case-card">
              <CaseStudyVisual variant="intelligence" />
              <h3>Live social intelligence for Global Citizen.</h3>
              <p className="case-summary">We connected social listening sources through MCP integrations into one live sentiment dashboard, with the evidence always available for human review.</p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="case-card case-card-offset">
              <CaseStudyVisual variant="visibility" />
              <h3>Grant drafting, grounded in evidence.</h3>
              <p className="case-summary">For a mission-driven organization, we brought fund requirements, approved evidence, and past applications into one structured drafting workflow, with human review before submission.</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="team-section section-light" id="team">
        <div className="section-intro compact-intro"><Reveal><h2>Senior people, start to finish.</h2></Reveal><Reveal delay={0.1}><p>The specialists who shape the strategy stay close through build, adoption, and improvement.</p></Reveal></div>
        <div className="team-grid">{team.map((person, index) => <Reveal key={person.name} delay={index * 0.08}><article className="team-card"><div className="portrait-wrap"><Image className={"portraitClass" in person ? person.portraitClass : undefined} src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div className="team-card-copy"><h3>{person.name}</h3><p className="team-role">{person.role}</p><p className="team-focus">{person.focus}</p></div></article></Reveal>)}</div>
      </section>

      <section className="final-cta section-dark"><Reveal><h2>Start with the right problem.</h2></Reveal><Reveal delay={0.12}><div><p>Give us 30 minutes. We will identify where AI could return the most capacity, and whether there is a responsible case to build.</p><a className="button button-gold" href="/contact"><span>Book a free intro call</span></a></div></Reveal></section>
      <SiteFooter />
    </main>
  );
}
