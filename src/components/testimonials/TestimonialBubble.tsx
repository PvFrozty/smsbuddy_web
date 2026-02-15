import { cn } from "@/lib/utils";
import { PhoneFrame } from "@/illustrations/PhoneFrame";

interface TestimonialBubbleProps {
  name: string;
  company: string;
  message: string;
  mask: string;
  className?: string;
}

export function TestimonialBubble({
  name,
  company,
  message,
  mask,
  className,
}: TestimonialBubbleProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <PhoneFrame className="w-48 sm:w-52">
        <div className="flex h-full flex-col bg-background">
          {/* Header with mask name */}
          <div className="flex items-center gap-2 border-b border-border bg-white px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
              <span className="text-[9px] font-bold text-white">
                {mask.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <p className="text-xs font-semibold text-secondary">{mask}</p>
          </div>

          {/* Message area */}
          <div className="flex flex-1 flex-col justify-center p-3">
            <div className="relative rounded-2xl rounded-br-md bg-primary px-3 py-2.5">
              <p className="text-xs leading-relaxed text-white">{message}</p>
              {/* Tail */}
              <svg
                width="10"
                height="8"
                viewBox="0 0 12 10"
                fill="none"
                className="absolute -bottom-1 right-0 scale-x-[-1]"
                aria-hidden="true"
              >
                <path
                  d="M0 0C0 0 2 8 12 10C6 8 4 4 4 0H0Z"
                  fill="var(--color-primary)"
                />
              </svg>
            </div>
          </div>
        </div>
      </PhoneFrame>

      {/* Name and company below */}
      <div className="mt-4 text-center">
        <p className="font-heading text-sm font-semibold text-secondary">
          {name}
        </p>
        <p className="text-xs text-text-light">{company}</p>
      </div>
    </div>
  );
}
