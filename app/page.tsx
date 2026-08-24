import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AnimatedStatistics, CaseStudyVisual, HeroCloud, HeroTitle, ProcessSystem, Reveal, ServicesGrid } from "./components/ExperienceMotion";

const clients = [
  { name: "Specsavers", slug: "specsavers", image: "/clients/specsavers.png" },
  { name: "Global Citizen", slug: "global-citizen", image: "/clients/global-citizen.png" },
  { name: "LEMAN", slug: "leman", image: "/clients/leman.png" },
  { name: "Empire State Realty Trust", slug: "empire-state", image: "/clients/empire-state-realty-trust.png" },
  { name: "Scaleup Finance", slug: "scaleup-finance", image: "/clients/scaleup-finance.webp" },
  { name: "Humana", slug: "humana", image: "/clients/humana.png" },
  { name: "Candy King", slug: "candy-king", image: "/clients/candy-king.png" },
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
            <p className="hero-lede">We find where AI can make or save the most money, quantify the opportunity, and stay to build and improve what matters.</p>
          </Reveal>
          <div className="hero-actions"><a className="button button-dark" href="/contact"><span>Let’s Chat</span></a></div>
        </div>
      </section>

      <section className="client-strip" aria-label="Selected past clients">
        <div className="client-track">
          {[...clients, ...clients].map((client, index) => (
            <div className={`client-logo client-logo-${client.slug}`} aria-hidden={index >= clients.length} key={`${client.name}-${index}`}>
              <Image
                src={client.image}
                alt={index < clients.length ? client.name : ""}
                fill
                sizes="190px"
                style={{ objectFit: ["specsavers", "global-citizen", "leman"].includes(client.slug) ? "contain" : "cover" }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="process-section section-light" id="process">
        <div className="section-intro process-intro"><Reveal><h2>AI solutions as unique as your company.</h2></Reveal><Reveal delay={0.1}><p>Our four-step system identifies where AI can create measurable advantage, then takes one priority from business case to working system.</p></Reveal></div>
        <ProcessSystem />
      </section>

      <section className="services-section section-light" id="services">
        <div className="section-intro services-intro"><Reveal><h2>Five ways we make AI useful.</h2></Reveal><Reveal delay={0.1}><p>We select the right architecture for the business need, connect it cleanly, and stay accountable for what it changes.</p></Reveal></div>
        <ServicesGrid />
      </section>

      <section className="statistics-section section-dark" id="proof">
        <div className="statistics-intro"><Reveal><h2>The opportunity is real.<br />So is the gap.</h2></Reveal><Reveal delay={0.1}><p>AI is already saving time. Very few companies have turned it into a mature operating advantage. That space between adoption and impact is where we work.</p></Reveal></div>
        <AnimatedStatistics />
      </section>

      <section className="case-section section-light" id="work">
        <div className="case-section-intro"><Reveal><h2>The proof is in the prompt.</h2></Reveal><Reveal delay={0.1}><div><p>We’ve already helped multiple enterprise brands transition to the new era of AI.</p><a className="case-intro-link" href="/contact">Bring us your challenge</a></div></Reveal></div>
        <div className="case-grid">
          <Reveal>
            <article className="case-card">
              <div className="case-art-wrap"><CaseStudyVisual variant="visibility" /></div>
              <div className="case-deliverable"><strong>Custom GEO / AEO solution for a property platform</strong><p>Automatic LLM monitoring</p></div>
              <h3>Turning AI visibility into a repeatable benchmark.</h3>
              <p className="case-summary">A leading property platform needed more than anecdotal spot checks. We co-developed an n8n-orchestrated evaluation pipeline using edge functions, controlled prompt variations, and an analysis agent that classified brand mentions across model responses. Automatic monitoring turned that work into a repeatable GEO and AEO benchmark while saving 3,449 hours.</p>
              <p className="case-type">Property intelligence · Multi-model AI visibility</p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="case-card case-card-offset">
              <CaseStudyVisual variant="intelligence" />
              <div className="case-deliverable"><strong>Brand Sentiment Dashboard</strong><p>Custom Dashboard with MCP integrations</p></div>
              <h3>Making web sentiment easier to trust.</h3>
              <p className="case-summary">For a global enterprise brand, we helped create an AI-enabled report tracking total Facebook, Instagram, and blog mentions alongside user sentiment, while keeping the underlying evidence beside the model-assisted analysis.</p>
              <p className="case-type">Enterprise brand intelligence · Social and web sentiment</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="team-section section-light" id="team">
        <div className="section-intro compact-intro"><Reveal><h2>A team you can trust.</h2></Reveal><Reveal delay={0.1}><p>Senior specialists stay involved from the first business case through implementation and improvement.</p></Reveal></div>
        <div className="team-grid">{team.map((person, index) => <Reveal key={person.name} delay={index * 0.08}><article className="team-card"><div className="portrait-wrap"><Image className={"portraitClass" in person ? person.portraitClass : undefined} src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div className="team-card-copy"><h3>{person.name}</h3><p className="team-role">{person.role}</p><p className="team-focus">{person.focus}</p></div></article></Reveal>)}</div>
      </section>

      <section className="final-cta section-dark"><Reveal><h2>Let’s find your highest-impact AI opportunity.</h2></Reveal><Reveal delay={0.12}><div><p>Give us 30 minutes with the business problem. One of our specialists will help you identify where AI could make the largest difference and what a smart first step looks like.</p><a className="button button-gold" href="/contact"><span>Request 30 minutes</span></a></div></Reveal></section>
      <SiteFooter />
    </main>
  );
}
