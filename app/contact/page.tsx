import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Free 30 Minute AI Readiness Call | VITRUS",
  description: "Request a free 30 minute AI readiness call with one of our experts today.",
  openGraph: { title: "Free 30 Minute AI Readiness Call | VITRUS", description: "Request a free 30 minute AI readiness call with one of our experts today.", images: [] },
  twitter: { title: "Free 30 Minute AI Readiness Call | VITRUS", description: "Request a free 30 minute AI readiness call with one of our experts today.", images: [] },
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader compact />
      <section className="contact-onepage">
        <div className="contact-onepage-copy"><h1>We’re yours for<br />30 minutes</h1><p>Request a free 30 minute AI readiness call with one of our experts today.</p><div className="contact-promise"><span>Free and focused</span><span>One senior specialist</span><span>A practical next step</span></div></div>
        <div className="form-shell contact-form-shell"><ContactForm /></div>
      </section>
    </main>
  );
}
