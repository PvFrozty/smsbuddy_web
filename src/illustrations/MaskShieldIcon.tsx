import { cn } from "@/lib/utils";

interface MaskShieldIconProps {
  className?: string;
}

export function MaskShieldIcon({ className }: MaskShieldIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-auto h-auto", className)}
    >
      {/* Shield body — hand-drawn wobbly */}
      <path
        d="M32 4c-1 0-2 0-2 1L10 14c-2 1-3 3-3 5 0 16 6 28 14 36 4 4 8 6 11 7 3-1 7-3 11-7 8-8 14-20 14-36 0-2-1-4-3-5L34 5c0-1-1-1-2-1z"
        fill="#1A2B4A"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner shield highlight */}
      <path
        d="M32 10l-17 8c0 14 5 24 12 31 3 3 5 4 5 4s2-1 5-4c7-7 12-17 12-31L32 10z"
        fill="#2A3F66"
        stroke="none"
      />

      {/* Small message/phone overlay */}
      <rect
        x="23"
        y="22"
        width="18"
        height="24"
        rx="3"
        fill="#FFF8F0"
        stroke="#FF6B54"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Phone screen lines — message indicator */}
      <path
        d="M27 29h10M27 33h7M27 37h9"
        stroke="#4ECDC4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Phone speaker slit */}
      <path
        d="M30 25h4"
        stroke="#E8DDD3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Shield checkmark accent */}
      <path
        d="M38 40l3 3 5-6"
        stroke="#4ECDC4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
