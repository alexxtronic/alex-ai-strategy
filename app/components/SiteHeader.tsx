import Image from "next/image";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={`site-header${compact ? " site-header-compact" : ""}`}>
      <a className="brand" href="/" aria-label="VITRUS home">
        <Image src="/vitrus-logo-black.png" alt="VITRUS" width={2172} height={724} priority />
      </a>
      <nav aria-label="Primary navigation">
        <a href="/#approach">Approach</a>
        <a href="/#capabilities">Capabilities</a>
        <a href="/#work">Work</a>
        <a href="/ai-roi-calculator">ROI calculator</a>
        <a className="nav-cta" href="/contact">Free intro call</a>
      </nav>
    </header>
  );
}
