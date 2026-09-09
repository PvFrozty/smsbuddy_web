"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("sb-in-view");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.16 });
    document.querySelectorAll(".sb-home [data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
