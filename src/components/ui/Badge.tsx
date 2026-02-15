import { cn } from "@/lib/utils";

type BadgeVariant = "coral" | "navy" | "yellow" | "teal" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  coral: "bg-primary/15 text-primary-dark border-primary/30",
  navy: "bg-secondary/10 text-secondary border-secondary/20",
  yellow: "bg-accent/20 text-secondary border-accent/40",
  teal: "bg-success/15 text-secondary border-success/30",
  outline: "bg-transparent text-text border-border",
};

export function Badge({ children, variant = "coral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-heading text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
