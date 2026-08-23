import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { DataBars, HeroOrb, HeroTitle, IntegrationTimeline, Reveal, ValueSequence } from "./components/ExperienceMotion";

const approach = [
  { title: "Find", text: "We get close to the work and find the friction worth fixing." },
  { title: "Prove", text: "We put numbers around the opportunity before anyone makes a big bet." },
  { title: "Build", text: "We connect the right system to the way your business already works." },
  { title: "Improve", text: "We stay close, watch what happens, and keep making it better." },
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
        <div className="hero-copy">
          <HeroTitle />
          <Reveal className="hero-lede-wrap" delay={0.35}>
            <p className="hero-lede">We find where AI can make or save the most money, quantify the opportunity, and stay to build and improve what matters.</p>
          </Reveal>
          <div className="hero-actions">
            <a className="button button-dark" href="/contact"><span>Start a conversation</span></a>
          </div>
        </div>
        <HeroOrb />
      </section>

      <section className="point-of-view section-dark">
        <div className="pov-grid">
          <Reveal><h2>Less AI theatre.<br />More useful magic.</h2></Reveal>
          <Reveal className="pov-copy" delay={0.12}><p>The model is rarely the hard part.</p><p>The real craft is choosing the right problem, proving it matters, and making the new way of working feel natural.</p></Reveal>
        </div>
      </section>

      <section className="approach section-light" id="approach">
        <div className="section-intro"><Reveal><h2>From friction<br />to value.</h2></Reveal><Reveal delay={0.1}><p>No mysterious handoffs. The same senior team follows the idea from first conversation to everyday use.</p></Reveal></div>
        <div className="approach-list">
          {approach.map((item, index) => <Reveal key={item.title} delay={index * 0.045}><article className="approach-row"><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}
        </div>
      </section>

      <ValueSequence />

      <section className="capabilities section-light" id="capabilities">
        <div className="section-intro integration-intro"><Reveal><h2>Custom AI integrations for your specific needs.</h2></Reveal><Reveal delay={0.1}><p>We’ve worked with multiple enterprise brands to integrate AI solutions strategically. Our four-step system keeps the ambition bold and the implementation grounded.</p></Reveal></div>
        <IntegrationTimeline />
      </section>

      <section className="work-section section-dark" id="work">
        <div className="section-intro work-intro"><Reveal><h2>We know your business.</h2></Reveal><Reveal delay={0.1}><p>Don’t just take our word for it. Our clients tend to stick around when they see what thoughtful AI can do.</p></Reveal></div>
        <div className="work-grid">
          <Reveal><article className="work-card work-card-primary"><h3>Making AI visibility measurable.</h3><p>A controlled GEO/AEO evaluation system spanning n8n, edge functions, agentic mention analysis, and a custom dashboard.</p><strong className="work-number">≈ 1,000</strong><p className="work-number-copy">prompt results, without losing the thread</p></article></Reveal>
          <Reveal delay={0.12}><article className="work-card"><h3>Brand intelligence you can inspect.</h3><p>An AI-enabled view of web sentiment that keeps the source evidence right beside the analysis.</p><DataBars /></article></Reveal>
        </div>
      </section>

      <section className="principles section-light">
        <div className="principles-grid"><Reveal><h2>Serious systems.<br />No serious faces required.</h2></Reveal><div className="principle-list"><Reveal><div><p><strong>No favourite hammer.</strong> We choose the technology after we understand the job.</p></div></Reveal><Reveal delay={0.06}><div><p><strong>Humans stay in the loop.</strong> Important decisions always have a clear owner and an escape hatch.</p></div></Reveal><Reveal delay={0.12}><div><p><strong>The numbers stay visible.</strong> Value, cost, risk, and responsibility never disappear into a slide deck.</p></div></Reveal><Reveal delay={0.18}><div><p><strong>Launch is the middle.</strong> The real work is helping the system earn a place in everyday operations.</p></div></Reveal></div></div>
      </section>

      <section className="team-section section-light" id="team">
        <div className="section-intro compact-intro"><Reveal><h2>The people you meet are the people who build.</h2></Reveal><Reveal delay={0.1}><p>A small senior team, close to the detail from first idea to finished system.</p></Reveal></div>
        <div className="team-grid">{team.map((person, index) => <Reveal key={person.name} delay={index * 0.08}><article className="team-card"><div className="portrait-wrap"><Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><h3>{person.name}</h3><p>{person.role}</p></article></Reveal>)}</div>
      </section>

      <section className="final-cta section-dark"><Reveal><h2>Bring us the problem everyone keeps stepping around.</h2></Reveal><Reveal delay={0.12}><div><p>We’ll tell you if AI belongs in the answer—and what a smart first move looks like.</p><a className="button button-gold" href="/contact"><span>Talk to us</span></a></div></Reveal></section>
      <SiteFooter />
    </main>
  );
}
