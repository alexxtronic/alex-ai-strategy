import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { RoiCalculator } from "./RoiCalculator";

export const metadata: Metadata = {
  title: "AI ROI Calculator | VITRUS",
  description: "Estimate the annual value of automating one repetitive workflow with VITRUS.",
  openGraph: { title: "AI ROI Calculator | VITRUS", description: "Estimate the annual value of automating one repetitive workflow with VITRUS.", images: [] },
  twitter: { title: "AI ROI Calculator | VITRUS", description: "Estimate the annual value of automating one repetitive workflow with VITRUS.", images: [] },
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
