import { cn } from "@/lib/utils";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { fadeInUp } from "@/animations/variants";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function PillarCard({
  icon,
  title,
  description,
  className,
}: PillarCardProps) {
  return (
    <AnimatedEntry variants={fadeInUp}>
      <div
        className={cn(
          "group rounded-2xl bg-surface p-6 transition-all duration-300 hand-drawn-shadow hover:-translate-y-1 hover:shadow-lg",
          className
        )}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
          {icon}
        </div>

        <h3 className="mb-2 font-heading text-lg font-semibold text-secondary">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-text-light">{description}</p>
      </div>
    </AnimatedEntry>
  );
}
