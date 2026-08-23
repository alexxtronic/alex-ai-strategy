import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`site-header${compact ? " site-header-compact" : ""}`}>
      <Link className="brand" href="/" aria-label="VITRUS home">
        <Image src="/vitrus-logo-black.png" alt="VITRUS" width={2172} height={724} priority />
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/#approach">Approach</Link>
        <Link href="/#capabilities">Capabilities</Link>
        <Link href="/#work">Work</Link>
        <Link href="/ai-roi-calculator">ROI calculator</Link>
        <Link className="nav-cta" href="/contact">Talk to us</Link>
      </nav>
    </header>
  );
}
