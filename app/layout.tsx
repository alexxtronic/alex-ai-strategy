import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { siteUrl } from "./lib/site";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400"] });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], weight: ["300", "400"], style: ["normal"] });

const title = "VITRUS | AI Systems for Missions That Matter";
const description = "VITRUS turns high-friction work into governed AI systems, giving mission-driven teams more capacity to deliver.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/vitrus-mark.png", shortcut: "/vitrus-mark.png" },
  openGraph: { title, description, type: "website", url: siteUrl, images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "VITRUS. Responsible AI for mission-driven organizations." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-v2.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
