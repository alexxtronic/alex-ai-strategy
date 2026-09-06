"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids Vinext client-router interception failures. */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { solutionLinks } from "../solutions/content";

const navigation = [
  { label: "Process", href: "/#process" },
  { label: "Proof", href: "/#work" },
  { label: "Articles", href: "/insights" },
  { label: "ROI calculator", href: "/ai-roi-calculator" },
];

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);
  const solutionsButton = useRef<HTMLButtonElement>(null);
  const solutionsMenu = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!solutionsOpen) return;
    const closeOnPointer = (event: PointerEvent) => {
      if (!solutionsMenu.current?.contains(event.target as Node)) setSolutionsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSolutionsOpen(false);
      solutionsButton.current?.focus();
    };
    document.addEventListener("pointerdown", closeOnPointer);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [solutionsOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setSolutionsOpen(false);
  };

  return (
    <header className={`site-header${compact ? " site-header-compact" : ""}`}>
      <a className="brand" href="/" aria-label="VITRUS home" onClick={closeMenu}>
        <Image src="/vitrus-logo-black.png" alt="VITRUS" width={2172} height={724} priority />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <div className="solutions-dropdown" ref={solutionsMenu}>
          <button
            ref={solutionsButton}
            type="button"
            aria-expanded={solutionsOpen}
            aria-controls="solutions-menu"
            onClick={() => setSolutionsOpen((open) => !open)}
          >
            Solutions <span aria-hidden="true">{solutionsOpen ? "−" : "+"}</span>
          </button>
          <div className={`solutions-menu${solutionsOpen ? " is-open" : ""}`} id="solutions-menu">
            <span>Applied AI systems</span>
            {solutionLinks.map((solution) => (
              <a
                href={`/solutions/${solution.slug}`}
                key={solution.slug}
                onClick={() => setSolutionsOpen(false)}
                data-analytics-event="solution_select"
                data-analytics-solution-slug={solution.slug}
                data-analytics-placement="header_dropdown"
              >
                <strong>{solution.shortTitle}</strong>
                <small>{solution.menuText}</small>
              </a>
            ))}
          </div>
        </div>
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        <a className="nav-cta" href="/contact" data-analytics-event="cta_click" data-analytics-cta-id="header_intro" data-analytics-placement="header">Request a free intro call</a>
      </nav>
      <div className="mobile-nav-actions">
        <a className="nav-cta" href="/contact" onClick={closeMenu} data-analytics-event="cta_click" data-analytics-cta-id="mobile_header_intro" data-analytics-placement="mobile_header">Free intro call</a>
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
          <span className="mobile-menu-label">Solutions</span>
          {solutionLinks.map((solution, index) => (
            <a className="mobile-solution-link" href={`/solutions/${solution.slug}`} key={solution.slug} onClick={closeMenu} ref={index === 0 ? firstMenuLink : undefined} data-analytics-event="solution_select" data-analytics-solution-slug={solution.slug} data-analytics-placement="mobile_menu">{solution.shortTitle}</a>
          ))}
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="mobile-menu-contact" href="/contact" onClick={closeMenu} data-analytics-event="cta_click" data-analytics-cta-id="mobile_menu_intro" data-analytics-placement="mobile_menu">Request a free intro call</a>
        </nav>
        <p>Responsible AI systems for ambitious missions and complex work.</p>
      </div>
    </header>
  );
}
