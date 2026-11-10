import type { SmsPackage } from "@/types";

// SMS Buddy Brand Design Tokens

export const colors = {
  primary: "#FF6B54",       // Warm coral — CTAs, highlights
  primaryLight: "#FF8A78",  // Lighter coral for hovers
  primaryDark: "#E5533D",   // Darker coral for active states
  secondary: "#1A2B4A",     // Deep navy — headers, trust
  secondaryLight: "#2A3F66",
  accent: "#FFD166",        // Sunny yellow — badges, alerts
  accentLight: "#FFE194",
  success: "#4ECDC4",       // Teal — delivery confirmations
  successLight: "#7EDDD6",
  warning: "#F6A623",       // Amber — retries, warnings
  error: "#E74C3C",         // Red — failures
  background: "#FFF8F0",    // Warm cream
  backgroundAlt: "#FFF0E0", // Soft peach
  backgroundDark: "#1A2B4A",// Navy sections
  surface: "#FFFFFF",       // Card surfaces
  text: "#2D3436",          // Dark charcoal
  textLight: "#636E72",     // Muted text
  textOnDark: "#FFF8F0",    // Text on dark backgrounds
  border: "#E8DDD3",        // Warm border
} as const;

export const spacing = {
  section: "py-20 md:py-28 lg:py-32",
  sectionSmall: "py-12 md:py-16 lg:py-20",
  container: "px-4 sm:px-6 md:px-8",
  maxWidth: "max-w-[1200px]",
} as const;

export const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "For Developers", href: "/for-developers" },
  { label: "For SMEs", href: "/for-smes" },
] as const;

// Owner-confirmed SMS Buddy tariff, 9 November 2026 (source: "SMS Buddy
// Pricing.xlsx"). Supersedes the 7 October 2026 range (0.60 → 0.46) and the
// older SB150X ladder. Internal cost and margin columns are never published.
export const smsPackages: SmsPackage[] = [
  { code: "SB1X", name: "SB1X", smsCount: 1_000, unitPrice: 0.56, price: 560 },
  { code: "SB5X", name: "SB5X", smsCount: 5_000, unitPrice: 0.54, price: 2_700 },
  { code: "SB10X", name: "SB10X", smsCount: 10_000, unitPrice: 0.52, price: 5_200 },
  { code: "SB30X", name: "SB30X", smsCount: 30_000, unitPrice: 0.5, price: 15_000 },
  { code: "SB50X", name: "SB50X", smsCount: 50_000, unitPrice: 0.48, price: 24_000 },
  { code: "SB75X", name: "SB75X", smsCount: 75_000, unitPrice: 0.47, price: 35_250 },
  { code: "SB100X", name: "SB100X", smsCount: 100_000, unitPrice: 0.45, price: 45_000, highlighted: true },
];

const largestPackage = smsPackages[smsPackages.length - 1];

export const transactionalPricing = {
  currency: "LKR",
  /** SMPAYG: any quantity at this rate. Reserved for customers of other Nanobotz services; never show it on the site. */
  payAsYouGoCode: "SMPAYG",
  startingRate: 0.58,
  volumeRate: largestPackage.unitPrice,
  volumePackage: largestPackage,
  confirmedOn: "2026-11-09",
} as const;

// Nanobotz clients billing more than this per month (LKR) can send on a
// post-paid pay-as-you-go account with no credit top-ups, at a special rate
// agreed from their monthly SMS usage.
/**
 * Public measurement IDs (safe to ship in page code).
 * GA4: property "SMS Buddy (smsbuddy.lk)", web stream "SMS Buddy website" (PvFrozty account).
 * Meta: dataset "SMS Buddy website", owned by the Nanobotz It Solutions business portfolio.
 * The portal (portal.smsbuddy.lk) must load the same IDs to measure completed signups.
 */
export const analyticsIds = {
  ga4: "G-F3RXZWWZQ0",
  metaPixel: "1654565889543577",
  /** Domains that share one GA4 session when people move from the site to the portal. */
  linkedDomains: ["smsbuddy.lk", "portal.smsbuddy.lk"],
} as const;

/** Free SMS every new account can send to try the service (owner confirmed 10 Nov 2026). */
export const freeTrialSms = 10;

export const nanobotzClientBilling = {
  minMonthlySpend: 50_000,
} as const;

export const siteConfig = {
  name: "SMS Buddy",
  tagline: "Your friendly SMS gateway",
  description:
    "SMS Buddy is a reliable, assisted SMS gateway for Sri Lankan businesses, agencies, and developers who need multi-brand, transactional and promotional messaging without long-term subscriptions.",
  url: "https://smsbuddy.lk",
  whatsapp: "https://wa.me/94771172031",
  phone: "+94771172031",
  portal: "https://portal.smsbuddy.lk",
} as const;

/**
 * The SMS Buddy customer portal, where visitors buy credits and sign in to the
 * app. Every "Get Started" / "Create Account" CTA on the marketing site points
 * here.
 */
export const registerUrl = `${siteConfig.portal}/register`;
