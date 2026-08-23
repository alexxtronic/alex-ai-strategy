import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Free Intro Call — VITRUS",
  description: "Discuss where AI could create measurable business value with VITRUS.",
  openGraph: { title: "Free Intro Call — VITRUS", description: "Discuss where AI could create measurable business value with VITRUS.", images: [] },
  twitter: { title: "Free Intro Call — VITRUS", description: "Discuss where AI could create measurable business value with VITRUS.", images: [] },
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader compact />
      <section className="page-hero contact-hero"><p className="eyebrow"><span>Free intro call</span><span>Focused discovery</span></p><h1>Start with the<br /><em>business problem.</em></h1><p>Tell us where work feels slow, repetitive, fragmented, or difficult to measure. We will use the call to understand the situation and decide whether there is a credible AI opportunity to investigate.</p></section>
      <section className="contact-layout">
        <aside className="contact-aside"><span className="section-kicker">What happens next</span><h2>A focused conversation. No free solution design.</h2><ol><li><span>01</span><p>We review the business context and the operating friction you describe.</p></li><li><span>02</span><p>We discuss the economics, data access, sponsor, urgency, and capacity to change.</p></li><li><span>03</span><p>We decide whether a deeper AI opportunity assessment is the right next step.</p></li></ol><p className="aside-note">Please do not submit confidential, regulated, or sensitive personal information.</p></aside>
        <div className="form-shell"><div className="form-head"><span>Private inquiry</span><span>Required fields marked</span></div><ContactForm /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
