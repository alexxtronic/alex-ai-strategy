"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids Vinext client-router interception failures. */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "Proof", href: "/#proof" },
  { label: "Case studies", href: "/#work" },
  { label: "Team", href: "/#team" },
  { label: "Articles", href: "/insights" },
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
      <a className="brand" href="/" aria-label="VITRUS home" onClick={closeMenu}>
        <Image src="/vitrus-logo-black.png" alt="VITRUS" width={2172} height={724} priority />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        <a className="nav-cta" href="/contact">Free intro call</a>
      </nav>
      <div className="mobile-nav-actions">
        <a className="nav-cta" href="/contact" onClick={closeMenu}>Free intro call</a>
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
            <a href={item.href} key={item.href} onClick={closeMenu} ref={index === 0 ? firstMenuLink : undefined}>{item.label}</a>
          ))}
          <a className="mobile-menu-contact" href="/contact" onClick={closeMenu}>Book a free intro call</a>
        </nav>
        <p>Responsible AI systems for ambitious missions and complex work.</p>
      </div>
    </header>
  );
}
