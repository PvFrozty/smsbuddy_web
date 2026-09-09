import type { Metadata } from "next";
import { lowestExtraSmsPackage, siteConfig } from "./constants";

// One registry keeps canonical URLs, social previews and the sitemap aligned.
export const searchPages = {
  "/": {
    title: "SMS Gateway Sri Lanka | Bulk SMS & API",
    description: "Send bulk SMS, customer updates and OTPs in Sri Lanka with SMS Buddy. Branded sender names, prepaid credits, API access and local setup support.",
  },
  "/pricing": {
    title: "Bulk SMS Pricing Sri Lanka | Credit Packages",
    description: `Compare SMS packages in LKR. ${lowestExtraSmsPackage.code}: LKR ${lowestExtraSmsPackage.price.toLocaleString("en-LK")} for ${lowestExtraSmsPackage.smsCount.toLocaleString("en-LK")} included SMS; extra SMS at LKR ${lowestExtraSmsPackage.extraSmsCost.toFixed(2)} each. Credits valid for 3 months.`,
  },
  "/features": {
    title: "Bulk SMS Features | Sender IDs, Portal & API",
    description: "Explore SMS Buddy's bulk SMS portal, Excel and CSV contact imports, approved sender IDs, shared credits and delivery information for Sri Lankan businesses.",
  },
  "/for-developers": {
    title: "SMS API Sri Lanka | OTP & Transactional Messages",
    description: "Connect SMS Buddy to your application for OTP messages, order updates and account alerts in Sri Lanka. Explore API access and integration support.",
  },
  "/for-smes": {
    title: "SMS Marketing Sri Lanka | Small Business Messaging",
    description: "Send SMS promotions, appointment reminders and order updates from your business name. Use SMS Buddy's web portal with prepaid credits and local setup support.",
  },
  "/for-agencies": {
    title: "SMS for Agencies | Multi-Brand Campaigns Sri Lanka",
    description: "Manage client SMS campaigns with approved sender names and shared credits. Explore SMS Buddy's agency workflow, volume packages and setup assistance.",
  },
  "/contact": {
    title: "Contact SMS Buddy | SMS Setup & API Support",
    description: "Contact the SMS Buddy team in Sri Lanka about sender-name approval, SMS credit packages, business messaging and API integration.",
  },
  "/guides/bulk-sms-sri-lanka": {
    title: "How to Send Bulk SMS in Sri Lanka | SMS Buddy Guide",
    description: "Learn how to start a bulk SMS campaign in Sri Lanka: create an account, arrange a sender ID, choose credits, import contacts and review your message.",
  },
} as const;

export type SearchPath = keyof typeof searchPages;

export function createMetadata(path: SearchPath): Metadata {
  const { title, description } = searchPages[path];
  const fullTitle = title.includes("SMS Buddy") ? title : `${title} | ${siteConfig.name}`;
  const url = new URL(path, siteConfig.url).toString();
  const images = [{ url: `${siteConfig.url}/social/smsbuddy.png`, width: 1200, height: 630, alt: "SMS Buddy — business SMS for Sri Lanka" }];
  return {
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description, url, siteName: siteConfig.name, type: "website", locale: "en_LK", images },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
