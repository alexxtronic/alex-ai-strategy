"use client";

import { useMemo, useState } from "react";

type Model = { people: number; hours: number; rate: number; weeks: number; reduction: number; realization: number; build: number; maintenance: number };

const presets: Record<string, Model> = {
  "Recurring reporting": { people: 12, hours: 5, rate: 50, weeks: 48, reduction: 70, realization: 75, build: 25000, maintenance: 6000 },
  "Enquiry handling": { people: 6, hours: 10, rate: 45, weeks: 48, reduction: 55, realization: 75, build: 30000, maintenance: 9000 },
  "Knowledge retrieval": { people: 40, hours: 1.5, rate: 55, weeks: 48, reduction: 45, realization: 65, build: 45000, maintenance: 12000 },
};

const money = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function RoiCalculator() {
  const [model, setModel] = useState<Model>(presets["Recurring reporting"]);
  const [active, setActive] = useState("Recurring reporting");
  const result = useMemo(() => {
    const baseline = model.people * model.hours * model.rate * model.weeks;
    const capacity = baseline * (model.reduction / 100);
    const realized = capacity * (model.realization / 100);
    const investment = model.build + model.maintenance;
    const net = realized - investment;
    const roi = investment > 0 ? (net / investment) * 100 : 0;
    const payback = realized > 0 ? investment / (realized / 12) : 0;
    return { baseline, capacity, realized, investment, net, roi, payback };
  }, [model]);

  function update(key: keyof Model, value: string) {
    setModel((current) => ({ ...current, [key]: Math.max(0, Number(value) || 0) }));
    setActive("Custom scenario");
  }

  return (
    <div className="calculator-shell">
      <div className="preset-tabs" role="group" aria-label="Illustrative workflow scenarios">
        {Object.entries(presets).map(([name, values]) => <button key={name} className={active === name ? "active" : ""} type="button" onClick={() => { setActive(name); setModel(values); }}>{name}</button>)}
      </div>
      <div className="calculator-grid">
        <section className="calculator-inputs" aria-labelledby="assumptions-title">
          <div className="calculator-section-head"><span>01</span><h2 id="assumptions-title">Set the assumptions</h2></div>
          <div className="input-grid">
            <label><span>People involved</span><input type="number" min="0" value={model.people} onChange={(e) => update("people", e.target.value)} /><small>people</small></label>
            <label><span>Hours each / week</span><input type="number" min="0" step="0.5" value={model.hours} onChange={(e) => update("hours", e.target.value)} /><small>hours</small></label>
            <label><span>Loaded hourly cost</span><input type="number" min="0" value={model.rate} onChange={(e) => update("rate", e.target.value)} /><small>EUR</small></label>
            <label><span>Working weeks / year</span><input type="number" min="0" max="52" value={model.weeks} onChange={(e) => update("weeks", e.target.value)} /><small>weeks</small></label>
            <label><span>Activity redesigned</span><input type="number" min="0" max="100" value={model.reduction} onChange={(e) => update("reduction", e.target.value)} /><small>%</small></label>
            <label><span>Realization factor</span><input type="number" min="0" max="100" value={model.realization} onChange={(e) => update("realization", e.target.value)} /><small>%</small></label>
            <label><span>One-time implementation</span><input type="number" min="0" step="1000" value={model.build} onChange={(e) => update("build", e.target.value)} /><small>EUR</small></label>
            <label><span>Year-one maintenance</span><input type="number" min="0" step="1000" value={model.maintenance} onChange={(e) => update("maintenance", e.target.value)} /><small>EUR</small></label>
          </div>
        </section>
        <section className="calculator-results" aria-live="polite" aria-labelledby="result-title">
          <div className="calculator-section-head"><span>02</span><h2 id="result-title">Pressure-test the case</h2></div>
          <div className="result-primary"><span>Illustrative first-year net value</span><strong>{money.format(result.net)}</strong><small>After implementation and maintenance</small></div>
          <div className="result-grid">
            <div><span>Baseline activity cost</span><strong>{money.format(result.baseline)}</strong></div>
            <div><span>Potential capacity</span><strong>{money.format(result.capacity)}</strong></div>
            <div><span>Realized gross value</span><strong>{money.format(result.realized)}</strong></div>
            <div><span>Total investment</span><strong>{money.format(result.investment)}</strong></div>
            <div><span>Illustrative ROI</span><strong>{Math.round(result.roi)}%</strong></div>
            <div><span>Illustrative payback</span><strong>{result.payback > 99 ? "99+" : result.payback.toFixed(1)} mo</strong></div>
          </div>
          <p className="calculator-caveat">Capacity is not automatically cash savings. The realization factor reflects how much recovered time can credibly become economic value through reduced spend, avoided hiring, increased throughput, or higher-value work.</p>
        </section>
      </div>
    </div>
  );
}
