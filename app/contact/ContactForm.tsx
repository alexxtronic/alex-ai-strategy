"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackEvent } from "../lib/analytics";

const endpoint = "https://docs.google.com/forms/d/e/1FAIpQLSfeXTvyDUjaNBY9tyUvV_4jh7W9jpE5lJWBuqCftt3BIBV4pA/formResponse";
const solutionLabels: Record<string, string> = {
  "grant-reporting-automation": "Grant and reporting automation",
  "funder-partner-intelligence": "Fundraising and partner intelligence",
  "listening-decision-dashboards": "Live listening and decision dashboards",
  "secure-knowledge-systems": "Secure organizational knowledge",
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const [solution, setSolution] = useState("");
  const [helpRequest, setHelpRequest] = useState("");
  const started = useRef(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("solution") ?? "";
    const prefillTimer = window.setTimeout(() => {
      if (!solutionLabels[value]) return;
      setSolution(value);
      setHelpRequest(`Interested in: ${solutionLabels[value]}.\n\n`);
    }, 0);
    return () => {
      window.clearTimeout(prefillTimer);
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  function solutionInterest() {
    return solution || undefined;
  }

  function handleStart() {
    if (started.current) return;
    started.current = true;
    trackEvent("contact_form_start", { form_id: "intro_request", solution_interest: solutionInterest() });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const website = new FormData(event.currentTarget).get("website");
    if (website) {
      event.preventDefault();
      return;
    }
    trackEvent("contact_form_submit", { form_id: "intro_request", solution_interest: solutionInterest() });
    setFailed(false);
    setSubmitted(true);
    timeout.current = window.setTimeout(() => {
      trackEvent("contact_form_timeout", { form_id: "intro_request" });
      setSubmitted(false);
      setFailed(true);
    }, 15000);
  }

  function handleComplete() {
    if (!submitted) return;
    if (timeout.current) window.clearTimeout(timeout.current);
    setSubmitted(false);
    trackEvent("contact_form_response_loaded", { form_id: "intro_request", solution_interest: solutionInterest() });
    setComplete(true);
  }

  if (complete) {
    return <div className="form-success" tabIndex={-1}><h2>Thank you.</h2><p>We will review your note and respond personally.</p><Link className="text-link" href="/">Return to VITRUS</Link></div>;
  }

  return (
    <>
      <form className="contact-form" action={endpoint} method="post" target="contact-sink" onSubmit={handleSubmit} onFocusCapture={handleStart}>
        <div className="form-grid">
          <label><span>Name <b aria-hidden="true">*</b></span><input name="entry.371626239" type="text" autoComplete="name" required /></label>
          <label><span>Email <b aria-hidden="true">*</b></span><input name="entry.768625099" type="email" autoComplete="email" required /></label>
          <label><span>Phone <b aria-hidden="true">*</b></span><input name="entry.118140999" type="tel" autoComplete="tel" required /></label>
          <label><span>Company</span><input name="entry.1397589940" type="text" autoComplete="organization" /></label>
          <label><span>Title</span><input name="entry.543189963" type="text" autoComplete="organization-title" /></label>
          <label className="full-field"><span>Where does the work get stuck?</span><textarea name="entry.269626038" rows={3} maxLength={1200} placeholder="Reporting, grant work, knowledge, partnerships, or another recurring workflow." value={helpRequest} onChange={(event) => setHelpRequest(event.target.value)} /></label>
        </div>
        <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
        <input name="entry.1647873135" type="hidden" value="Agreed to contact privacy note v2026-08-12" />
        <label className="consent"><input type="checkbox" required /><span>I agree that VITRUS may use these details to respond to my inquiry. I have not included confidential, regulated, or sensitive personal information.</span></label>
        <button className="button button-dark form-submit" type="submit" disabled={submitted}><span>{submitted ? "Sending…" : "Request a free intro call"}</span></button>
        {failed && <p className="form-error" role="status">We could not confirm the response. Please check your connection and try again.</p>}
        <p className="form-note">Responses are stored with Google Forms and a private Google Sheet. See the <Link href="/privacy">privacy note</Link>.</p>
      </form>
      <iframe name="contact-sink" title="Contact form response" className="form-sink" onLoad={handleComplete} />
    </>
  );
}
