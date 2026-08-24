"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const WORKING_WEEKS = 48;

const workflows = [
  { name: "Recurring reporting", automation: 0.75, complexity: "Moderate", maintenance: "Light", realization: 0.8 },
  { name: "Enquiry handling", automation: 0.65, complexity: "Moderate", maintenance: "Moderate", realization: 0.8 },
  { name: "Knowledge retrieval", automation: 0.7, complexity: "Moderate", maintenance: "Light", realization: 0.8 },
  { name: "Document processing", automation: 0.8, complexity: "High", maintenance: "Moderate", realization: 0.8 },
  { name: "CRM & data entry", automation: 0.75, complexity: "Moderate", maintenance: "Moderate", realization: 0.8 },
  { name: "Meeting follow-up", automation: 0.7, complexity: "Low", maintenance: "Light", realization: 0.8 },
  { name: "Internal research", automation: 0.6, complexity: "Moderate", maintenance: "Light", realization: 0.8 },
  { name: "Custom / other", automation: 0.6, complexity: "To assess", maintenance: "To assess", realization: 0.8 },
] as const;

const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 });

function AnimatedNumber({ value, format }: { value: number; format: (value: number) => string }) {
  const reduced = useReducedMotion();
  const previous = useRef(value);
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const startValue = previous.current;
    previous.current = value;

    if (reduced || startValue === value) {
      setDisplayed(value);
      return;
    }

    let frame = 0;
    const started = performance.now();
    const tick = (time: number) => {
      const progress = Math.min(1, (time - started) / 420);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(startValue + (value - startValue) * eased);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduced, value]);

  return <>{format(displayed)}</>;
}

export function RoiCalculator() {
  const [workflowName, setWorkflowName] = useState<(typeof workflows)[number]["name"]>("Recurring reporting");
  const [employees, setEmployees] = useState(6);
  const [hoursPerEmployee, setHoursPerEmployee] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(60);

  const result = useMemo(() => {
    const workflow = workflows.find((item) => item.name === workflowName) ?? workflows[0];
    const totalWeeklyHours = employees * hoursPerEmployee;
    const currentAnnualCost = totalWeeklyHours * hourlyCost * WORKING_WEEKS;
    const automatableWeeklyHours = totalWeeklyHours * workflow.automation;
    const realizedWeeklyHours = automatableWeeklyHours * workflow.realization;
    const annualHoursRecovered = realizedWeeklyHours * WORKING_WEEKS;
    const annualSavings = annualHoursRecovered * hourlyCost;

    return { annualSavings, realizedWeeklyHours, annualHoursRecovered, currentAnnualCost };
  }, [employees, hourlyCost, hoursPerEmployee, workflowName]);

  return (
    <section className="roi-tool" aria-labelledby="roi-title">
      <div className="roi-tool-inputs">
        <div className="roi-tool-heading">
          <h1 id="roi-title">What could AI save your business?</h1>
          <p>Estimate the annual value of automating one repetitive workflow.</p>
        </div>

        <div className="roi-fields">
          <label className="roi-field">
            <span className="roi-field-number">01</span>
            <span className="roi-field-copy"><b>What do you want to automate?</b><small>Choose one recurring workflow</small></span>
            <select value={workflowName} onChange={(event) => setWorkflowName(event.target.value as (typeof workflows)[number]["name"])}>
              {workflows.map((workflow) => <option key={workflow.name}>{workflow.name}</option>)}
            </select>
          </label>

          <label className="roi-field">
            <span className="roi-field-number">02</span>
            <span className="roi-field-copy"><b>Employees doing this work</b><small>People who regularly complete this task</small></span>
            <span className="roi-number-input"><input aria-label="Employees doing this work" type="number" min="1" max="500" value={employees} onChange={(event) => setEmployees(Math.min(500, Math.max(1, Number(event.target.value) || 1)))} /><i>people</i></span>
          </label>

          <label className="roi-field roi-field-slider">
            <span className="roi-field-number">03</span>
            <span className="roi-field-copy"><b>Hours each employee spends per week</b><small>Per employee, not the whole team</small></span>
            <output>{hoursPerEmployee} {hoursPerEmployee === 1 ? "hour" : "hours"} / week</output>
            <input aria-label="Hours each employee spends per week" type="range" min="1" max="40" step="1" value={hoursPerEmployee} onChange={(event) => setHoursPerEmployee(Number(event.target.value))} />
          </label>

          <label className="roi-field">
            <span className="roi-field-number">04</span>
            <span className="roi-field-copy"><b>Average employee cost</b><small>Salary, benefits, and overhead per hour</small></span>
            <select value={hourlyCost} onChange={(event) => setHourlyCost(Number(event.target.value))}>
              <option value="30">€30 / hour</option>
              <option value="50">€50 / hour</option>
              <option value="60">€60 / hour</option>
              <option value="75">€75 / hour</option>
              <option value="100">€100 / hour</option>
              <option value="150">€150+ / hour</option>
            </select>
          </label>
        </div>
      </div>

      <div className="roi-tool-result" aria-live="polite">
        <p className="roi-result-label">Estimated annual savings</p>
        <div className="roi-result-statement">
          <span>AI can save you</span>
          <strong><AnimatedNumber value={result.annualSavings} format={(value) => money.format(Math.round(value))} /></strong>
          <span>per year</span>
        </div>

        <div className="roi-supporting-metrics">
          <div><span>Hours saved</span><strong><AnimatedNumber value={result.realizedWeeklyHours} format={(value) => `${number.format(Math.round(value))} hrs / week`} /></strong></div>
          <div><span>Work equivalent</span><strong><AnimatedNumber value={result.annualHoursRecovered} format={(value) => `${number.format(Math.round(value))} hrs / year`} /></strong></div>
          <div><span>Current cost of this work</span><strong><AnimatedNumber value={result.currentAnnualCost} format={(value) => `${money.format(Math.round(value))} / year`} /></strong></div>
        </div>

        <p className="roi-context">Based on {employees} {employees === 1 ? "employee" : "employees"} spending {hoursPerEmployee} {hoursPerEmployee === 1 ? "hour" : "hours"} per week on {workflowName.toLowerCase()}.</p>

        <details className="roi-methodology">
          <summary>How is this calculated?</summary>
          <p>We estimate the portion of the workflow that can realistically be automated, calculate the employee capacity this releases, and apply a conservative realization factor. The result is an estimate of economic value or productive capacity released, not guaranteed payroll reduction.</p>
        </details>

        <div className="roi-cta">
          <div><strong>See what we could automate</strong><p>We can identify the workflows behind the number and build the business case with you.</p></div>
          <a href="/contact">Start a conversation</a>
        </div>
      </div>
    </section>
  );
}
