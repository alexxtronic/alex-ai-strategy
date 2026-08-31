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
  const lines = ["AI systems for", "missions that matter."];

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
        className="hero-ambient-glow hero-ambient-glow-upper"
        animate={reduced ? undefined : { opacity: [.2, .38, .2], scale: [.94, 1.06, .94] }}
        transition={reduced ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-ambient-glow hero-ambient-glow-lower"
        animate={reduced ? undefined : { opacity: [.12, .24, .12], scale: [1.04, .96, 1.04] }}
        transition={reduced ? undefined : { duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-organic-form hero-organic-form-upper"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={reduced ? undefined : { duration: 38, repeat: Infinity, ease: "linear" }}
      >
        <span className="hero-organic-contour" />
        <span className="hero-organic-echo" />
        <i className="hero-organic-node" />
      </motion.div>
      <motion.div
        className="hero-organic-form hero-organic-form-lower"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={reduced ? undefined : { duration: 46, repeat: Infinity, ease: "linear" }}
      >
        <span className="hero-organic-contour" />
        <span className="hero-organic-echo" />
        <i className="hero-organic-node" />
      </motion.div>
    </div>
  );
}

const processSteps = [
  { number: "01", title: "Investigate", text: "We map the work, the people, the evidence, and the friction." },
  { number: "02", title: "Prioritize", text: "We rank each opportunity by mission value, capacity, feasibility, and risk." },
  { number: "03", title: "Build", text: "We connect your approved data, tools, and controls into one working system." },
  { number: "04", title: "Improve", text: "We measure adoption, value, and quality, then refine what matters." },
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

const services = [
  {
    number: "01",
    kind: "visibility",
    title: "Funder and partner intelligence",
    text: "Bring funder research, relationship context, and approved evidence into one clear view.",
  },
  {
    number: "02",
    kind: "agents",
    title: "Grant and reporting automation",
    text: "Turn requirements and approved evidence into structured, review-ready drafts.",
  },
  {
    number: "03",
    kind: "dashboard",
    title: "Live listening and decision dashboards",
    text: "Connect live signals to clear dashboards while keeping every source close.",
  },
  {
    number: "04",
    kind: "local",
    title: "Secure knowledge systems",
    text: "Give teams fast, secure access to approved policies, programs, evidence, and prior work.",
  },
  {
    number: "05",
    kind: "crm",
    title: "Workflow and CRM integration",
    text: "Connect fundraising, partnership, campaign, and operational work without removing human judgment.",
  },
];

function ServiceVisual({ kind }: { kind: string }) {
  const reduced = useReducedMotion();
  const loop = reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" as const };

  if (kind === "visibility") {
    return (
      <div className="service-visual service-visual-visibility" aria-hidden="true">
        <motion.div className="service-orbit service-orbit-outer" animate={reduced ? undefined : { rotate: 360 }} transition={reduced ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}><i /><i /><i /></motion.div>
        <motion.div className="service-orbit service-orbit-inner" animate={reduced ? undefined : { rotate: -360 }} transition={reduced ? undefined : { duration: 21, repeat: Infinity, ease: "linear" }}><i /><i /></motion.div>
        <motion.span className="service-scan" animate={reduced ? undefined : { rotate: [0, 360] }} transition={reduced ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }} />
        <span className="service-core">AI</span>
      </div>
    );
  }

  if (kind === "agents") {
    return (
      <div className="service-visual service-visual-agents" aria-hidden="true">
        <svg viewBox="0 0 460 250" role="presentation">
          <motion.path d="M38 64 H152 C185 64 181 124 214 124 H296 C327 124 322 190 356 190 H430" initial={reduced ? false : { pathLength: 0 }} animate={reduced ? undefined : { pathLength: [0, 1, 1] }} transition={{ duration: 5.6, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }} />
          <motion.path d="M152 64 V190 H236" initial={reduced ? false : { pathLength: 0 }} animate={reduced ? undefined : { pathLength: [0, 0, 1] }} transition={{ duration: 5.6, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }} />
        </svg>
        {["source", "reason", "act", "review", "branch"].map((node, index) => (
          <motion.i className={`agent-node agent-node-${node}`} key={node} animate={reduced ? undefined : { scale: [1, 1.35, 1], backgroundColor: ["#f2f0ea", "#b5942b", "#f2f0ea"] }} transition={{ duration: 2.4, repeat: Infinity, delay: index * .75, ease: "easeInOut" }} />
        ))}
      </div>
    );
  }

  if (kind === "dashboard") {
    return (
      <div className="service-visual service-visual-dashboard" aria-hidden="true">
        <div className="service-dashboard-frame">
          <div className="service-dashboard-top"><span /><span /><span /></div>
          <div className="service-bars">{[48, 74, 57, 88, 69].map((height, index) => <motion.i key={height} animate={reduced ? undefined : { height: [`${height - 18}%`, `${height}%`, `${height - 18}%`] }} transition={{ ...loop, delay: index * .22 }} />)}</div>
          <svg viewBox="0 0 300 100" role="presentation"><motion.path d="M8 78 C48 71 55 35 92 50 S151 73 184 37 S241 18 292 27" initial={reduced ? false : { pathLength: 0 }} animate={reduced ? undefined : { pathLength: [0, 1, 1] }} transition={{ duration: 5.5, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }} /></svg>
        </div>
        <div className="service-ports">{[0, 1, 2].map((port) => <motion.i key={port} animate={reduced ? undefined : { opacity: [.28, 1, .28] }} transition={{ duration: 2.6, repeat: Infinity, delay: port * .55 }} />)}</div>
      </div>
    );
  }

  if (kind === "local") {
    return (
      <div className="service-visual service-visual-local" aria-hidden="true">
        <motion.div className="local-ring local-ring-outer" animate={reduced ? undefined : { rotate: 360 }} transition={reduced ? undefined : { duration: 34, repeat: Infinity, ease: "linear" }}><i /><i /></motion.div>
        <motion.div className="local-ring local-ring-inner" animate={reduced ? undefined : { rotate: -360 }} transition={reduced ? undefined : { duration: 23, repeat: Infinity, ease: "linear" }}><i /><i /><i /></motion.div>
        <motion.div className="local-core" animate={reduced ? undefined : { boxShadow: ["0 0 0 0 rgba(181,148,43,0)", "0 0 0 18px rgba(181,148,43,.08)", "0 0 0 0 rgba(181,148,43,0)"] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}><span>LLM</span></motion.div>
        <span className="local-boundary">LOCAL</span>
      </div>
    );
  }

  return (
    <div className="service-visual service-visual-crm" aria-hidden="true">
      <svg viewBox="0 0 600 250" role="presentation">
        {["M34 48 C172 48 174 126 315 126", "M34 126 H315", "M34 204 C172 204 174 126 315 126"].map((path, index) => (
          <motion.path d={path} key={path} initial={reduced ? false : { pathLength: 0 }} animate={reduced ? undefined : { pathLength: [0, 1, 1] }} transition={{ duration: 5.5, repeat: reduced ? 0 : Infinity, delay: index * .55, ease: "easeInOut" }} />
        ))}
        <motion.path d="M315 126 H555" initial={reduced ? false : { pathLength: 0 }} animate={reduced ? undefined : { pathLength: [0, 1, 1] }} transition={{ duration: 5.5, repeat: reduced ? 0 : Infinity, delay: 1.4, ease: "easeInOut" }} />
      </svg>
      <div className="crm-sources"><i>AD</i><i>SOC</i><i>WEB</i></div>
      <motion.div className="crm-hub" animate={reduced ? undefined : { boxShadow: ["0 0 0 0 rgba(181,148,43,0)", "0 0 0 14px rgba(181,148,43,.12)", "0 0 0 0 rgba(181,148,43,0)"] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}><span>CRM</span></motion.div>
      <div className="crm-record"><span /><span /><span /></div>
    </div>
  );
}

export function ServicesGrid() {
  return (
    <div className="services-grid">
      {services.map((service, index) => (
        <Reveal className="service-card-reveal" delay={index * .06} key={service.number}>
          <article className={`service-card service-card-${service.kind}`}>
            <ServiceVisual kind={service.kind} />
            <div className="service-card-copy">
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          </article>
        </Reveal>
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
        <strong><CountUp value={81} /></strong><p>employee hours saved each week across VITRUS workflows</p><span>VITRUS workflow average</span>
      </article>
      <article className="metric-card metric-card-adoption">
        <div className="metric-visual metric-network" aria-hidden="true"><motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>{[0, 1, 2, 3, 4, 5, 6, 7].map((item) => <i key={item} />)}</motion.div></div>
        <strong><CountUp value={88} suffix="%" /></strong><p>of organizations use AI in at least one business function</p><a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai/" target="_blank" rel="noreferrer">McKinsey, State of AI 2025</a>
      </article>
      <article className="metric-card metric-card-time">
        <div className="metric-visual metric-time-rings" aria-hidden="true"><motion.i animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} /><motion.i animate={{ rotate: -360 }} transition={{ duration: 19, repeat: Infinity, ease: "linear" }} /></div>
        <strong><CountUp value={47} suffix="%" /></strong><p>of surveyed GenAI users save six or more hours each week</p><a href="https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain" target="_blank" rel="noreferrer">BCG, AI at Work 2025</a>
      </article>
    </div>
  );
}

function SentimentLoop() {
  const reduced = useReducedMotion();

  return (
    <div className="sentiment-report">
      <div><span>Live sentiment view</span><small>Evidence retained</small></div>
      <div className="sentiment-bars">
        {["58%", "25%", "17%"].map((value, itemIndex) => <motion.i key={itemIndex} initial={reduced ? false : { width: "8%" }} whileInView={reduced ? undefined : { width: value }} viewport={{ once: true, amount: .5 }} transition={{ duration: 1.2, delay: itemIndex * .15, ease: [0.16, 1, 0.3, 1] }} />)}
      </div>
      <div className="sentiment-legend"><span>Positive</span><span>Neutral</span><span>Negative</span></div>
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
    const monitors = ["Fund criteria", "Impact evidence", "Prior context", "Human review"];
    const stages = ["Requirements", "Evidence", "Draft", "Review"];
    return (
      <div className="case-art case-art-visibility dashboard-frame" aria-hidden="true">
        <div className="llm-dashboard">
          <div className="dashboard-header"><span>Grant application workspace</span><span className="dashboard-live"><i />Human review</span></div>
          <div className="dashboard-impact"><strong>01</strong><p>From fund requirements to an evidence-grounded, review-ready proposal draft.</p></div>
          <div className="monitor-grid">
            {monitors.map((label, index) => <div key={label}><span>{label}</span><motion.i initial={reduced ? false : { scaleX: .12 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: 1.1, delay: index * .14, ease: [0.16, 1, 0.3, 1] }} /></div>)}
          </div>
          <div className="monitor-feed">
            {stages.map((stage, index) => <div key={stage}><span>{String(index + 1).padStart(2, "0")}</span><b /><motion.i animate={reduced ? undefined : { scaleX: [.24, .94, .52, .24] }} transition={reduced ? undefined : { duration: 4.6 + index * .45, delay: index * .18, repeat: Infinity, ease: "easeInOut" }} /></div>)}
          </div>
        </div>
      </div>
    );
  }

  const channels = [
    { name: "Conversation", status: "Live", graph: [42, 48, 45, 54, 58, 55, 64, 69] },
    { name: "Sentiment", status: "Tracked", graph: [31, 38, 36, 43, 47, 45, 52, 56] },
    { name: "Evidence", status: "Reviewable", graph: [16, 19, 18, 23, 25, 24, 29, 33] },
  ];
  return (
    <div className="case-art case-art-intelligence report-frame" aria-hidden="true">
      <div className="report-dashboard">
        <div className="dashboard-header report-header"><span>Global Citizen social intelligence</span><span className="dashboard-live"><i />Live listening</span></div>
        <div className="channel-totals">
          {channels.map((channel, index) => <div key={channel.name}>
            <span>{channel.name}</span>
            <div className="channel-sparkline">
              <ChannelLineChart values={channel.graph} delay={index * 170} reduced={reduced} />
            </div>
            <div className="channel-total"><strong>{channel.status}</strong><small>Connected view</small></div>
          </div>)}
        </div>
        <SentimentLoop />
      </div>
    </div>
  );
}
