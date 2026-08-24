import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400"] });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], weight: ["300", "400"], style: ["normal"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "vitrus.org";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "VITRUS | Your next AI Strategy Partner";
  const description = "VITRUS finds where AI can make or save the most money, quantifies the opportunity, and stays to build and improve what matters.";

  return {
    title,
    description,
    icons: { icon: "/vitrus-mark.png", shortcut: "/vitrus-mark.png" },
    openGraph: { title, description, type: "website", url: origin, images: [{ url: `${origin}/og-v2.png`, width: 1731, height: 909, alt: "VITRUS. We’re your next AI Strategy Partner." }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og-v2.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
