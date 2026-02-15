import { cn } from "@/lib/utils";

interface QueuePipeIconProps {
  className?: string;
}

export function QueuePipeIcon({ className }: QueuePipeIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-auto h-auto", className)}
    >
      {/* Funnel top opening — wide wobbly */}
      <path
        d="M6 10c-1-2 1-4 4-4h44c3 0 5 2 4 4L42 34v16c0 3-2 6-5 7l-6 2c-2 1-4 0-4-2V34L6 10z"
        fill="#4ECDC4"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner funnel line for depth */}
      <path
        d="M14 12l14 20v14M50 12L36 32v14"
        fill="none"
        stroke="#3ABDB4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Queue items floating in — small circles/messages */}
      <circle cx="16" cy="12" r="3" fill="#FFF8F0" stroke="#1A2B4A" strokeWidth="1.5" />
      <circle cx="32" cy="10" r="3" fill="#FFF8F0" stroke="#1A2B4A" strokeWidth="1.5" />
      <circle cx="48" cy="12" r="3" fill="#FFF8F0" stroke="#1A2B4A" strokeWidth="1.5" />

      {/* Output drop */}
      <path
        d="M32 56c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3z"
        fill="#4ECDC4"
        stroke="#1A2B4A"
        strokeWidth="1.5"
      />

      {/* Little motion lines at top */}
      <path
        d="M10 4l2 2M52 4l-2 2M32 2v3"
        stroke="#7EDDD6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
