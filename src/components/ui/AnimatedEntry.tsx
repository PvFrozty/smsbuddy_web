"use client";

import { motion, type Variants } from "motion/react";
import { fadeInUp } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const entryComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
};

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
  const reduceMotion = useReducedMotion();
  const Component = entryComponents[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

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
