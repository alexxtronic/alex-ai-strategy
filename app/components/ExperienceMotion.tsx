"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

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

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -1000, y: -1000 };
    const nodes = Array.from({ length: 24 }, (_, index) => ({
      x: (index * 0.61803398875) % 1,
      y: (index * 0.38196601125 + 0.13) % 1,
      phase: index * 0.63,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const leave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const points = nodes.map((node) => {
        const drift = reduced ? 0 : time * 0.00012;
        return {
          x: node.x * width + Math.sin(node.phase + drift * 8) * 12,
          y: node.y * height + Math.cos(node.phase * 1.4 + drift * 7) * 10,
        };
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance < 145) {
            context.beginPath();
            context.moveTo(points[i].x, points[i].y);
            context.lineTo(points[j].x, points[j].y);
            context.strokeStyle = `rgba(17,17,15,${(1 - distance / 145) * 0.2})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }

      points.forEach((point, index) => {
        const proximity = Math.max(0, 1 - Math.hypot(point.x - pointer.x, point.y - pointer.y) / 180);
        context.beginPath();
        context.arc(point.x, point.y, 1.8 + proximity * 3.8, 0, Math.PI * 2);
        context.fillStyle = index % 7 === 0 ? "#b5942b" : `rgba(17,17,15,${0.42 + proximity * 0.5})`;
        context.fill();
      });

      if (!reduced) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);

  return (
    <div className="signal-field" aria-hidden="true">
      <canvas ref={canvasRef} />
      <motion.div
        className="signal-core"
        drag={!reduced}
        dragConstraints={{ left: -100, right: 100, top: -65, bottom: 65 }}
        dragElastic={0.12}
        whileHover={reduced ? undefined : { scale: 1.14 }}
      />
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
