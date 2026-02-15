import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { fadeInUp } from "@/animations/variants";

interface InlineCTAProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
  variant?: "coral" | "navy";
}

const variantStyles = {
  coral: {
    wrapper: "bg-primary",
    title: "text-white",
    subtitle: "text-white/80",
    button: "accent" as const,
  },
  navy: {
    wrapper: "bg-secondary",
    title: "text-text-on-dark",
    subtitle: "text-text-on-dark/80",
    button: "accent" as const,
  },
};

export function InlineCTA({
  title,
  subtitle,
  buttonText,
  buttonHref,
  variant = "coral",
}: InlineCTAProps) {
  const styles = variantStyles[variant];

  return (
    <AnimatedEntry variants={fadeInUp}>
      <div
        className={cn(
          "rounded-2xl px-8 py-10 text-center md:px-12 md:py-14",
          styles.wrapper
        )}
      >
        <h3
          className={cn(
            "font-heading text-2xl font-bold sm:text-3xl",
            styles.title
          )}
        >
          {title}
        </h3>
        {subtitle && (
          <p className={cn("mt-3 text-base md:text-lg", styles.subtitle)}>
            {subtitle}
          </p>
        )}
        <div className="mt-6">
          <Button variant={styles.button} size="lg" href={buttonHref}>
            {buttonText}
          </Button>
        </div>
      </div>
    </AnimatedEntry>
  );
}
