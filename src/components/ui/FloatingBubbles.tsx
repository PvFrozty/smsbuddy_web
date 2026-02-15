"use client";

import { cn } from "@/lib/utils";

interface BubbleConfig {
  size: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  opacity: number;
}

const bubbles: BubbleConfig[] = [
  { size: 40, top: "10%", left: "5%", delay: "0s", duration: "14s", opacity: 0.12 },
  { size: 28, top: "20%", left: "85%", delay: "2s", duration: "18s", opacity: 0.1 },
  { size: 52, top: "45%", left: "15%", delay: "4s", duration: "16s", opacity: 0.08 },
  { size: 32, top: "60%", left: "75%", delay: "1s", duration: "20s", opacity: 0.1 },
  { size: 24, top: "75%", left: "45%", delay: "6s", duration: "15s", opacity: 0.12 },
  { size: 36, top: "30%", left: "60%", delay: "3s", duration: "17s", opacity: 0.09 },
  { size: 20, top: "85%", left: "25%", delay: "5s", duration: "19s", opacity: 0.11 },
  { size: 44, top: "15%", left: "40%", delay: "7s", duration: "13s", opacity: 0.07 },
];

interface FloatingBubblesProps {
  className?: string;
  count?: number;
}

export function FloatingBubbles({ className, count }: FloatingBubblesProps) {
  const activeBubbles = count ? bubbles.slice(0, count) : bubbles;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {activeBubbles.map((bubble, i) => (
        <div
          key={i}
          className="floating-bubble absolute"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
            opacity: bubble.opacity,
          }}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            {/* Chat bubble shape */}
            <path
              d="M20 4C10.6 4 3 10.3 3 18C3 22.4 5.5 26.3 9.3 28.8L7 35L14.2 31.4C16 31.8 17.9 32 20 32C29.4 32 37 25.7 37 18C37 10.3 29.4 4 20 4Z"
              fill="var(--color-primary)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
