"use client";

import { useEffect } from "react";
import { isSignupUrl, recordGetStartedClick } from "@/lib/conversion";

/** Mount once in the root layout. This supplies hooks, not an analytics collector. */
export function ConversionTracking() {
  useEffect(() => {
    function onActivation(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.type === "click" && event.button !== 0) return;
      if (event.type === "auxclick" && event.button !== 1) return;
      const element = event.target instanceof Element ? event.target : null;
      const anchor = element?.closest<HTMLAnchorElement>("a[href]");
      if (anchor && isSignupUrl(anchor.href)) recordGetStartedClick(anchor);
    }

    document.addEventListener("click", onActivation);
    document.addEventListener("auxclick", onActivation);
    return () => {
      document.removeEventListener("click", onActivation);
      document.removeEventListener("auxclick", onActivation);
    };
  }, []);

  return null;
}
