"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { analyticsIds } from "@/lib/constants";
import { CONVERSION_EVENT_NAME, type GetStartedEvent } from "@/lib/conversion";

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;
type TagWindow = Window & { gtag?: Gtag; fbq?: Fbq };

const { ga4, metaPixel, linkedDomains } = analyticsIds;

/**
 * Google Analytics 4 and the Meta Pixel, mounted once in the root layout.
 *
 * - Page views: GA4 counts them itself (enhanced measurement follows client-side navigation);
 *   the Pixel sends one on load and one per later route change.
 * - Get Started clicks: forwarded from the `smsbuddy:conversion` event that ConversionTracking
 *   dispatches, as GA4 `get_started_click` and Meta custom event `GetStartedClick`, with `cta_location`
 *   and `cta_page` (GA4 reserves `page_path`).
 *   (Not Meta's `Lead` or `CompleteRegistration`: those belong to the portal, once an account exists.)
 * - Only the route and the CTA placement label are sent: no personal data.
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
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${metaPixel}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
