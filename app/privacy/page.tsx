import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy — VITRUS",
  description: "How VITRUS handles information submitted through its inquiry form.",
  openGraph: { title: "Privacy — VITRUS", description: "How VITRUS handles information submitted through its inquiry form.", images: [] },
  twitter: { title: "Privacy — VITRUS", description: "How VITRUS handles information submitted through its inquiry form.", images: [] },
};

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader compact />
      <section className="page-hero legal-hero"><p className="eyebrow"><span>Privacy note</span><span>Last reviewed August 2026</span></p><h1>Clear handling of<br /><em>inquiry data.</em></h1></section>
      <article className="legal-body">
        <section><span>01</span><div><h2>What the inquiry form collects</h2><p>The form asks for your name, email address, phone number, and—if you choose to provide them—your company, title, and a short description of the business problem you want to discuss.</p></div></section>
        <section><span>02</span><div><h2>How the information is used</h2><p>VITRUS uses the submitted details to review and respond to your inquiry, prepare for an introductory conversation, and decide whether a deeper opportunity assessment may be useful.</p></div></section>
        <section><span>03</span><div><h2>Where responses are stored</h2><p>Inquiry responses are submitted through Google Forms and stored in a private Google Sheet used for the inquiry workflow. The form is not intended for confidential, regulated, or sensitive personal information.</p></div></section>
        <section><span>04</span><div><h2>Your choices</h2><p>You do not need to use the form to browse the VITRUS website or use the illustrative ROI calculator. The calculator runs in your browser and its inputs are not submitted through the inquiry form.</p></div></section>
        <section><span>05</span><div><h2>Questions about an inquiry</h2><p>If you have already corresponded with VITRUS, you can reply to that conversation with any question about the information you submitted.</p></div></section>
      </article>
      <SiteFooter />
    </main>
  );
}
