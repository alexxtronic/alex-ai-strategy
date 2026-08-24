"use client";

import Image from "next/image";
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
    <div className="hero-cloud hero-future-field" aria-hidden="true">
      <motion.div
        className="corner-signals corner-signals-upper"
        animate={reduced ? undefined : { rotate: [-2, 3, -2] }}
        transition={reduced ? undefined : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <span />
        <span />
        <span />
        <span />
        <motion.i
          className="corner-signal-node"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <motion.div
        className="corner-signals corner-signals-lower"
        animate={reduced ? undefined : { rotate: [2, -3, 2] }}
        transition={reduced ? undefined : { duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <span />
        <span />
        <span />
        <span />
        <motion.i
          className="corner-signal-node"
          animate={reduced ? undefined : { rotate: -360 }}
          transition={reduced ? undefined : { duration: 31, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}

const processSteps = [
  { number: "01", title: "Listen", text: "We map the workflow, economics, owners, data, and friction before recommending a tool." },
  { number: "02", title: "Locate", text: "We rank opportunities by value, feasibility, risk, and readiness, then agree where to start." },
  { number: "03", title: "Build", text: "We design and integrate the system across your existing data, tools, and controls." },
  { number: "04", title: "Improve", text: "We track adoption and value, review outputs, and improve the system with your team." },
];

export function ProcessSystem() {
  const reduced = useReducedMotion();
  const processRef = useRef<HTMLDivElement>(null);
  const visible = useInView(processRef, { amount: .35 });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!visible || reduced) return;

    const start = window.setTimeout(() => setActiveStep(0), 0);
    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % processSteps.length);
    }, 2000);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [reduced, visible]);

  return (
    <div className="process-system" ref={processRef}>
      <div className="process-line" aria-hidden="true">
        <motion.span animate={reduced ? undefined : { x: `${Math.max(activeStep, 0) * 100}%`, scaleX: activeStep >= 0 ? 1 : 0 }} transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }} />
      </div>
      {processSteps.map((step, index) => {
        const active = activeStep === index;

        return (
          <motion.article
            key={step.number}
            aria-current={active ? "step" : undefined}
            animate={reduced ? undefined : { opacity: 1, y: active ? -9 : 0 }}
            transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="process-node"
              animate={reduced ? undefined : active ? { scale: 1.22, backgroundColor: "#b5942b", borderColor: "#b5942b", boxShadow: "0 14px 32px rgba(181,148,43,.3)" } : { scale: 1, backgroundColor: "#f2f0ea", borderColor: "#11110f", boxShadow: "0 0 0 rgba(181,148,43,0)" }}
              transition={{ duration: .45, ease: [0.16, 1, 0.3, 1] }}
            >
              {step.number}
            </motion.span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.article>
        );
      })}
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

function ChannelLineChart({ values, delay, reduced }: { values: number[]; delay: number; reduced: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;
    let progress = reduced ? 1 : 0;
    const started = performance.now() + delay;

    const draw = (amount: number) => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.clearRect(0, 0, width, height);

      const padding = { top: 7, right: 7, bottom: 11, left: 8 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const maximum = Math.max(...values) * 1.16;
      const points = values.map((value, index) => ({
        x: padding.left + (index / (values.length - 1)) * chartWidth,
        y: padding.top + chartHeight - (value / maximum) * chartHeight,
      }));

      context.lineWidth = 1;
      context.strokeStyle = "rgba(17,17,15,.1)";
      for (let index = 0; index <= 3; index += 1) {
        const y = padding.top + (index / 3) * chartHeight;
        context.beginPath();
        context.moveTo(padding.left, y);
        context.lineTo(width - padding.right, y);
        context.stroke();
      }

      context.strokeStyle = "rgba(17,17,15,.2)";
      context.beginPath();
      context.moveTo(padding.left, padding.top);
      context.lineTo(padding.left, height - padding.bottom);
      context.lineTo(width - padding.right, height - padding.bottom);
      context.stroke();

      for (const point of points) {
        context.beginPath();
        context.moveTo(point.x, height - padding.bottom);
        context.lineTo(point.x, height - padding.bottom + 3);
        context.stroke();
      }

      const segmentProgress = amount * (points.length - 1);
      const completeSegments = Math.floor(segmentProgress);
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let index = 1; index <= completeSegments; index += 1) {
        context.lineTo(points[index].x, points[index].y);
      }
      if (completeSegments < points.length - 1) {
        const fraction = segmentProgress - completeSegments;
        const start = points[completeSegments];
        const end = points[completeSegments + 1];
        context.lineTo(start.x + (end.x - start.x) * fraction, start.y + (end.y - start.y) * fraction);
      }
      context.lineWidth = 2;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.strokeStyle = "#b5942b";
      context.stroke();

      const visiblePoints = Math.min(points.length - 1, completeSegments);
      for (let index = 0; index <= visiblePoints; index += 1) {
        const point = points[index];
        context.beginPath();
        context.arc(point.x, point.y, 2.7, 0, Math.PI * 2);
        context.fillStyle = "#11110f";
        context.fill();
        context.lineWidth = 1.2;
        context.strokeStyle = "#faf8f3";
        context.stroke();
      }
    };

    const tick = (time: number) => {
      const raw = Math.max(0, Math.min(1, (time - started) / 1100));
      progress = reduced ? 1 : 1 - Math.pow(1 - raw, 3);
      draw(progress);
      if (raw < 1 && !reduced) frame = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(() => draw(progress));
    observer.observe(canvas);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [delay, reduced, values]);

  return <canvas className="channel-line-chart" ref={canvasRef} />;
}

export function CaseStudyVisual({ variant }: { variant: "visibility" | "intelligence" }) {
  const reduced = useReducedMotion();

  if (variant === "visibility") {
    const monitors = ["Model coverage", "Prompt groups", "Mention analysis", "Evidence log"];
    const models = [
      { name: "ChatGPT", icon: "/llm/chatgpt.svg" },
      { name: "Claude", icon: "/llm/claude.svg" },
      { name: "Gemini", icon: "/llm/gemini.svg" },
      { name: "Perplexity", icon: "/llm/perplexity.svg" },
    ];
    return (
      <div className="case-art case-art-visibility dashboard-frame" aria-hidden="true">
        <div className="llm-dashboard">
          <div className="dashboard-header"><span>AI visibility monitor</span><span className="dashboard-live"><i />Automatic</span></div>
          <div className="dashboard-impact"><strong><CountUp value={3449} /></strong><p>hours saved through automatic LLM monitoring</p></div>
          <div className="monitor-grid">
            {monitors.map((label, index) => <div key={label}><span>{label}</span><motion.i initial={reduced ? false : { scaleX: .12 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: 1.1, delay: index * .14, ease: [0.16, 1, 0.3, 1] }} /></div>)}
          </div>
          <div className="monitor-feed">
            {models.map((model, index) => <div key={model.name}><span className="llm-monitor-logo"><Image src={model.icon} alt="" width={18} height={18} /></span><b /><motion.i animate={reduced ? undefined : { scaleX: [.24, .94, .52, .24] }} transition={reduced ? undefined : { duration: 4.6 + index * .45, delay: index * .18, repeat: Infinity, ease: "easeInOut" }} /></div>)}
          </div>
        </div>
      </div>
    );
  }

  const channels = [
    { name: "Facebook", value: 842, graph: [42, 48, 45, 54, 58, 55, 64, 69] },
    { name: "Instagram", value: 516, graph: [31, 38, 36, 43, 47, 45, 52, 56] },
    { name: "Blog", value: 227, graph: [16, 19, 18, 23, 25, 24, 29, 33] },
  ];
  return (
    <div className="case-art case-art-intelligence report-frame" aria-hidden="true">
      <div className="report-dashboard">
        <div className="dashboard-header report-header"><span>Illustrative reporting view</span><span className="dashboard-live"><i />Monitoring</span></div>
        <div className="channel-totals">
          {channels.map((channel, index) => <div key={channel.name}>
            <span>{channel.name}</span>
            <div className="channel-sparkline">
              <ChannelLineChart values={channel.graph} delay={index * 170} reduced={reduced} />
            </div>
            <div className="channel-total"><strong>{channel.value.toLocaleString("en-US")}</strong><small>Total mentions</small></div>
          </div>)}
        </div>
        <SentimentLoop />
      </div>
    </div>
  );
}
