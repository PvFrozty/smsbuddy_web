import { cn } from "@/lib/utils";

type DividerVariant = "cream-to-white" | "white-to-cream" | "cream-to-navy" | "navy-to-cream";

interface WavyDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  className?: string;
}

const fills: Record<DividerVariant, { wave: string; bg: string }> = {
  "cream-to-white": { wave: "#FFFFFF", bg: "bg-background" },
  "white-to-cream": { wave: "#FFF8F0", bg: "bg-surface" },
  "cream-to-navy": { wave: "#1A2B4A", bg: "bg-background" },
  "navy-to-cream": { wave: "#FFF8F0", bg: "bg-secondary" },
};

export function WavyDivider({
  variant = "cream-to-white",
  flip = false,
  className,
}: WavyDividerProps) {
  const { wave, bg } = fills[variant];

  return (
    <div
      className={cn(
        "relative -mb-px w-full overflow-hidden",
        bg,
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="block w-full"
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ height: "clamp(40px, 6vw, 80px)" }}
      >
        <path
          d="M0 40C120 65 240 20 360 35C480 50 600 15 720 30C840 45 960 10 1080 25C1200 40 1320 20 1440 35V80H0V40Z"
          fill={wave}
        />
        {/* Second subtle wave layer for depth */}
        <path
          d="M0 50C100 35 200 60 360 45C520 30 640 55 800 40C960 25 1100 50 1280 35C1360 28 1440 40 1440 40V80H0V50Z"
          fill={wave}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
