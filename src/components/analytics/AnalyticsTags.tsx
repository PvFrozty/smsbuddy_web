"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { analyticsIds } from "@/lib/constants";
import { CONVERSION_EVENT_NAME, type GetStartedEvent } from "@/lib/conversion";
import { linkEvent, trackEvent } from "@/lib/analytics";

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;
type TagWindow = Window & { gtag?: Gtag; fbq?: Fbq };

const { ga4, metaPixel, clarity, linkedDomains } = analyticsIds;

/**
 * Google Analytics 4 and the Meta Pixel, mounted once in the root layout.
 *
 * - Page views: GA4 counts them itself (enhanced measurement follows client-side navigation);
 *   the Pixel sends one on load and one per later route change.
 * - Get Started clicks: forwarded from the `smsbuddy:conversion` event that ConversionTracking
 *   dispatches, as GA4 `get_started_click` and Meta custom event `GetStartedClick`, with `cta_location`
 *   and `cta_page` (GA4 reserves `page_path`).
 *   (Not Meta's `Lead` or `CompleteRegistration`: those belong to the portal, once an account exists.)
 * - Other interactions (src/lib/analytics.ts): `contact_click` (WhatsApp, email, phone; Meta `Contact`),
 *   `login_click`, `faq_open` (GA4 only) and `pricing_estimate` (sent by PricingCalculator).
 * - Microsoft Clarity (heatmaps and session recordings) loads only when `analyticsIds.clarity` is set.
 * - Only routes, placement labels and site content are sent: no personal data.
 */
export function AnalyticsTags() {
  const pathname = usePathname();
  const firstView = useRef(true);

  // Meta Pixel page view on client-side navigation (the base code already sent the first one).
  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    (window as TagWindow).fbq?.("track", "PageView");
  }, [pathname]);

  useEffect(() => {
    function onConversion(event: Event) {
      const detail = (event as CustomEvent<GetStartedEvent>).detail;
      if (!detail) return;
      const w = window as TagWindow;
      try {
        w.gtag?.("event", "get_started_click", {
          cta_location: detail.cta_location,
          cta_page: detail.page_path,
          transport_type: "beacon",
        });
        w.fbq?.("trackCustom", "GetStartedClick", {
          cta_location: detail.cta_location,
          cta_page: detail.page_path,
        });
      } catch {
        // Measurement must never block the signup link.
      }
    }
    window.addEventListener(CONVERSION_EVENT_NAME, onConversion);
    return () => window.removeEventListener(CONVERSION_EVENT_NAME, onConversion);
  }, []);

  // Contact and sign-in link clicks, through one delegated listener.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.type === "click" && event.button !== 0) return;
      if (event.type === "auxclick" && event.button !== 1) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      const tracked = anchor && linkEvent(anchor);
      if (tracked) trackEvent(tracked.name, tracked.params);
    }
    // `toggle` does not bubble, so listen in the capture phase.
    function onToggle(event: Event) {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open) return;
      const question = details.querySelector("summary")?.textContent?.trim().slice(0, 100);
      if (question) trackEvent("faq_open", { faq_question: question });
    }
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return (
    <>
      <Script id="ga4-src" src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${ga4}', { linker: { domains: ${JSON.stringify(linkedDomains)} } });`}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixel}');
fbq('track', 'PageView');`}
      </Script>
      {clarity && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarity}");`}
        </Script>
      )}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${metaPixel}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
