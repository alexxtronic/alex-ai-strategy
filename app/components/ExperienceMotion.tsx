"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 38 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HeroTitle() {
  const reduced = useReducedMotion();
  const lines = ["We’re your next", "AI Strategy Partner"];

  return (
    <h1 id="hero-title">
      {lines.map((line, index) => (
        <span className="hero-title-line" key={line}>
          <motion.span
            initial={reduced ? false : { y: "115%", rotate: 1.5 }}
            animate={reduced ? undefined : { y: 0, rotate: 0 }}
            transition={{ duration: 1.15, delay: 0.12 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function HeroCloud() {
  const reduced = useReducedMotion();

  return (
    <div className="hero-cloud" aria-hidden="true">
      <motion.span
        className="cloud-shape cloud-shape-one"
        animate={reduced ? undefined : { x: [0, 34, -18, 0], y: [0, -18, 22, 0], scale: [1, 1.08, .96, 1] }}
        transition={reduced ? undefined : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="cloud-shape cloud-shape-two"
        animate={reduced ? undefined : { x: [0, -30, 16, 0], y: [0, 24, -12, 0], scale: [1, .94, 1.06, 1] }}
        transition={reduced ? undefined : { duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="cloud-shape cloud-shape-three"
        animate={reduced ? undefined : { rotate: [0, 18, -12, 0], scale: [1, 1.12, 1] }}
        transition={reduced ? undefined : { duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const processSteps = [
  { number: "01", title: "Listen", text: "We learn how the work really happens—not how the slide deck says it happens." },
  { number: "02", title: "Locate", text: "We find the moments where AI can create the biggest gain in time, quality, or growth." },
  { number: "03", title: "Build", text: "We create and connect a solution around your systems, data, and people." },
  { number: "04", title: "Improve", text: "We measure what changes, learn from use, and keep making the system more valuable." },
];

export function ProcessSystem() {
  const reduced = useReducedMotion();

  return (
    <div className="process-system">
      <div className="process-line" aria-hidden="true">
        <motion.span initial={reduced ? false : { scaleX: 0 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true, amount: .55 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
      </div>
      {processSteps.map((step, index) => (
        <motion.article
          key={step.number}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .45 }}
          transition={{ duration: .7, delay: .2 + index * .11, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="process-node">{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: .7 });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (reduced) return;
    let frame = 0;
    const started = performance.now();
    const tick = (time: number) => {
      const progress = Math.min(1, (time - started) / 1350);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, value, visible]);

  return <span ref={ref}>{reduced ? value : current}{suffix}</span>;
}

export function AnimatedStatistics() {
  return (
    <div className="statistics-grid">
      <article><strong><CountUp value={1} suffix="+" /></strong><p>hour saved per day by 47% of surveyed people using GenAI at work</p><a href="https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain" target="_blank" rel="noreferrer">BCG, AI at Work 2025</a></article>
      <article><strong><CountUp value={1} suffix="%" /></strong><p>of executives describe their company’s GenAI rollout as mature</p><a href="https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work" target="_blank" rel="noreferrer">McKinsey, 2025</a></article>
      <article><strong><CountUp value={52} /></strong><p>combined years of experience across the VITRUS team</p><span>One senior team throughout</span></article>
    </div>
  );
}

export function CaseStudyVisual({ variant }: { variant: "visibility" | "intelligence" }) {
  const reduced = useReducedMotion();

  if (variant === "visibility") {
    return (
      <div className="case-art case-art-visibility" aria-hidden="true">
        <motion.div className="case-orbit case-orbit-outer" animate={reduced ? undefined : { rotate: 360 }} transition={reduced ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}>
          {[0, 1, 2, 3, 4].map((item) => <span key={item} />)}
        </motion.div>
        <motion.div className="case-orbit case-orbit-inner" animate={reduced ? undefined : { rotate: -360 }} transition={reduced ? undefined : { duration: 19, repeat: Infinity, ease: "linear" }}>
          {[0, 1, 2].map((item) => <span key={item} />)}
        </motion.div>
        <motion.div className="case-art-core" whileHover={reduced ? undefined : { scale: 1.08, rotate: 8 }} transition={{ duration: 0.5 }}><span>1K</span></motion.div>
      </div>
    );
  }

  const heights = [38, 57, 47, 72, 61, 84, 68, 92];
  return (
    <div className="case-art case-art-intelligence" aria-hidden="true">
      <div className="case-wave">
        {heights.map((height, index) => (
          <motion.span
            key={`${height}-${index}`}
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={reduced ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <motion.div className="case-scan" animate={reduced ? undefined : { y: [0, 250, 0] }} transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <div className="case-evidence-chip"><span />Evidence stays attached</div>
    </div>
  );
}
