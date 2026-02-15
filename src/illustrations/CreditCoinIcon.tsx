import { cn } from "@/lib/utils";

interface CreditCoinIconProps {
  className?: string;
}

export function CreditCoinIcon({ className }: CreditCoinIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-auto h-auto", className)}
    >
      {/* Coin shadow / depth */}
      <ellipse
        cx="33"
        cy="36"
        rx="24"
        ry="23"
        fill="#E5B84D"
        stroke="#1A2B4A"
        strokeWidth="2"
      />

      {/* Main coin face — wobbly circle */}
      <path
        d="M32 8c-13 0-24 10-24 24s10 24 24 24 24-10 24-24c0-13-11-24-24-24z"
        fill="#FFD166"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner ring — hand-drawn */}
      <path
        d="M32 14c-10 0-18 8-18 18s8 18 18 18 18-8 18-18-8-18-18-18z"
        fill="none"
        stroke="#E5B84D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />

      {/* "S" mark for SMS credits */}
      <path
        d="M37 23c-1-2-4-3-6-2-3 1-5 3-4 6 1 2 3 3 5 4 3 1 5 3 5 6 0 3-3 5-6 5-3 0-5-1-6-3"
        fill="none"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Little shine marks */}
      <path
        d="M18 18c-1-2 0-3 2-3M46 16c1-1 2 0 2 1"
        stroke="#FFF8F0"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
