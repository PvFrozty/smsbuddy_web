import { cn } from "@/lib/utils";

interface StampTextureProps {
  className?: string;
  children?: React.ReactNode;
}

export function StampTexture({ className, children }: StampTextureProps) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      >
        {/* Outer distressed ring — rough wobbly circle */}
        <path
          d="M100 10c12-1 24 2 35 8 10 5 18 12 24 21 7 10 11 21 13 33 1 8 1 16-1 24-2 10-6 19-12 27-7 9-15 16-25 21-9 4-19 7-29 7-12 1-23-1-34-7-10-5-18-13-24-22-6-9-10-20-12-31-1-9-1-18 2-27 3-10 8-20 15-28 8-9 17-16 28-21 6-3 13-5 20-5z"
          fill="none"
          stroke="#FF6B54"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Inner ring — also distressed */}
        <path
          d="M100 28c10-1 20 2 29 7 8 4 15 10 20 18 6 8 9 18 10 28 1 7 0 14-1 20-3 9-7 17-13 23-6 7-13 13-21 17-8 3-16 5-24 5-10 1-20-1-28-6-9-5-16-11-21-19-5-8-8-17-9-26-1-8 0-15 2-22 3-9 7-17 13-24 7-7 14-13 23-17 6-3 12-4 20-4z"
          fill="none"
          stroke="#FF6B54"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* Distress marks — small scattered patches */}
        <path
          d="M40 50l3-2M155 60l2 3M52 150l-2 1M148 145l3-1M70 170l1 2M130 30l-1 3"
          stroke="#FF6B54"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Small teeth/notches around the edge for stamp feel */}
        <path
          d="M100 6v6M60 18l2 5M140 18l-2 5M30 52l5 2M170 52l-5 2M18 100h6M176 100h-6M30 148l5-2M170 148l-5-2M60 182l2-5M140 182l-2-5M100 194v-6"
          stroke="#FF6B54"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* Text content inside stamp */}
      <div className="relative z-10 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}
