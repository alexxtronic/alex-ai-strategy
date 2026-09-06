export const analyticsEvents = [
  "page_view",
  "campaign_landing",
  "cta_click",
  "solution_select",
  "case_study_engaged",
  "contact_form_start",
  "contact_form_submit",
  "contact_form_response_loaded",
  "contact_form_timeout",
  "roi_calculator_start",
  "roi_calculator_update",
  "roi_result_view",
  "roi_methodology_open",
  "solution_page_engaged",
  "solution_page_complete",
  "outbound_link_click",
] as const;

export type AnalyticsEvent = (typeof analyticsEvents)[number];

export type AnalyticsProperties = Partial<Record<
  | "page_type"
  | "page_path"
  | "content_id"
  | "solution_slug"
  | "landing_path"
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_content"
  | "referrer_group"
  | "cta_id"
  | "placement"
  | "destination_path"
  | "form_id"
  | "solution_interest"
  | "workflow"
  | "employee_band"
  | "hours_band"
  | "cost_band"
  | "value_band"
  | "engagement_rule"
  | "target_domain_group",
  string | boolean
>>;

type PlausibleFunction = ((event: string, options?: { props?: AnalyticsProperties; u?: string }) => void) & {
  q?: unknown[][];
  o?: Record<string, unknown>;
  init?: (options?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    plausible?: PlausibleFunction;
  }
}

const allowedPropertyKeys = new Set<string>([
  "page_type", "page_path", "content_id", "solution_slug", "landing_path",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "referrer_group",
  "cta_id", "placement", "destination_path", "form_id", "solution_interest",
  "workflow", "employee_band", "hours_band", "cost_band", "value_band",
  "engagement_rule", "target_domain_group",
]);

const allowedCampaignValues: Record<string, Set<string>> = {
  utm_source: new Set(["linkedin", "google", "newsletter", "partner", "referral", "direct", "organic"]),
  utm_medium: new Set(["outbound", "social", "email", "referral", "organic"]),
  utm_campaign: new Set(["nonprofit_copenhagen", "nonprofit_copenhagen_q4", "nonprofit_outreach", "mission_driven_outreach", "solution_outreach", "general"]),
  utm_content: new Set(["general", "founder_outreach_v1", "grant_automation_v1", "partner_intelligence_v1", "listening_dashboard_v1", "knowledge_systems_v1"]),
};

const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";

function safeString(value: string) {
  const trimmed = value.trim().slice(0, 100);
  if (!trimmed || trimmed.includes("@") || trimmed.includes("://") || /[\r\n]/.test(trimmed)) return undefined;
  return trimmed;
}

export function isApprovedCampaignValue(key: string, value: string) {
  return allowedCampaignValues[key]?.has(value) ?? false;
}

function sanitize(properties: AnalyticsProperties) {
  const clean: AnalyticsProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    if (!allowedPropertyKeys.has(key) || value === undefined || value === null || value === "") continue;
    if (typeof value === "string") {
      const safe = safeString(value);
      if (safe) clean[key as keyof AnalyticsProperties] = safe;
    } else if (typeof value === "boolean") {
      clean[key as keyof AnalyticsProperties] = value;
    }
  }
  return clean;
}

function pageContext(): AnalyticsProperties {
  if (typeof window === "undefined") return {};
  const main = document.querySelector("main");
  const parts = window.location.pathname.split("/").filter(Boolean);
  return {
    page_path: window.location.pathname,
    page_type: main?.getAttribute("data-page-type") ?? (parts[0] || "home"),
    solution_slug: main?.getAttribute("data-solution-slug") ?? undefined,
  };
}

function campaignContext(): AnalyticsProperties {
  if (typeof window === "undefined") return {};
  try {
    const stored = JSON.parse(window.sessionStorage.getItem("vitrus_campaign") ?? "{}") as Record<string, unknown>;
    const campaign: AnalyticsProperties = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const) {
      const value = stored[key];
      if (typeof value === "string" && isApprovedCampaignValue(key, value)) campaign[key] = value;
    }
    return sanitize(campaign);
  } catch {
    return {};
  }
}

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return (analyticsEvents as readonly string[]).includes(value);
}

export function trackEvent(event: AnalyticsEvent, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  const props = sanitize({ ...pageContext(), ...campaignContext(), ...properties });
  const detail = { event, properties: props };

  window.dispatchEvent(new CustomEvent("vitrus:analytics", { detail }));
  if (new URLSearchParams(window.location.search).get("analytics_debug") === "1") console.info("VITRUS analytics", detail);

  if (provider === "plausible" && window.plausible) {
    window.plausible(event === "page_view" ? "pageview" : event, {
      props,
      u: `${window.location.origin}${window.location.pathname}`,
    });
  }
}

export function calculatorBands(values: { employees: number; hours: number; cost: number; annualValue: number }) {
  const employeeBand = values.employees === 1 ? "1" : values.employees <= 5 ? "2_to_5" : values.employees <= 20 ? "6_to_20" : values.employees <= 50 ? "21_to_50" : "51_plus";
  const hoursBand = values.hours <= 4 ? "1_to_4" : values.hours <= 9 ? "5_to_9" : values.hours <= 19 ? "10_to_19" : "20_to_40";
  const costBand = values.cost < 50 ? "under_50" : values.cost <= 75 ? "50_to_75" : values.cost <= 100 ? "76_to_100" : "over_100";
  const valueBand = values.annualValue < 10000 ? "under_10k" : values.annualValue < 25000 ? "10k_to_25k" : values.annualValue < 50000 ? "25k_to_50k" : values.annualValue < 100000 ? "50k_to_100k" : "100k_plus";
  return { employee_band: employeeBand, hours_band: hoursBand, cost_band: costBand, value_band: valueBand };
}
