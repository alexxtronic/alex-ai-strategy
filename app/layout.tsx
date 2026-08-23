import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "vitrus.org";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "VITRUS — Operational AI, built around the business case";
  const description = "VITRUS finds where AI can materially improve established businesses, quantifies the economics, and implements the systems that make the value real.";

  return {
    title,
    description,
    icons: { icon: "/vitrus-mark.png", shortcut: "/vitrus-mark.png" },
    openGraph: { title, description, type: "website", url: origin, images: [{ url: `${origin}/og.png`, width: 1732, height: 908, alt: "VITRUS — Operational AI. Built around the business case." }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
