import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { AnalyticsProvider } from "./components/AnalyticsProvider";
import { siteUrl } from "./lib/site";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400"] });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], weight: ["300", "400"], style: ["normal"] });

const title = "VITRUS | AI Systems for Missions That Matter";
const description = "VITRUS builds governed AI systems for established nonprofits, NGOs, and foundations across fundraising, reporting, knowledge, and operations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: siteUrl },
  icons: { icon: "/vitrus-mark.png", shortcut: "/vitrus-mark.png" },
  openGraph: { title, description, type: "website", url: siteUrl, images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "VITRUS. Responsible AI for mission-driven organizations." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-v2.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}<AnalyticsProvider /></body></html>;
}
