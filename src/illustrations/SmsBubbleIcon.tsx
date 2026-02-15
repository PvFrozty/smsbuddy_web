import { cn } from "@/lib/utils";

interface SmsBubbleIconProps {
  className?: string;
}

export function SmsBubbleIcon({ className }: SmsBubbleIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-auto h-auto", className)}
    >
      {/* Main chat bubble — wobbly hand-drawn */}
      <path
        d="M8 14c-1-4 2-8 7-9h34c5 0 9 4 9 9v18c0 5-3 9-8 9H30l-12 10c-2 2-5 1-5-2v-8c-4-2-6-6-6-10V14z"
        fill="#FF6B54"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Chat dots — three little circles */}
      <circle cx="22" cy="27" r="3" fill="#FFF8F0" />
      <circle cx="32" cy="27" r="3" fill="#FFF8F0" />
      <circle cx="42" cy="27" r="3" fill="#FFF8F0" />

      {/* Small secondary bubble behind for depth */}
      <path
        d="M50 8c3 0 6 2 7 5v10c0 2-1 4-3 5"
        stroke="#FF8A78"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 4"
      />
    </svg>
  );
}
