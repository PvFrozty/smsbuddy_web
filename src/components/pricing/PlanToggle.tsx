"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type PlanType = "campaign" | "api" | "agency";

interface PlanToggleProps {
  active: PlanType;
  onChange: (plan: PlanType) => void;
  className?: string;
}

const plans: { value: PlanType; label: string }[] = [
  { value: "campaign", label: "Campaign" },
  { value: "api", label: "API" },
  { value: "agency", label: "Agency" },
];

export function PlanToggle({ active, onChange, className }: PlanToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-surface p-1.5 border border-border",
        className
      )}
    >
      {plans.map((plan) => {
        const isActive = active === plan.value;
        return (
          <button
            key={plan.value}
            onClick={() => onChange(plan.value)}
            className={cn(
              "relative cursor-pointer rounded-full px-5 py-2.5 font-heading text-sm font-semibold transition-colors duration-200 select-none",
              isActive ? "text-white" : "text-text hover:bg-background-alt"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="plan-toggle-bg"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{plan.label}</span>
          </button>
        );
      })}
    </div>
  );
}
