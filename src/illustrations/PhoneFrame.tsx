import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  className?: string;
  children?: React.ReactNode;
}

export function PhoneFrame({ className, children }: PhoneFrameProps) {
  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ transform: "rotate(-2.5deg)" }}
    >
      <svg
        viewBox="0 0 260 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full h-full"
      >
        {/* Phone body — hand-drawn wobbly rounded rect */}
        <path
          d="M38 12c-14 1-24 12-25 26l-1 4v416c0 14 11 26 25 27h2l182 1c14-1 25-13 26-27V42c-1-14-12-25-26-26l-3-1-2-1H41l-3-2z"
          fill="#1A2B4A"
          stroke="#1A2B4A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner bezel — slightly inset wobbly shape */}
        <path
          d="M24 52c0-10 7-18 16-19h180c10 1 17 9 17 19v386c0 10-7 18-17 19H40c-9-1-16-9-16-19V52z"
          fill="#FFF8F0"
          stroke="#2A3F66"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Top notch / speaker area */}
        <path
          d="M98 22c-1-1 1-4 6-5h52c5 1 7 4 6 5v8c-1 4-5 7-10 8h-44c-5-1-9-4-10-8v-8z"
          fill="#2A3F66"
          stroke="#1A2B4A"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Speaker slit */}
        <path
          d="M115 25h30"
          stroke="#3A5080"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Home indicator at bottom */}
        <path
          d="M108 472h44"
          stroke="#E8DDD3"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Side buttons — volume */}
        <path
          d="M1 120v30"
          stroke="#2A3F66"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M1 162v30"
          stroke="#2A3F66"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Side button — power */}
        <path
          d="M259 150v40"
          stroke="#2A3F66"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Screen content area — positioned over the inner bezel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="overflow-hidden"
          style={{
            position: "absolute",
            top: "11%",
            left: "10%",
            right: "10%",
            bottom: "9.5%",
            borderRadius: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
