import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { DataBars, HeroTitle, Reveal, SignalField } from "./components/ExperienceMotion";

const approach = [
  { title: "Find", text: "We map the work, talk to the people doing it, and isolate where AI could materially change margin, speed, capacity, risk, or customer experience." },
  { title: "Prove", text: "We quantify the opportunity, challenge the assumptions, and sequence a roadmap the business can fund, govern, and actually use." },
  { title: "Build", text: "We design and implement the priority system around your data, workflows, controls, and existing technology." },
  { title: "Improve", text: "We stay after launch to measure adoption, quality, exceptions, and realized value—then improve what matters." },
];

const capabilities = [
  { title: "AI strategy", text: "Opportunity mapping, readiness, executive alignment, economics, and a practical transformation roadmap." },
  { title: "AI systems", text: "Company-specific copilots, knowledge systems, decision support, and applications built around how your business works." },
  { title: "Agentic operations", text: "Multi-step workflows that act across existing systems with boundaries, evidence, escalation, and human review." },
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
            <a className="button button-dark" href="/contact">Talk to us <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <SignalField />
      </section>

      <section className="point-of-view section-dark">
        <div className="pov-grid">
          <Reveal><h2>AI becomes valuable when the work changes.</h2></Reveal>
          <Reveal className="pov-copy" delay={0.12}><p>Model capability is abundant. Operational judgment is not.</p><p>The difficult work is choosing the right problem, making the economics explicit, connecting company data and systems, and getting the new way of working adopted.</p></Reveal>
        </div>
      </section>

      <section className="approach section-light" id="approach">
        <div className="section-intro"><Reveal><h2>From friction<br />to value.</h2></Reveal><Reveal delay={0.1}><p>Strategy and implementation stay connected. The same senior team follows the business case from diagnosis through delivery and improvement.</p></Reveal></div>
        <div className="approach-list">
          {approach.map((item, index) => <Reveal key={item.title} delay={index * 0.045}><article className="approach-row"><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}
        </div>
      </section>

      <section className="value-section">
        <Reveal className="value-statement"><h2>Find it.<br />Prove it.<br />Build it.</h2></Reveal>
        <div className="value-ledger"><Reveal><div><strong>Business before technology.</strong><p>We diagnose the organization before prescribing a system.</p></div></Reveal><Reveal delay={0.08}><div><strong>Economics before commitment.</strong><p>Savings, capacity, upside, cost, and risk remain visible.</p></div></Reveal><Reveal delay={0.16}><div><strong>Value after launch.</strong><p>Adoption, quality, exceptions, and outcomes are measured.</p></div></Reveal></div>
      </section>

      <section className="capabilities section-light" id="capabilities">
        <div className="section-intro compact-intro"><Reveal><h2>Strategy. Systems.<br />Operations.</h2></Reveal><Reveal delay={0.1}><p>A small set of connected capabilities, shaped around the business problem—not a menu of AI services.</p></Reveal></div>
        <div className="capability-grid">
          {capabilities.map((item, index) => <Reveal key={item.title} delay={index * 0.08}><article className="capability-card"><h3>{item.title}</h3><p>{item.text}</p></article></Reveal>)}
        </div>
      </section>

      <section className="work-section section-dark" id="work">
        <div className="section-intro work-intro"><Reveal><h2>Evidence before assertion.</h2></Reveal><Reveal delay={0.1}><p>Selected systems that turned emerging AI questions into repeatable workflows with inspectable evidence.</p></Reveal></div>
        <div className="work-grid">
          <Reveal><article className="work-card work-card-primary"><h3>AI visibility, made measurable.</h3><p>Co-developed a controlled GEO/AEO evaluation pipeline using n8n, edge functions, approximately 1,000 prompt results, agentic mention analysis, and a custom dashboard.</p><strong className="work-number">≈ 1,000</strong><p className="work-number-copy">prompt results across multiple models</p></article></Reveal>
          <Reveal delay={0.12}><article className="work-card"><h3>Brand intelligence with its evidence intact.</h3><p>Created an AI-enabled system for tracking web brand sentiment while keeping the underlying evidence inspectable alongside model-assisted analysis.</p><DataBars /></article></Reveal>
        </div>
      </section>

      <section className="principles section-light">
        <div className="principles-grid"><Reveal><h2>Enterprise thinking without enterprise theatre.</h2></Reveal><div className="principle-list"><Reveal><div><p><strong>Vendor-neutral judgment.</strong> Architecture follows the operating requirement, not a resale quota.</p></div></Reveal><Reveal delay={0.06}><div><p><strong>Human control by design.</strong> Consequential decisions keep an appropriate review and escalation path.</p></div></Reveal><Reveal delay={0.12}><div><p><strong>Inspectable economics.</strong> Assumptions, value mechanisms, costs, and owners remain visible.</p></div></Reveal><Reveal delay={0.18}><div><p><strong>Adoption is delivery.</strong> Governance, documentation, monitoring, and team behavior are designed from the start.</p></div></Reveal></div></div>
      </section>

      <section className="team-section section-light" id="team">
        <div className="section-intro compact-intro"><Reveal><h2>Senior people doing the work.</h2></Reveal><Reveal delay={0.1}><p>Commercial direction, systems integration, and delivery remain connected throughout the engagement.</p></Reveal></div>
        <div className="team-grid">{team.map((person, index) => <Reveal key={person.name} delay={index * 0.08}><article className="team-card"><div className="portrait-wrap"><Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><h3>{person.name}</h3><p>{person.role}</p></article></Reveal>)}</div>
      </section>

      <section className="final-cta section-dark"><Reveal><h2>Bring us the business problem.</h2></Reveal><Reveal delay={0.12}><div><p>We will identify whether there is a credible AI opportunity worth investigating.</p><a className="button button-gold" href="/contact">Talk to us <span aria-hidden="true">↗</span></a></div></Reveal></section>
      <SiteFooter />
    </main>
  );
}
