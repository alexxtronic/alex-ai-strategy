"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isAnalyticsEvent, isApprovedCampaignValue, trackEvent } from "../lib/analytics";

const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";
const plausibleScript = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC;
const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const campaignStorageKey = "vitrus_campaign";

type CampaignKey = (typeof campaignKeys)[number];
type Campaign = Partial<Record<CampaignKey, string>>;

function approvedCampaign(): Campaign {
  const current = new URLSearchParams(window.location.search);
  const approved: Campaign = {};
  for (const key of campaignKeys) {
    const value = current.get(key)?.trim().toLowerCase();
    if (value && isApprovedCampaignValue(key, value)) approved[key] = value;
  }
  return approved;
}

function rememberCampaign(campaign: Campaign) {
  if (!Object.keys(campaign).length) return;
  try {
    window.sessionStorage.setItem(campaignStorageKey, JSON.stringify(campaign));
  } catch {
    // Measurement must never interfere with the site experience.
  }
}

function referrerGroup() {
  if (!document.referrer) return "direct";
  try {
    const domain = new URL(document.referrer).hostname;
    if (domain.includes("linkedin")) return "linkedin";
    if (domain.includes("google")) return "google";
    if (domain === window.location.hostname) return "internal";
    return "referral";
  } catch {
    return "unknown";
  }
}

function initializePlausible() {
  if (provider !== "plausible" || !plausibleScript || window.plausible) return;

  const plausible = Object.assign((event: string, options?: object) => {
    plausible.q = plausible.q ?? [];
    plausible.q.push([event, options]);
  }, { q: [] as unknown[][], o: {} as Record<string, unknown>, init: undefined as ((options?: Record<string, unknown>) => void) | undefined });

  window.plausible = plausible;
  plausible.init = plausible.init ?? ((options = {}) => { plausible.o = options; });
  plausible.init({
    autoCapturePageviews: false,
    transformRequest: (payload: Record<string, unknown>) => ({
      ...payload,
      u: `${window.location.origin}${window.location.pathname}`,
    }),
  });

  if (!document.querySelector("script[data-vitrus-analytics='plausible']")) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = plausibleScript;
    script.dataset.vitrusAnalytics = "plausible";
    document.head.appendChild(script);
  }
}

export function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => initializePlausible(), []);

  useEffect(() => {
    const campaign = approvedCampaign();
    rememberCampaign(campaign);
    trackEvent("page_view");

    if (Object.keys(campaign).length) {
      trackEvent("campaign_landing", {
        landing_path: window.location.pathname,
        ...campaign,
        referrer_group: referrerGroup(),
      });
    }

    const clickHandler = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const destination = new URL(link.href, window.location.href);
      const eventName = link.dataset.analyticsEvent;
      if (eventName && isAnalyticsEvent(eventName)) {
        trackEvent(eventName, {
          cta_id: link.dataset.analyticsCtaId,
          placement: link.dataset.analyticsPlacement,
          destination_path: destination.origin === window.location.origin ? destination.pathname : undefined,
          solution_slug: link.dataset.analyticsSolutionSlug,
          content_id: link.dataset.analyticsContentId,
        });
      } else if (destination.origin !== window.location.origin) {
        trackEvent("outbound_link_click", { target_domain_group: destination.hostname.replace(/^www\./, "") });
      }
    };

    document.addEventListener("click", clickHandler, true);

    const viewed = new WeakSet<Element>();
    const timers = new Map<Element, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (viewed.has(entry.target)) continue;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          const timer = window.setTimeout(() => {
            if (viewed.has(entry.target)) return;
            viewed.add(entry.target);
            const element = entry.target as HTMLElement;
            if (element.dataset.analyticsView === "case_study_engaged") {
              trackEvent("case_study_engaged", { content_id: element.dataset.analyticsContentId });
            } else if (element.dataset.analyticsSection) {
              trackEvent("solution_page_engaged", { content_id: element.dataset.analyticsSection, engagement_rule: "section_view" });
            }
            observer.unobserve(entry.target);
          }, elementDelay(entry.target));
          timers.set(entry.target, timer);
        } else {
          const timer = timers.get(entry.target);
          if (timer) window.clearTimeout(timer);
          timers.delete(entry.target);
        }
      }
    }, { threshold: [0.6] });

    document.querySelectorAll("[data-analytics-view], [data-analytics-section]").forEach((element) => observer.observe(element));

    let completed = false;
    const scrollHandler = () => {
      if (completed || document.querySelector("main")?.getAttribute("data-page-type") !== "solution") return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.9) {
        completed = true;
        trackEvent("solution_page_complete", { engagement_rule: "90_percent_depth" });
      }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });
    scrollHandler();

    return () => {
      document.removeEventListener("click", clickHandler, true);
      window.removeEventListener("scroll", scrollHandler);
      observer.disconnect();
      for (const timer of timers.values()) window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

function elementDelay(element: Element) {
  return element.hasAttribute("data-analytics-view") ? 3000 : 800;
}
