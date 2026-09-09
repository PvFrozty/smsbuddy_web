"use client";

import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { TestimonialBubble } from "./TestimonialBubble";
import { fadeInUp } from "@/animations/variants";

const testimonials = [
  {
    name: "Amara Perera",
    company: "FreshMart Colombo",
    message:
      "We send order confirmations to 500+ customers daily. SMS Buddy made it seamless with our branded mask FRESHMART.",
    mask: "FRESHMART",
  },
  {
    name: "Dinesh Rajapaksa",
    company: "CodeLab Solutions",
    message:
      "The API integration took us 30 minutes. OTP delivery is blazing fast and the queue retries saved us countless failed sends.",
    mask: "CODELAB",
  },
  {
    name: "Nishadi Fernando",
    company: "Bloom Agency",
    message:
      "We manage 8 client brands from one account. The multi-mask feature and shared credit pool is a game-changer for agencies.",
    mask: "BLOOM",
  },
];

export function TestimonialCarousel() {
  return (
    <div className="w-full">
      {/* Mobile: horizontal scroll */}
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:hidden">
        {testimonials.map((t) => (
          <div key={t.name} className="min-w-[260px] shrink-0 snap-center">
            <AnimatedEntry variants={fadeInUp}>
              <TestimonialBubble {...t} />
            </AnimatedEntry>
          </div>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        {testimonials.map((t, i) => (
          <AnimatedEntry key={t.name} variants={fadeInUp} delay={i * 0.15}>
            <TestimonialBubble {...t} />
          </AnimatedEntry>
        ))}
      </div>
    </div>
  );
}
