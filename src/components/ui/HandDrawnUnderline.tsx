import { cn } from "@/lib/utils";

interface HandDrawnUnderlineProps {
  className?: string;
  color?: string;
}

export function HandDrawnUnderline({
  className,
  color = "var(--color-primary)",
}: HandDrawnUnderlineProps) {
  return (
    <svg
      className={cn("h-3 select-none", className)}
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M2 8.5C20 3.5 40 2 60 4.5C80 7 100 9.5 120 7C140 4.5 160 2.5 180 5C190 6 198 7.5 198 7.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          filter: "url(#wobbly)",
        }}
      />
      <defs>
        <filter id="wobbly">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
