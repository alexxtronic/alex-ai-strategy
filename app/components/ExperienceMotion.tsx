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
  const morph = [
    "46% 54% 58% 42% / 48% 42% 58% 52%",
    "58% 42% 44% 56% / 40% 56% 44% 60%",
    "42% 58% 52% 48% / 58% 44% 56% 42%",
    "46% 54% 58% 42% / 48% 42% 58% 52%",
  ];

  return (
    <div className="hero-cloud" aria-hidden="true">
      <motion.span
        className="cloud-shape cloud-shape-one"
        animate={reduced ? undefined : { x: ["-8vw", "8vw", "-3vw", "-8vw"], y: ["2vh", "-6vh", "5vh", "2vh"], rotate: [-5, 7, -2, -5], scale: [.92, 1.08, .98, .92], borderRadius: morph }}
        transition={reduced ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="cloud-shape cloud-shape-two"
        animate={reduced ? undefined : { x: ["7vw", "-9vw", "4vw", "7vw"], y: ["-3vh", "5vh", "-5vh", "-3vh"], rotate: [6, -8, 3, 6], scale: [1.06, .9, 1.04, 1.06], borderRadius: [...morph].reverse() }}
        transition={reduced ? undefined : { duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="cloud-shape cloud-shape-three"
        animate={reduced ? undefined : { x: ["-4vw", "9vw", "-7vw", "-4vw"], y: ["5vh", "-4vh", "2vh", "5vh"], rotate: [-8, 10, -4, -8], scale: [.96, 1.13, .9, .96], borderRadius: morph }}
        transition={reduced ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const processSteps = [
  { number: "01", title: "Listen", text: "We learn how the work really happens, not how the slide deck says it happens." },
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

  return <span ref={ref}>{(reduced ? value : current).toLocaleString("en-US")}{suffix}</span>;
}

export function AnimatedStatistics() {
  return (
    <div className="statistics-grid">
      <article className="metric-card metric-card-hours">
        <div className="metric-visual metric-workflow" aria-hidden="true">{[.36, .68, .48, .82, .57, .94].map((scale, index) => <motion.i key={index} animate={{ scaleX: [scale, 1, scale] }} transition={{ duration: 4.2 + index * .35, repeat: Infinity, ease: "easeInOut", delay: index * .16 }} />)}</div>
        <strong><CountUp value={81} /></strong><p>average employee hours saved each week by automations we’ve built</p><span>VITRUS workflow averages</span>
      </article>
      <article className="metric-card metric-card-adoption">
        <div className="metric-visual metric-network" aria-hidden="true"><motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>{[0, 1, 2, 3, 4, 5, 6, 7].map((item) => <i key={item} />)}</motion.div></div>
        <strong><CountUp value={88} suffix="%" /></strong><p>of organizations report regular AI use in at least one business function</p><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai/" target="_blank" rel="noreferrer">McKinsey, State of AI 2025</a>
      </article>
      <article className="metric-card metric-card-time">
        <div className="metric-visual metric-time-rings" aria-hidden="true"><motion.i animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} /><motion.i animate={{ rotate: -360 }} transition={{ duration: 19, repeat: Infinity, ease: "linear" }} /></div>
        <strong><CountUp value={47} suffix="%" /></strong><p>of surveyed GenAI users save at least six hours every week</p><a href="https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain" target="_blank" rel="noreferrer">BCG, AI at Work 2025</a>
      </article>
    </div>
  );
}

const sentimentStates = [
  { positive: 68, neutral: 22, negative: 10 },
  { positive: 72, neutral: 20, negative: 8 },
  { positive: 65, neutral: 24, negative: 11 },
  { positive: 70, neutral: 21, negative: 9 },
];

function SentimentLoop() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const sentiment = sentimentStates[index];

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % sentimentStates.length), 4200);
    return () => window.clearInterval(interval);
  }, [reduced]);

  const values = [sentiment.positive, sentiment.neutral, sentiment.negative];

  return (
    <div className="sentiment-report">
      <div><span>User sentiment</span><motion.strong key={sentiment.positive} initial={reduced ? false : { opacity: .45, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>{sentiment.positive}%</motion.strong><small>Positive</small></div>
      <div className="sentiment-bars">
        {values.map((value, itemIndex) => <motion.i key={itemIndex} animate={{ width: `${value}%` }} transition={{ duration: reduced ? 0 : 3.2, ease: [0.16, 1, 0.3, 1] }} />)}
      </div>
      <div className="sentiment-legend"><span>Positive {sentiment.positive}%</span><span>Neutral {sentiment.neutral}%</span><span>Negative {sentiment.negative}%</span></div>
    </div>
  );
}

export function CaseStudyVisual({ variant }: { variant: "visibility" | "intelligence" }) {
  const reduced = useReducedMotion();

  if (variant === "visibility") {
    const monitors = ["Model coverage", "Prompt groups", "Mention analysis", "Evidence log"];
    return (
      <div className="case-art case-art-visibility dashboard-frame" aria-hidden="true">
        <div className="llm-dashboard">
          <div className="dashboard-header"><span>AI visibility monitor</span><span className="dashboard-live"><i />Automatic</span></div>
          <div className="dashboard-impact"><strong><CountUp value={3449} /></strong><p>hours saved through automatic LLM monitoring</p></div>
          <div className="monitor-grid">
            {monitors.map((label, index) => <div key={label}><span>{label}</span><motion.i initial={reduced ? false : { scaleX: .12 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: 1.1, delay: index * .14, ease: [0.16, 1, 0.3, 1] }} /></div>)}
          </div>
          <div className="monitor-feed">
            {["01", "02", "03", "04"].map((item, index) => <div key={item}><span>{item}</span><b /><motion.i animate={reduced ? undefined : { scaleX: [.24, .94, .52, .24] }} transition={reduced ? undefined : { duration: 4.6 + index * .45, delay: index * .18, repeat: Infinity, ease: "easeInOut" }} /></div>)}
          </div>
        </div>
        <motion.div className="dashboard-scan" animate={reduced ? undefined : { y: [0, 430, 0] }} transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    );
  }

  const channels = [
    { name: "Facebook", value: 842, graph: [{ bottom: 18, rotate: -14 }, { bottom: 30, rotate: 9 }, { bottom: 24, rotate: -18 }, { bottom: 40, rotate: 7 }, { bottom: 36, rotate: -11 }] },
    { name: "Instagram", value: 516, graph: [{ bottom: 36, rotate: 12 }, { bottom: 27, rotate: -17 }, { bottom: 41, rotate: 10 }, { bottom: 34, rotate: -20 }, { bottom: 51, rotate: 6 }] },
    { name: "Blog", value: 227, graph: [{ bottom: 17, rotate: -9 }, { bottom: 24, rotate: 6 }, { bottom: 20, rotate: -13 }, { bottom: 31, rotate: 8 }, { bottom: 26, rotate: -16 }] },
  ];
  return (
    <div className="case-art case-art-intelligence report-frame" aria-hidden="true">
      <div className="report-dashboard">
        <div className="dashboard-header report-header"><span>Illustrative reporting view</span><span className="dashboard-live"><i />Monitoring</span></div>
        <div className="channel-totals">
          {channels.map((channel, index) => <div key={channel.name}>
            <span>{channel.name}</span>
            <div className="channel-sparkline">
              {channel.graph.map((segment, segmentIndex) => <motion.i key={segmentIndex} style={{ left: `${segmentIndex * 19}%`, bottom: `${segment.bottom}%`, width: "23%", rotate: segment.rotate }} initial={reduced ? false : { scaleX: 0 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .7, delay: index * .16 + segmentIndex * .1, ease: [0.16, 1, 0.3, 1] }} />)}
            </div>
            <div className="channel-total"><strong>{channel.value.toLocaleString("en-US")}</strong><small>Total mentions</small></div>
          </div>)}
        </div>
        <SentimentLoop />
      </div>
    </div>
  );
}
