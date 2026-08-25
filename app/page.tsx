import Image from "next/image";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AnimatedStatistics, HeroCloud, HeroTitle, ProcessSystem, Reveal, ServicesGrid } from "./components/ExperienceMotion";

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
        <div className="case-section-intro">
          <Reveal><h2>Enterprise experience.</h2></Reveal>
          <Reveal delay={0.1}>
            <div>
              <p>We’ve already worked with multiple enterprise companies.</p>
              <a className="case-intro-link" href="/contact">Bring us your challenge</a>
            </div>
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
