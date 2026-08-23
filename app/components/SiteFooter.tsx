import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-wordmark" href="/">VITRUS</Link>
      <div className="footer-positioning"><span>AI strategy and implementation</span><p>We find the opportunity, prove the case, and build what matters.</p></div>
      <div className="footer-nav"><Link href="/#approach">Approach</Link><Link href="/#capabilities">Capabilities</Link><Link href="/#work">Work</Link><Link href="/ai-roi-calculator">ROI calculator</Link></div>
      <div className="footer-meta"><span>© 2026 VITRUS</span><Link href="/privacy">Privacy</Link></div>
    </footer>
  );
}
