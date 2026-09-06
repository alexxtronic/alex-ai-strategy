import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { siteUrl } from "../lib/site";

const analyticsProvider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";

function AnalyticsDisclosure() {
  if (analyticsProvider === "plausible") {
    return <>VITRUS uses Plausible Analytics to understand aggregate page use and conversion steps without collecting form contents or exact calculator inputs. Plausible does not use cookies for this setup. Event properties are limited to page, placement, broad calculator bands, and campaign labels. No names, contact details, company names, or inquiry text are sent.</>;
  }
  return <>The site includes privacy-conscious measurement events, but no third-party analytics provider is currently active. In this mode, usage events do not leave the browser.</>;
}

export const metadata: Metadata = {
  title: "Privacy | VITRUS",
  description: "How VITRUS handles information submitted through its inquiry form.",
  alternates: { canonical: `${siteUrl}/privacy` },
  openGraph: { title: "Privacy | VITRUS", description: "How VITRUS handles information submitted through its inquiry form.", url: `${siteUrl}/privacy/`, images: [{ url: `${siteUrl}/og-v2.png`, width: 1731, height: 909, alt: "VITRUS. Responsible AI for mission-driven organizations." }] },
  twitter: { card: "summary_large_image", title: "Privacy | VITRUS", description: "How VITRUS handles information submitted through its inquiry form.", images: [`${siteUrl}/og-v2.png`] },
};

export default function PrivacyPage() {
  return (
    <main>
      <SiteHeader compact />
      <section className="page-hero legal-hero"><h1>Clear handling of inquiry data.</h1></section>
      <article className="legal-body">
        <section><span>01</span><div><h2>What the inquiry form collects</h2><p>The form asks for your name, email address, and phone number. You may also provide a company, title, and a short description of the business problem you want to discuss.</p></div></section>
        <section><span>02</span><div><h2>How the information is used</h2><p>VITRUS uses the submitted details to review and respond to your inquiry, prepare for an introductory conversation, and decide whether a deeper opportunity assessment may be useful.</p></div></section>
        <section><span>03</span><div><h2>Where responses are stored</h2><p>Inquiry responses are submitted through Google Forms and stored in a private Google Sheet used for the inquiry workflow. The form is not intended for confidential, regulated, or sensitive personal information.</p></div></section>
        <section><span>04</span><div><h2>Analytics</h2><p><AnalyticsDisclosure /></p></div></section>
        <section><span>05</span><div><h2>Your choices</h2><p>You do not need to use the form to browse the VITRUS website or use the illustrative ROI calculator. The calculator runs in your browser. Only broad, non-identifying value bands may be measured when analytics is active.</p></div></section>
        <section><span>06</span><div><h2>Questions about an inquiry</h2><p>If you have already corresponded with VITRUS, you can reply to that conversation with any question about the information you submitted.</p></div></section>
      </article>
      <SiteFooter />
    </main>
  );
}
