"use client";

import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/**
 * Returns true if the user prefers reduced motion.
 * Wraps motion's built-in hook for consistent usage.
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
