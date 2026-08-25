import { cn } from "@/lib/utils";
import { registerUrl } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { fadeInUp } from "@/animations/variants";

interface PackCardProps {
  name: string;
  description: string;
  credits: string;
  pricePerSms: string;
  totalPrice: string;
  features: string[];
  popular?: boolean;
  color: "coral" | "navy" | "yellow";
  className?: string;
}

const colorStyles: Record<
  PackCardProps["color"],
  { bar: string; badge: PackCardProps["color"] }
> = {
  coral: { bar: "bg-primary", badge: "coral" },
  navy: { bar: "bg-secondary", badge: "navy" },
  yellow: { bar: "bg-accent", badge: "yellow" },
};

export function PackCard({
  name,
  description,
  credits,
  pricePerSms,
  totalPrice,
  features,
  popular = false,
  color,
  className,
}: PackCardProps) {
  const styles = colorStyles[color];

  return (
    <AnimatedEntry variants={fadeInUp}>
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
          popular && "hand-drawn-shadow scale-[1.02] border-primary/40",
          className
        )}
      >
        {/* Color accent bar */}
        <div className={cn("h-1.5 w-full", styles.bar)} />

        <div className="flex flex-1 flex-col p-6 md:p-8">
          {/* Popular badge */}
          {popular && (
            <div className="mb-4">
              <Badge variant={styles.badge}>Most Popular</Badge>
            </div>
          )}

          {/* Name + Description */}
          <h3 className="font-heading text-xl font-bold text-secondary">
            {name}
          </h3>
          <p className="mt-1.5 text-sm text-text-light">{description}</p>

          {/* Pricing */}
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-extrabold text-secondary">
                {pricePerSms}
              </span>
              <span className="text-sm text-text-light">/SMS</span>
            </div>
            <p className="mt-1 text-sm text-text-light">
              {totalPrice} total for{" "}
              <span className="font-semibold text-text">{credits}</span>{" "}
              credits
            </p>
          </div>

          {/* Features */}
          <ul className="mt-6 flex-1 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.5L6.5 12L13 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-text">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA — custom volumes go to sales, everything else is self-serve */}
          <div className="mt-8">
            <Button
              variant={popular ? "primary" : "ghost"}
              size="md"
              href={totalPrice === "Contact Us" ? "/contact" : registerUrl}
              className="w-full"
            >
              {totalPrice === "Contact Us" ? "Contact Us" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </AnimatedEntry>
  );
}
