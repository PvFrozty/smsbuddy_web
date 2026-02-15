import { cn } from "@/lib/utils";

interface PackageBoxIconProps {
  className?: string;
}

export function PackageBoxIcon({ className }: PackageBoxIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-auto h-auto", className)}
    >
      {/* Box base — hand-drawn wobbly */}
      <path
        d="M8 24l24 10 24-10v26c0 2-1 4-3 5l-20 6c-1 0-2 0-2 0l-20-6c-2-1-3-3-3-5V24z"
        fill="#FF6B54"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Box lid / top face */}
      <path
        d="M8 24l24-14 24 14-24 10-24-10z"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center dividing line */}
      <path
        d="M32 34v27"
        stroke="#1A2B4A"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Top center line */}
      <path
        d="M32 10v24"
        stroke="#E5533D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />

      {/* Ribbon / bow on top */}
      <path
        d="M26 16c-3-4-1-8 3-7 3 1 4 4 3 7M38 16c3-4 1-8-3-7-3 1-4 4-3 7"
        fill="#FFD166"
        stroke="#1A2B4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ribbon center knot */}
      <circle cx="32" cy="17" r="3" fill="#FFD166" stroke="#1A2B4A" strokeWidth="1.5" />

      {/* Little sparkle */}
      <path
        d="M50 14l1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1z"
        fill="#FFD166"
        stroke="none"
      />
    </svg>
  );
}
