"use client";

import { motion } from "motion/react";
import { chatBubbleIn } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "buddy";
  delay?: number;
  className?: string;
}

export function ChatBubble({
  message,
  sender,
  delay = 0,
  className,
}: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <motion.div
      variants={chatBubbleIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={cn(
        "flex w-full",
        isUser ? "justify-start" : "justify-end",
        className
      )}
    >
      <div className="relative max-w-[80%]">
        <div
          className={cn(
            "relative px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-2xl rounded-bl-md bg-white text-text"
              : "rounded-2xl rounded-br-md bg-primary text-white"
          )}
        >
          {message}
        </div>

        {/* Tail / triangle */}
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          className={cn(
            "absolute -bottom-1",
            isUser ? "left-0" : "right-0 scale-x-[-1]"
          )}
          aria-hidden="true"
        >
          <path
            d="M0 0C0 0 2 8 12 10C6 8 4 4 4 0H0Z"
            fill={isUser ? "#FFFFFF" : "var(--color-primary)"}
          />
        </svg>
      </div>
    </motion.div>
  );
}
