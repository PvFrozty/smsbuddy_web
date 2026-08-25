import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark hand-drawn-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
  secondary:
    "bg-secondary text-text-on-dark hover:bg-secondary-light active:bg-secondary-light hand-drawn-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
  ghost:
    "bg-transparent text-text hover:bg-background-alt border-2 border-border",
  accent:
    "bg-accent text-secondary hover:bg-accent-light active:bg-accent-light hand-drawn-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-heading font-semibold transition-all duration-200 cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    // Links off-site (portal, WhatsApp, docs) open in a new tab by default so
    // visitors keep the marketing page they were reading.
    const isExternal = /^https?:\/\//.test(href);
    const linkTarget = target ?? (isExternal ? "_blank" : undefined);
    const linkRel =
      rel ?? (linkTarget === "_blank" ? "noopener noreferrer" : undefined);

    return (
      <Link href={href} target={linkTarget} rel={linkRel} className={classes}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
