import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { ContactForm } from "./ContactForm";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Free AI Intro Call | VITRUS",
  description: "Request a free 30 minute call to find where responsible AI could return the most capacity to your team.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: { title: "Free AI Intro Call | VITRUS", description: "Request a free 30 minute call to find where responsible AI could return the most capacity to your team.", url: `${siteUrl}/contact/`, images: [{ url: `${siteUrl}/og-v2.png`, width: 1731, height: 909, alt: "VITRUS. Responsible AI for mission-driven organizations." }] },
  twitter: { card: "summary_large_image", title: "Free AI Intro Call | VITRUS", description: "Request a free 30 minute call to find where responsible AI could return the most capacity to your team.", images: [`${siteUrl}/og-v2.png`] },
};

export default function ContactPage() {
  return (
    <main className="contact-page" data-page-type="contact">
      <SiteHeader compact />
      <section className="contact-onepage">
        <div className="contact-onepage-copy"><h1>Show us where<br />the work gets stuck</h1><p>In 30 minutes, we will explore where AI could return meaningful capacity without compromising judgment or control.</p><div className="contact-promise"><span>Free 30 minute call</span><span>Senior specialist</span><span>Clear next step</span></div></div>
        <div className="form-shell contact-form-shell"><ContactForm /></div>
      </section>
    </main>
  );
}
