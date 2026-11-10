import { siteConfig } from "@/lib/constants";
import { getCtaLocation, isSignupUrl, safeMarketingRoute } from "@/lib/conversion";

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;
type TagWindow = Window & { gtag?: Gtag; fbq?: Fbq };

type Params = Record<string, string | number>;

/**
 * Meta name for each GA4 event. Standard Meta events where one fits (`Contact`),
 * custom events otherwise. Events not listed here go to GA4 only.
 */
const metaEvents: Record<string, { name: string; standard?: boolean }> = {
  contact_click: { name: "Contact", standard: true },
  contact_form_submit: { name: "Contact", standard: true },
  login_click: { name: "LoginClick" },
  pricing_estimate: { name: "PricingEstimate" },
};

/**
 * Sends one interaction to GA4 and, when mapped, the Meta Pixel.
 * Callers pass only developer-authored labels and site content: never form input, contact details or IDs.
 */
export function trackEvent(name: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const w = window as TagWindow;
  const payload = { ...params, cta_page: safeMarketingRoute(window.location.pathname) };
  try {
    w.gtag?.("event", name, { ...payload, transport_type: "beacon" });
    const meta = metaEvents[name];
    if (meta) w.fbq?.(meta.standard ? "track" : "trackCustom", meta.name, payload);
  } catch {
    // Measurement must never break the page.
  }
}

const portalOrigin = new URL(siteConfig.portal).origin;
const whatsappOrigin = new URL(siteConfig.whatsapp).origin;

/** Classifies a clicked link into a tracked event, or null if it is not one we measure. */
export function linkEvent(anchor: HTMLAnchorElement): { name: string; params: Params } | null {
  const href = anchor.getAttribute("href") ?? "";
  const location = getCtaLocation(anchor);
  if (href.startsWith("mailto:")) return { name: "contact_click", params: { method: "email", cta_location: location } };
  if (href.startsWith("tel:")) return { name: "contact_click", params: { method: "phone", cta_location: location } };
  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return null;
  }
  if (url.origin === whatsappOrigin) return { name: "contact_click", params: { method: "whatsapp", cta_location: location } };
  // Signup links are measured separately as get_started_click.
  if (url.origin === portalOrigin && !isSignupUrl(anchor.href)) return { name: "login_click", params: { cta_location: location } };
  return null;
}
