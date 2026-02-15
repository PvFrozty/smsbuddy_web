import { cn } from "@/lib/utils";

interface HandDrawnCircleProps {
  className?: string;
  color?: string;
}

export function HandDrawnCircle({
  className,
  color = "var(--color-accent)",
}: HandDrawnCircleProps) {
  return (
    <svg
      className={cn("pointer-events-none select-none", className)}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse
        cx="60"
        cy="30"
        rx="55"
        ry="25"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="4 3"
        fill="none"
        transform="rotate(-2 60 30)"
      />
    </svg>
  );
}
