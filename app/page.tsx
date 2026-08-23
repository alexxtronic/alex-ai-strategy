import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AnimatedStatistics, CaseStudyVisual, HeroCloud, HeroTitle, ProcessSystem, Reveal } from "./components/ExperienceMotion";

const clients = [
  { name: "Specsavers", image: "/clients/specsavers.png" },
  { name: "Boligsiden", image: "/clients/boligsiden.png" },
  { name: "Global Citizen", image: "/clients/global-citizen.png" },
  { name: "LEMAN", image: "/clients/leman.png" },
  { name: "Empire State Realty Trust", image: "/clients/empire-state-realty-trust.png" },
  { name: "Scaleup Finance", image: "/clients/scaleup-finance.webp" },
  { name: "Humana", image: "/clients/humana.png" },
  { name: "Candy King", image: "/clients/candy-king.png" },
];

const team = [
  { name: "Alexander D'Amore", role: "Founder & CEO", image: "/alexander-damore.jpg" },
  { name: "André Dimmer", role: "Director of Integration", image: "/andre-dimmer.jpg" },
  { name: "Kristian Hampsted", role: "Deliverables Lead", image: "/kristian-hampsted.jpg" },
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
          <div className="hero-actions"><a className="button button-dark" href="/contact"><span>Start a conversation</span></a></div>
        </div>
      </section>

      <section className="client-strip" aria-label="Selected past clients">
        <div className="client-track">
          {[...clients, ...clients].map((client, index) => (
            <div className="client-logo" aria-hidden={index >= clients.length} key={`${client.name}-${index}`}>
              <Image src={client.image} alt={index < clients.length ? client.name : ""} fill sizes="190px" />
            </div>
          ))}
        </div>
      </section>

      <section className="process-section section-light" id="process">
        <div className="section-intro process-intro"><Reveal><h2>AI solutions as unique as your company.</h2></Reveal><Reveal delay={0.1}><p>Our four-step system identifies where AI can make the largest impact—and turns that opportunity into something your team can use.</p></Reveal></div>
        <ProcessSystem />
      </section>

      <section className="statistics-section section-dark" id="proof">
        <div className="statistics-intro"><Reveal><h2>The opportunity is real.<br />So is the gap.</h2></Reveal><Reveal delay={0.1}><p>AI is already saving time. Very few companies have turned it into a mature operating advantage. That space between adoption and impact is where we work.</p></Reveal></div>
        <AnimatedStatistics />
      </section>

      <section className="case-section section-light" id="work">
        <div className="case-section-intro"><Reveal><h2>Useful AI, doing real work.</h2></Reveal><Reveal delay={0.1}><div><p>Selected systems built around a concrete business question, with the evidence kept close enough to trust.</p><a className="case-intro-link" href="/contact">Bring us your challenge</a></div></Reveal></div>
        <div className="case-grid">
          <Reveal>
            <article className="case-card">
              <div className="case-art-wrap"><CaseStudyVisual variant="visibility" /><div className="case-client-logo"><Image src="/clients/boligsiden.png" alt="Boligsiden" fill sizes="220px" /></div></div>
              <div className="case-result"><strong>≈ 1,000</strong><p>controlled prompt results across multiple AI models</p></div>
              <h3>Turning AI visibility into a benchmark for Boligsiden.</h3>
              <p className="case-summary">Boligsiden needed more than anecdotal spot checks. We co-developed an n8n-orchestrated evaluation pipeline using edge functions, controlled prompt variations, and an analysis agent that classified brand mentions across model responses. The result was a repeatable GEO and AEO baseline surfaced in a custom dashboard.</p>
              <p className="case-type">Boligsiden · Multi-model AI visibility</p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="case-card case-card-offset">
              <CaseStudyVisual variant="intelligence" />
              <div className="case-result"><strong>Live</strong><p>source evidence kept beside every signal</p></div>
              <h3>Making web sentiment easier to trust.</h3>
              <p className="case-summary">For a global enterprise brand, we helped create an AI-enabled sentiment dashboard that kept the underlying web evidence beside the model-assisted analysis—giving teams a clearer signal without turning the system into a black box.</p>
              <p className="case-type">Enterprise brand intelligence · Evidence systems</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="team-section section-light" id="team">
        <div className="section-intro compact-intro"><Reveal><h2>The people you meet are the people who build.</h2></Reveal><Reveal delay={0.1}><p>Commercial direction, integration, and delivery stay connected through one senior team with 52 years of combined experience.</p></Reveal></div>
        <div className="team-grid">{team.map((person, index) => <Reveal key={person.name} delay={index * 0.08}><article className="team-card"><div className="portrait-wrap"><Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><h3>{person.name}</h3><p>{person.role}</p></article></Reveal>)}</div>
      </section>

      <section className="final-cta section-dark"><Reveal><h2>Let’s find your highest-impact AI opportunity.</h2></Reveal><Reveal delay={0.12}><div><p>Give us 30 minutes with the business problem. One of our specialists will help you identify where AI could make the largest difference—and what a smart first step looks like.</p><a className="button button-gold" href="/contact"><span>Request 30 minutes</span></a></div></Reveal></section>
      <SiteFooter />
    </main>
  );
}
