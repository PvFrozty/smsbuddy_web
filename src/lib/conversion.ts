import { registerUrl, siteConfig } from "@/lib/constants";

export const CONVERSION_EVENT_NAME = "smsbuddy:conversion";

export interface GetStartedEvent {
  event: "get_started_click";
  page_path: string;
  cta_location: string;
}

// Only known marketing routes are exposed; arbitrary paths can contain personal data.
const marketingRoutes = new Set([
  "/", "/features", "/pricing", "/for-agencies", "/for-developers",
  "/for-smes", "/contact", "/get-started",
]);

export function isSignupUrl(href: string): boolean {
  try {
    const candidate = new URL(href, siteConfig.url);
    const signup = new URL(registerUrl);
    return candidate.origin === signup.origin &&
      candidate.pathname.replace(/\/$/, "") === signup.pathname;
  } catch {
    return false;
  }
}

export function safeMarketingRoute(pathname: string): string {
  const route = pathname.replace(/\/$/, "") || "/";
  return marketingRoutes.has(route) ? route : "other";
}

export function getCtaLocation(anchor: HTMLAnchorElement): string {
  const explicit = anchor.getAttribute("data-cta-location");
  // Developer-authored labels only, never link text, arbitrary IDs or form values.
  if (explicit && /^[a-z][a-z0-9_-]{0,47}$/.test(explicit)) return explicit;
  if (anchor.closest("header")) return "header";
  if (anchor.closest("footer")) return "footer";
  if (anchor.closest("nav")) return "navigation";
  if (anchor.closest("section")) return "section";
  return "page";
}

/** Local integration hook only: no requests, cookies or storage are created here. */
export function recordGetStartedClick(anchor: HTMLAnchorElement): void {
  const payload: GetStartedEvent = {
    event: "get_started_click",
    page_path: safeMarketingRoute(window.location.pathname),
    cta_location: getCtaLocation(anchor),
  };
  const targetWindow = window as Window & { dataLayer?: unknown[] };
  try {
    targetWindow.dataLayer = targetWindow.dataLayer ?? [];
    targetWindow.dataLayer.push({ ...payload });
  } catch {
    // An unavailable or misconfigured collector must never stop signup navigation.
  }
  window.dispatchEvent(new CustomEvent(CONVERSION_EVENT_NAME, { detail: payload }));
}
