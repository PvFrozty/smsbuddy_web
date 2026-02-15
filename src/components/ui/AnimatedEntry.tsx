"use client";

import { motion, type Variants } from "motion/react";
import { fadeInUp } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface AnimatedEntryProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}

export function AnimatedEntry({
  children,
  variants = fadeInUp,
  className,
  delay = 0,
  as = "div",
}: AnimatedEntryProps) {
  const Component = motion.create(as);

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
