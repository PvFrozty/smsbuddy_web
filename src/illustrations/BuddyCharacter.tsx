import { cn } from "@/lib/utils";

type BuddyPose = "neutral" | "waving" | "pointing";

interface BuddyCharacterProps {
  className?: string;
  pose?: BuddyPose;
}

export function BuddyCharacter({
  className,
  pose = "neutral",
}: BuddyCharacterProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("w-auto h-auto", className)}
    >
      {/* Head — slightly wobbly circle */}
      <path
        d="M100 20c-36 1-62 28-61 62 1 35 29 61 63 60 35-1 60-28 59-63-1-34-27-60-61-59z"
        fill="#FF6B54"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body — rounded torso shape */}
      <path
        d="M68 138c-3 2-14 12-16 28-2 18 2 38 4 48 2 9 8 16 16 18h56c8-2 14-9 16-18 2-10 6-30 4-48-2-16-13-26-16-28-6-5-16-8-32-8s-26 3-32 8z"
        fill="#FF6B54"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Neck connector */}
      <path
        d="M88 132c1-2 5-3 12-3s11 1 12 3"
        stroke="#1A2B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left leg */}
      <path
        d="M82 230c-1 6-2 18-1 28 0 4 3 7 7 7h8c3 0 5-3 5-6l-1-29"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right leg */}
      <path
        d="M108 230c0 6 1 18 1 28 0 4-2 7-6 7h-8c-3 0-5-3-5-6l1-29"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arms depend on pose */}
      {pose === "neutral" && <NeutralArms />}
      {pose === "waving" && <WavingArms />}
      {pose === "pointing" && <PointingArms />}

      {/* Little scarf/bandana detail for charm */}
      <path
        d="M82 134c4-2 10-3 18-3s14 1 18 3"
        stroke="#FFD166"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NeutralArms() {
  return (
    <>
      {/* Left arm — hanging relaxed */}
      <path
        d="M68 148c-8 4-16 14-20 26-3 10-4 18-2 22 2 3 5 4 8 2"
        fill="none"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 174c-4 12-4 20-2 24 2 3 5 3 8 1"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right arm — hanging relaxed */}
      <path
        d="M132 148c8 4 16 14 20 26 3 10 4 18 2 22-2 3-5 4-8 2"
        fill="none"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M152 174c4 12 4 20 2 24-2 3-5 3-8 1"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function WavingArms() {
  return (
    <>
      {/* Left arm — hanging relaxed */}
      <path
        d="M68 148c-8 4-16 14-20 26-3 10-4 18-2 22 2 3 5 4 8 2"
        fill="none"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 174c-4 12-4 20-2 24 2 3 5 3 8 1"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right arm — raised and waving */}
      <path
        d="M132 148c10-2 20-12 28-28 6-12 10-22 8-28"
        fill="none"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Waving hand */}
      <path
        d="M168 92c2-6 1-12-2-14-3-3-6-1-8 3-2 5-2 10 0 14"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wave lines */}
      <path
        d="M174 82c3-2 6-2 8 0M178 90c3-1 5-1 7 1"
        stroke="#FFD166"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </>
  );
}

function PointingArms() {
  return (
    <>
      {/* Left arm — hanging relaxed */}
      <path
        d="M68 148c-8 4-16 14-20 26-3 10-4 18-2 22 2 3 5 4 8 2"
        fill="none"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 174c-4 12-4 20-2 24 2 3 5 3 8 1"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right arm — extended pointing right */}
      <path
        d="M132 152c10 0 24-4 36-8 10-4 18-6 22-4"
        fill="none"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pointing hand */}
      <path
        d="M190 140c4-1 8 0 10 3 1 3-1 5-4 6l-10 2"
        fill="#FF8A78"
        stroke="#1A2B4A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pointing indicator lines */}
      <path
        d="M198 144c4 0 7 0 10 1M196 150c4 1 7 2 9 3"
        stroke="#FFD166"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}
