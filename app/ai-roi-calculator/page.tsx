import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { RoiCalculator } from "./RoiCalculator";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "AI ROI Calculator | VITRUS",
  description: "Estimate what repetitive work costs and how much capacity a responsible AI system could return.",
  alternates: { canonical: `${siteUrl}/ai-roi-calculator` },
  openGraph: { title: "AI ROI Calculator | VITRUS", description: "Estimate what repetitive work costs and how much capacity a responsible AI system could return.", url: `${siteUrl}/ai-roi-calculator/`, images: [{ url: `${siteUrl}/og-v2.png`, width: 1731, height: 909, alt: "VITRUS. Responsible AI for mission-driven organizations." }] },
  twitter: { card: "summary_large_image", title: "AI ROI Calculator | VITRUS", description: "Estimate what repetitive work costs and how much capacity a responsible AI system could return.", images: [`${siteUrl}/og-v2.png`] },
};

export default function RoiPage() {
  return (
    <main data-page-type="calculator">
      <SiteHeader compact />
      <RoiCalculator />
      <SiteFooter />
    </main>
  );
}
