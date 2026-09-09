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

// Owner-confirmed price sheet, 9 September 2026.
// extraSmsCost applies to extra SMS, not the SMS included in the package.
export const smsPackages = [
  { code: "SMPAYG", name: "Pay As You Go",  price: 0.60,     smsCount: 1,       extraSmsCost: 0.60 },
  { code: "SB1X",   name: "SB1X",           price: 580,      smsCount: 1_000,   extraSmsCost: 0.58 },
  { code: "SB5X",   name: "SB5X",           price: 2_900,    smsCount: 5_000,   extraSmsCost: 0.56 },
  { code: "SB10X",  name: "SB10X",          price: 5_800,    smsCount: 10_000,  extraSmsCost: 0.55 },
  { code: "SB30X",  name: "SB30X",          price: 17_400,   smsCount: 30_000,  extraSmsCost: 0.53 },
  { code: "SB50X",  name: "SB50X",          price: 29_000,   smsCount: 50_000,  extraSmsCost: 0.52 },
  { code: "SB75X",  name: "SB75X",          price: 43_500,   smsCount: 75_000,  extraSmsCost: 0.50 },
  { code: "SB100X", name: "SB100X",         price: 58_000,   smsCount: 100_000, extraSmsCost: 0.48 },
  { code: "SB130X", name: "SB130X",         price: 75_400,   smsCount: 130_000, extraSmsCost: 0.46 },
  { code: "SB150X", name: "SB150X",         price: 87_000,   smsCount: 150_000, extraSmsCost: 0.45 },
] as const satisfies readonly SmsPackage[];

export const lowestExtraSmsPackage = smsPackages.reduce((lowest, pack) =>
  pack.extraSmsCost < lowest.extraSmsCost ? pack : lowest
);

// 3 highlighted packages for the pricing page hero cards
export const highlightedPackages = ["SB5X", "SB30X", "SB100X"] as const;

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
