import { BuddyCharacter } from "./BuddyCharacter";

interface BuddyWavingProps {
  className?: string;
}

export function BuddyWaving({ className }: BuddyWavingProps) {
  return <BuddyCharacter pose="waving" className={className} />;
}
