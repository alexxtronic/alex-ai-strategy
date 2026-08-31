import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { RoiCalculator } from "./RoiCalculator";

export const metadata: Metadata = {
  title: "AI ROI Calculator | VITRUS",
  description: "Estimate what repetitive work costs and how much capacity a responsible AI system could return.",
  openGraph: { title: "AI ROI Calculator | VITRUS", description: "Estimate what repetitive work costs and how much capacity a responsible AI system could return.", images: [] },
  twitter: { title: "AI ROI Calculator | VITRUS", description: "Estimate what repetitive work costs and how much capacity a responsible AI system could return.", images: [] },
};

export default function RoiPage() {
  return (
    <main>
      <SiteHeader compact />
      <RoiCalculator />
      <SiteFooter />
    </main>
  );
}
