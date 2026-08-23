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
      <section className="page-hero contact-hero"><h1>Start with the<br />business problem.</h1><p>Tell us where work feels slow, repetitive, fragmented, or difficult to measure. We will use the call to understand the situation and decide whether there is a credible AI opportunity to investigate.</p></section>
      <section className="contact-layout">
        <aside className="contact-aside"><h2>What happens next.</h2><ol><li><span>1</span><p>We review the business context and the operating friction you describe.</p></li><li><span>2</span><p>We discuss the economics, data access, sponsor, urgency, and capacity to change.</p></li><li><span>3</span><p>We decide whether a deeper AI opportunity assessment is the right next step.</p></li></ol><p className="aside-note">Please do not submit confidential, regulated, or sensitive personal information.</p></aside>
        <div className="form-shell"><ContactForm /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
