"use client";

import { motion } from "motion/react";
import { chatBubbleIn } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  className?: string;
  delay?: number;
}

export function TypingIndicator({ className, delay = 0 }: TypingIndicatorProps) {
  return (
    <motion.div
      variants={chatBubbleIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={cn("flex w-full justify-end", className)}
    >
      <div className="relative max-w-[80%]">
        <div className="flex items-center gap-1.5 rounded-2xl rounded-br-md bg-primary px-4 py-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-2 w-2 rounded-full bg-white/90"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Tail */}
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          className="absolute -bottom-1 right-0 scale-x-[-1]"
          aria-hidden="true"
        >
          <path
            d="M0 0C0 0 2 8 12 10C6 8 4 4 4 0H0Z"
            fill="var(--color-primary)"
          />
        </svg>
      </div>
    </motion.div>
  );
}
