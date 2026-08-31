import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-wordmark" href="/">VITRUS</Link>
      <div className="footer-positioning"><span>Responsible AI, built for real work</span><p>We help mission-driven teams return capacity and deliver more.</p></div>
      <nav className="footer-nav" aria-label="Footer navigation"><Link href="/#process">Process</Link><Link href="/#proof">Proof</Link><Link href="/#work">Case studies</Link><Link href="/#team">Team</Link><Link href="/insights">Articles</Link><Link href="/ai-roi-calculator">ROI calculator</Link></nav>
      <div className="footer-meta"><span>© 2026 VITRUS</span><Link href="/privacy">Privacy</Link></div>
    </footer>
  );
}
