import { cn } from "@/lib/utils";
import { HandDrawnUnderline } from "./HandDrawnUnderline";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  underline?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  underline = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-primary">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "relative inline-block font-heading text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl",
          align === "center" && "mx-auto"
        )}
      >
        {title}
        {underline && (
          <HandDrawnUnderline className="absolute -bottom-2 left-0 w-full" />
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-lg text-text-light md:text-xl",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
