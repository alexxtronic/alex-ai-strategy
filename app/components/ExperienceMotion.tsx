"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";

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

export function HeroOrb() {
  const reduced = useReducedMotion();

  return (
    <div className="hero-orb" aria-hidden="true">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <motion.div
        className="hero-blob"
        animate={reduced ? undefined : {
          rotate: 360,
          borderRadius: ["43% 57% 68% 32% / 48% 35% 65% 52%", "66% 34% 38% 62% / 35% 58% 42% 65%", "43% 57% 68% 32% / 48% 35% 65% 52%"],
        }}
        transition={reduced ? undefined : { rotate: { duration: 24, repeat: Infinity, ease: "linear" }, borderRadius: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}
      >
        <span />
      </motion.div>
      <motion.div className="hero-moon" animate={reduced ? undefined : { rotate: -360 }} transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}>
        <span />
      </motion.div>
    </div>
  );
}

const valueSteps = [
  { title: "Find it", text: "We get close to the work and spot the friction worth fixing.", note: "Opportunity" },
  { title: "Prove it", text: "We turn instinct into a business case people can believe in.", note: "Confidence" },
  { title: "Build it", text: "We make the useful thing, connect it, and help your team own it.", note: "Momentum" },
];

export function ValueSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(Math.min(2, Math.floor(latest * 3)));
  });

  return (
    <section className="value-sequence" ref={ref} aria-labelledby="value-sequence-title">
      <div className="value-sequence-sticky">
        <div className="value-sequence-head">
          <h2 id="value-sequence-title">Find it.<br />Prove it.<br />Build it.</h2>
          <p>One idea, moving from possibility to something your business can actually use.</p>
        </div>
        <div className="value-stage" aria-hidden="true">
          <div className="value-track" />
          <motion.div
            className="value-orb"
            animate={reduced ? undefined : {
              left: `${10 + active * 40}%`,
              rotate: active * 150,
              scale: [1, 1.08, 1],
              borderRadius: active === 0 ? "50%" : active === 1 ? "36% 64% 58% 42% / 61% 42% 58% 39%" : "18%",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{active + 1}</span>
          </motion.div>
          {valueSteps.map((step, index) => <span className={`value-node${index === active ? " active" : ""}`} style={{ left: `${10 + index * 40}%` }} key={step.title} />)}
        </div>
        <div className="value-steps">
          {valueSteps.map((step, index) => (
            <motion.article className={index === active ? "active" : ""} animate={{ opacity: index === active ? 1 : 0.28, y: index === active ? 0 : 10 }} key={step.title}>
              <span>{step.note}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const integrationSteps = [
  { number: "01", title: "Listen", text: "We sit with the people who know the work, map the messy bits, and find the opportunity hiding in plain sight.", output: "A sharper problem" },
  { number: "02", title: "Shape", text: "We pressure-test value, data, risk, and adoption before anyone falls in love with the technology.", output: "A credible case" },
  { number: "03", title: "Integrate", text: "We build around your systems and safeguards, so the solution feels native to the business—not bolted on.", output: "A working system" },
  { number: "04", title: "Evolve", text: "We watch how it performs in the real world, learn from your team, and keep turning useful into indispensable.", output: "Compounding value" },
];

export function IntegrationTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => setActive(Math.min(3, Math.floor(latest * 4))));

  return (
    <div className="integration-timeline" ref={ref}>
      <div className="timeline-rail" aria-hidden="true"><motion.span style={{ scaleY: progress }} /></div>
      {integrationSteps.map((step, index) => (
        <motion.article className={`integration-step${index <= active ? " active" : ""}`} key={step.number}>
          <span className="integration-number">{step.number}</span>
          <div><h3>{step.title}</h3><p>{step.text}</p></div>
          <strong>{step.output}</strong>
        </motion.article>
      ))}
    </div>
  );
}

export function DataBars() {
  const reduced = useReducedMotion();
  const values = [24, 41, 35, 58, 52, 73, 82];

  return (
    <div className="data-bars" aria-hidden="true">
      {values.map((value, index) => (
        <motion.span
          key={value}
          initial={reduced ? false : { scaleY: 0 }}
          whileInView={reduced ? undefined : { scaleY: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: `${value}%` }}
        />
      ))}
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
