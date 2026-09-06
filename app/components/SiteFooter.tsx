import Link from "next/link";
import { solutionLinks } from "../solutions/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-wordmark" href="/">VITRUS</Link>
      <div className="footer-positioning"><span>Responsible AI, built for real work</span><p>We help mission-driven teams return capacity and deliver more.</p></div>
      <nav className="footer-nav" aria-label="Footer navigation"><Link href="/#process">Process</Link><Link href="/#work">Proof</Link><Link href="/#team">Team</Link><Link href="/insights">Articles</Link><Link href="/ai-roi-calculator">ROI calculator</Link></nav>
      <nav className="footer-solutions" aria-label="Solution navigation"><span>Solutions</span>{solutionLinks.map((solution) => <Link href={`/solutions/${solution.slug}`} key={solution.slug} data-analytics-event="solution_select" data-analytics-solution-slug={solution.slug} data-analytics-placement="footer">{solution.shortTitle}</Link>)}</nav>
      <div className="footer-meta"><span>© 2026 VITRUS</span><Link href="/privacy">Privacy</Link></div>
    </footer>
  );
}
