import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { siteUrl } from "./lib/site";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400"] });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], weight: ["300", "400"], style: ["normal"] });

const title = "VITRUS | Your next AI Strategy Partner";
const description = "VITRUS finds where AI can make or save the most money, quantifies the opportunity, and stays to build and improve what matters.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/vitrus-mark.png", shortcut: "/vitrus-mark.png" },
  openGraph: { title, description, type: "website", url: siteUrl, images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "VITRUS. We’re your next AI Strategy Partner." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-v2.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
