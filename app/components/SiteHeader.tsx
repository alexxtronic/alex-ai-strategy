"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Process", href: "/#process" },
  { label: "Proof", href: "/#proof" },
  { label: "Case studies", href: "/#work" },
  { label: "Team", href: "/#team" },
  { label: "Insights", href: "/insights" },
  { label: "ROI calculator", href: "/ai-roi-calculator" },
];

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => firstMenuLink.current?.focus());

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const desktopQuery = window.matchMedia("(min-width: 821px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => event.matches && setMenuOpen(false);

    window.addEventListener("keydown", closeOnEscape);
    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      desktopQuery.removeEventListener("change", closeAtDesktop);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${compact ? " site-header-compact" : ""}`}>
      <Link className="brand" href="/" aria-label="VITRUS home" onClick={closeMenu}>
        <Image src="/vitrus-logo-black.png" alt="VITRUS" width={2172} height={724} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        <Link className="nav-cta" href="/contact">Talk to us</Link>
      </nav>
      <div className="mobile-nav-actions">
        <Link className="nav-cta" href="/contact" onClick={closeMenu}>Talk to us</Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav className="mobile-menu-nav" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link href={item.href} key={item.href} onClick={closeMenu} ref={index === 0 ? firstMenuLink : undefined}>{item.label}</Link>
          ))}
          <Link className="mobile-menu-contact" href="/contact" onClick={closeMenu}>Let’s Chat</Link>
        </nav>
        <p>AI strategy and implementation for companies with real operational complexity.</p>
      </div>
    </header>
  );
}
