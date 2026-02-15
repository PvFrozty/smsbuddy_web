"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

export function useScrollAnimation(options?: { once?: boolean; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    margin: (options?.margin ?? "-100px") as any,
  });

  return { ref, isInView };
}
