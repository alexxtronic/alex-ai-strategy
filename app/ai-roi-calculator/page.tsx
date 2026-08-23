import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { RoiCalculator } from "./RoiCalculator";

export const metadata: Metadata = {
  title: "AI ROI Calculator — VITRUS",
  description: "Build a transparent first-year business case for an AI workflow with VITRUS.",
  openGraph: { title: "AI ROI Calculator — VITRUS", description: "Build a transparent first-year business case for an AI workflow with VITRUS.", images: [] },
  twitter: { title: "AI ROI Calculator — VITRUS", description: "Build a transparent first-year business case for an AI workflow with VITRUS.", images: [] },
};

export default function RoiPage() {
  return (
    <main>
      <SiteHeader compact />
      <section className="page-hero roi-hero"><p className="eyebrow"><span>AI ROI calculator</span><span>Illustrative planning model</span></p><h1>Make the AI business case<br /><em>inspectable.</em></h1><p>Estimate the baseline cost of a workflow, the capacity AI could create, and whether the first-year economics survive more realistic assumptions.</p></section>
      <RoiCalculator />
      <section className="calculator-explainer"><div><span>Hard savings</span><p>Spend that will actually disappear.</p></div><div><span>Capacity created</span><p>Time redirected into higher-value work—not automatic cash savings.</p></div><div><span>Revenue upside</span><p>Contribution or gross profit, not top-line revenue alone.</p></div><div><span>Avoided cost</span><p>Future hiring, vendor, rework, delay, or error costs credibly prevented.</p></div></section>
      <section className="inline-cta"><div><span>From estimate to evidence</span><h2>Turn the model into a real opportunity.</h2></div><p>We will map the workflow, challenge the assumptions, and identify whether there is a practical place to begin.</p><a className="button button-dark" href="/contact">Book a free intro call <span aria-hidden="true">↗</span></a></section>
      <SiteFooter />
    </main>
  );
}
