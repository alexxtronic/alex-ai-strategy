import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const approach = [
  { number: "01", title: "Investigate", text: "We interview leadership and the people doing the work. Then we map the real workflows, handoffs, systems, data, exceptions, and constraints.", output: "Workflow map + friction register" },
  { number: "02", title: "Quantify", text: "We turn friction into an opportunity portfolio, separate cash savings from capacity, and rank each use case by value, difficulty, risk, and adoption.", output: "Business case + sequenced roadmap" },
  { number: "03", title: "Build", text: "We implement one priority system at a time—reliable enough for its operating context and designed around human approval where judgment matters.", output: "Production system + controls" },
  { number: "04", title: "Improve", text: "We stay accountable after launch, measuring realized value, adoption, quality, exceptions, and the next opportunity worth moving into operation.", output: "Value ledger + improvement cycle" },
];

const capabilities = [
  { code: "A", title: "AI opportunity & strategy", text: "Find where AI can materially change margin, speed, capacity, risk, or customer experience—and make the economics inspectable before committing to a build.", list: ["Executive workshops", "Workflow diagnosis", "Use-case prioritization", "AI roadmap"] },
  { code: "B", title: "Bespoke AI systems", text: "Design company-specific applications around your knowledge, data, decisions, and operating reality rather than forcing the work into another generic tool.", list: ["Internal copilots", "Knowledge systems", "RAG platforms", "Decision support"] },
  { code: "C", title: "Agentic operations", text: "Orchestrate multi-step work across existing systems with clear boundaries, escalation paths, human review, and evidence of what happened.", list: ["Operational agents", "Research workflows", "CRM orchestration", "Service automation"] },
  { code: "D", title: "Deployment & improvement", text: "Move from prototype to daily use with integration, documentation, monitoring, governance, adoption, and a deliberate path to the next priority.", list: ["Systems integration", "Governance", "Team adoption", "Ongoing optimization"] },
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
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>Applied AI consultancy</span><span>Europe</span></p>
          <h1 id="hero-title">Operational AI.<br /><em>Built around the business case.</em></h1>
          <p className="hero-lede">VITRUS helps established companies find where AI can materially improve margin, speed, and capacity—then designs, builds, and embeds the systems to deliver it.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="/contact">Book a free intro call <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#approach">See our approach <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <aside className="case-panel" aria-label="Illustrative AI business case">
          <div className="case-head"><span>Illustrative business case</span><span>01 / 04</span></div>
          <div className="case-title-row"><p>Recurring reporting workflow</p><span className="status-dot">Opportunity mapped</span></div>
          <div className="metric-row"><span>Baseline activity cost</span><strong>€144,000</strong><small>12 people × 5 hrs × €50 × 48 weeks</small></div>
          <div className="metric-row accent-row"><span>Potential annual capacity</span><strong>€100,800</strong><small>70% of the activity redesigned</small></div>
          <div className="case-foot"><div><span>Illustrative payback</span><strong>≈ 3 months</strong></div><div><span>Next decision</span><strong>Validate assumptions</strong></div></div>
          <p className="case-note">Planning model, not a client claim. Realized value depends on adoption, implementation, and how recovered capacity is used.</p>
        </aside>
      </section>

      <div className="signal-strip" aria-label="VITRUS focus areas"><span>Strategy</span><i /><span>Systems</span><i /><span>Agentic operations</span><i /><span>Deployment</span></div>

      <section className="point-of-view section-dark">
        <div className="section-label"><span>Our point of view</span><span>01</span></div>
        <div className="pov-grid">
          <h2>AI becomes valuable only when someone redesigns the work around it.</h2>
          <div className="pov-copy"><p>Model capability is abundant. Operational judgment is not.</p><p>The hard part is choosing the right problem, making the economics explicit, connecting company data and systems, preserving human control, and getting the new way of working adopted.</p><p>That is the work VITRUS is built to do.</p></div>
        </div>
      </section>

      <section className="approach section-light" id="approach">
        <div className="section-label"><span>One connected client journey</span><span>02</span></div>
        <div className="section-intro"><h2>From operating friction<br />to realized value.</h2><p>Strategy and implementation remain one discipline. Every engagement connects diagnosis, economics, delivery, and improvement—so the roadmap reflects what the business can actually use.</p></div>
        <div className="approach-list">
          {approach.map((item) => <article className="approach-row" key={item.number}><span className="row-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><span className="row-output">{item.output}</span></article>)}
        </div>
      </section>

      <section className="value-section">
        <div className="value-statement"><p className="eyebrow"><span>The VITRUS difference</span></p><h2>We do not sell AI activity.<br /><em>We stay responsible for the value.</em></h2></div>
        <div className="value-ledger"><div><span>01</span><strong>Start upstream</strong><p>Diagnose the organization before prescribing technology.</p></div><div><span>02</span><strong>Show the math</strong><p>Separate hard savings, capacity, upside, avoided cost, and risk.</p></div><div><span>03</span><strong>Build for reality</strong><p>Use the simplest architecture that can perform reliably in context.</p></div><div><span>04</span><strong>Measure after launch</strong><p>Track adoption, exceptions, quality, maintenance, and realized value.</p></div></div>
      </section>

      <section className="capabilities section-light" id="capabilities">
        <div className="section-label"><span>Capabilities</span><span>03</span></div>
        <div className="section-intro compact-intro"><h2>What we actually<br />change inside a business.</h2><p>A deliberate set of capabilities, combined around the problem—not a catalogue of disconnected AI services.</p></div>
        <div className="capability-grid">
          {capabilities.map((item) => <article className="capability-card" key={item.code}><span className="cap-code">{item.code}</span><h3>{item.title}</h3><p>{item.text}</p><ul>{item.list.map((entry) => <li key={entry}>{entry}</li>)}</ul></article>)}
        </div>
      </section>

      <section className="work-section section-dark" id="work">
        <div className="section-label"><span>Selected work</span><span>04</span></div>
        <div className="section-intro work-intro"><h2>Evidence before<br />assertion.</h2><p>Selected systems that turned emerging AI questions into repeatable workflows with inspectable evidence.</p></div>
        <div className="work-grid">
          <article className="work-card work-card-primary"><div className="work-meta"><span>AI visibility intelligence</span><span>Multi-model system</span></div><h3>A repeatable view of how a brand appears across AI systems.</h3><p>Co-developed a controlled GEO/AEO evaluation pipeline using n8n, edge functions, approximately 1,000 prompt results, agentic mention analysis, and a custom dashboard.</p><div className="work-proof"><span><small>Prompt results</small><strong>≈ 1,000</strong></span><span><small>Model coverage</small><strong>Multiple</strong></span><span><small>Operating mode</small><strong>Repeatable</strong></span></div></article>
          <article className="work-card"><div className="work-meta"><span>Brand intelligence</span><span>Evidence-backed analysis</span></div><h3>A clearer signal from brand sentiment across the web.</h3><p>Helped create an AI-enabled system and dashboard for tracking web brand sentiment, designed to keep the underlying evidence inspectable alongside model-assisted analysis.</p><div className="dashboard-motif" aria-hidden="true"><span /><span /><span /><span /><span /></div></article>
        </div>
        <p className="proof-note">Projects are presented without client attribution where public disclosure has not been approved. No unsupported commercial outcomes have been added.</p>
      </section>

      <section className="principles section-light">
        <div className="section-label"><span>Designed for operating reality</span><span>05</span></div>
        <div className="principles-grid"><h2>Enterprise thinking<br />without enterprise theatre.</h2><div className="principle-list"><div><span>01</span><p><strong>Vendor-neutral judgment.</strong> Architecture follows the operating requirement, not a resale quota.</p></div><div><span>02</span><p><strong>Human control by design.</strong> Consequential or ambiguous decisions keep an appropriate review and escalation path.</p></div><div><span>03</span><p><strong>Inspectable economics.</strong> Assumptions, value mechanisms, costs, and owners stay visible from roadmap through review.</p></div><div><span>04</span><p><strong>Adoption is part of delivery.</strong> Documentation, governance, monitoring, and team behavior are designed from the beginning.</p></div></div></div>
      </section>

      <section className="team-section section-light" id="team">
        <div className="section-label"><span>Team</span><span>06</span></div>
        <div className="section-intro compact-intro"><h2>Three disciplines.<br />One delivery team.</h2><p>Commercial direction, systems integration, and delivery remain connected throughout the engagement.</p></div>
        <div className="team-grid">{team.map((person, index) => <article className="team-card" key={person.name}><div className="portrait-wrap"><Image src={person.image} alt={person.name} fill sizes="(max-width: 760px) 100vw, 33vw" /><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{person.name}</h3><p>{person.role}</p></article>)}</div>
      </section>

      <section className="final-cta section-dark"><p className="eyebrow"><span>Start with the business</span></p><h2>Find the first AI opportunity<br /><em>worth pursuing.</em></h2><div><p>In a free intro call, we will discuss where work is slow, repetitive, fragmented, or difficult to measure—and whether there is a credible place to begin.</p><a className="button button-gold" href="/contact">Book a free intro call <span aria-hidden="true">↗</span></a></div></section>
      <SiteFooter />
    </main>
  );
}
