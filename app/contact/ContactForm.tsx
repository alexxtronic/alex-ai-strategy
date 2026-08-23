"use client";

import { FormEvent, useState } from "react";

const endpoint = "https://docs.google.com/forms/d/e/1FAIpQLSfeXTvyDUjaNBY9tyUvV_4jh7W9jpE5lJWBuqCftt3BIBV4pA/formResponse";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const website = new FormData(event.currentTarget).get("website");
    if (website) {
      event.preventDefault();
      return;
    }
    setSubmitted(true);
  }

  if (complete) {
    return <div className="form-success" tabIndex={-1}><span>Inquiry received</span><h2>Thank you.</h2><p>We will review your note and respond personally.</p><a className="text-link" href="/">Return to VITRUS</a></div>;
  }

  return (
    <>
      <form className="contact-form" action={endpoint} method="post" target="contact-sink" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label><span>Name <b>Required</b></span><input name="entry.371626239" type="text" autoComplete="name" required /></label>
          <label><span>Email <b>Required</b></span><input name="entry.768625099" type="email" autoComplete="email" required /></label>
          <label><span>Phone <b>Required</b></span><input name="entry.118140999" type="tel" autoComplete="tel" required /></label>
          <label><span>Company</span><input name="entry.1397589940" type="text" autoComplete="organization" /></label>
          <label><span>Title</span><input name="entry.543189963" type="text" autoComplete="organization-title" /></label>
          <label className="full-field"><span>Where does work feel slower, more manual, or harder to measure than it should?</span><textarea name="entry.269626038" rows={5} maxLength={1200} placeholder="A workflow, an AI opportunity, or an operating problem worth investigating." /></label>
        </div>
        <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
        <input name="entry.1647873135" type="hidden" value="Agreed to contact privacy note v2026-08-12" />
        <label className="consent"><input type="checkbox" required /><span>I agree that VITRUS may use these details to respond to my inquiry. I have not included confidential, regulated, or sensitive personal information.</span></label>
        <button className="button button-dark form-submit" type="submit" disabled={submitted}>{submitted ? "Sending…" : "Request free intro call"}<span aria-hidden="true">↗</span></button>
        <p className="form-note">Responses are stored with Google Forms and a private Google Sheet. See the <a href="/privacy">privacy note</a>.</p>
      </form>
      <iframe name="contact-sink" title="Contact form response" className="form-sink" onLoad={() => submitted && setComplete(true)} />
    </>
  );
}
