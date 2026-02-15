import { BuddyCharacter } from "./BuddyCharacter";

interface BuddyPointingProps {
  className?: string;
}

export function BuddyPointing({ className }: BuddyPointingProps) {
  return <BuddyCharacter pose="pointing" className={className} />;
}
