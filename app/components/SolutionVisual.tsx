"use client";

import { motion, useReducedMotion } from "motion/react";

const visualContent = {
  grants: {
    label: "Evidence to approved draft",
    nodes: ["Requirement", "Evidence", "Draft", "Review"],
  },
  intelligence: {
    label: "Signals to next action",
    nodes: ["CRM", "Research", "Priority", "Brief"],
  },
  listening: {
    label: "Live signals to decisions",
    nodes: ["Sources", "Themes", "Dashboard", "Action"],
  },
  knowledge: {
    label: "Approved knowledge to trusted answer",
    nodes: ["Sources", "Permissions", "Answer", "Escalate"],
  },
} as const;

export function SolutionVisual({ variant }: { variant: keyof typeof visualContent }) {
  const reduced = useReducedMotion();
  const content = visualContent[variant];

  return (
    <div className={`solution-system-visual solution-system-${variant}`} aria-hidden="true">
      <div className="solution-system-head">
        <span>{content.label}</span>
        <i>VITRUS SYSTEM</i>
      </div>
      <div className="solution-system-map">
        <div className="solution-system-line">
          <motion.span
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        {content.nodes.map((node, index) => (
          <motion.div
            className="solution-system-node"
            key={node}
            initial={reduced ? false : { opacity: 0.35, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.25 + index * 0.22 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{node}</strong>
            <motion.i
              animate={reduced ? undefined : { boxShadow: ["0 0 0 0 rgba(181,148,43,0)", "0 0 0 12px rgba(181,148,43,.1)", "0 0 0 0 rgba(181,148,43,0)"] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.7, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>
      <div className="solution-system-foot"><span>AI</span><span>CRM</span><span>MARTECH</span><span>HUMAN REVIEW</span></div>
    </div>
  );
}
