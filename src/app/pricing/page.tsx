"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NoSubscriptionStamp } from "@/components/pricing/NoSubscriptionStamp";
import { PackCard } from "@/components/pricing/PackCard";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { SetupAssistanceCTA } from "@/components/cta/SetupAssistanceCTA";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import { registerUrl, smsPackages } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────
// Highlighted Packs (shown as hero cards)
// ──────────────────────────────────────────────

const highlightedPacks = [
  {
    code: "SB5X",
    name: "SB5X",
    description: "Great for small campaigns and regular outreach.",
    credits: "5,000",
    pricePerSms: "LKR 0.56",
    totalPrice: "LKR 2,900",
    features: [
      "5,000 SMS credits",
      "3-month validity",
      "All sender masks",
      "Portal + Excel import",
      "API access included",
    ],
    color: "coral" as const,
  },
  {
    code: "SB30X",
    name: "SB30X",
    description: "Most popular for growing businesses and teams.",
    credits: "30,000",
    pricePerSms: "LKR 0.53",
    totalPrice: "LKR 17,400",
    features: [
      "30,000 SMS credits",
      "3-month validity",
      "All sender masks",
      "Full portal + API access",
      "Queue manager + retries",
      "Priority support",
    ],
    popular: true,
    color: "navy" as const,
  },
  {
    code: "SB100X",
    name: "SB100X",
    description: "Best value for high-volume senders and agencies.",
    credits: "100,000",
    pricePerSms: "LKR 0.48",
    totalPrice: "LKR 58,000",
    features: [
      "100,000 SMS credits",
      "3-month validity",
      "Unlimited sender masks",
      "Full portal + API access",
      "Priority queue + retries",
      "Dedicated support",
    ],
    color: "yellow" as const,
  },
];

// ──────────────────────────────────────────────
// FAQ Data
// ──────────────────────────────────────────────

const faqs = [
  {
    question: "How long do credits last?",
    answer:
      "All SMS credits are valid for 3 months from the date of purchase. You can use them across any sender mask on your account during that period.",
  },
  {
    question: "Can I share credits between masks?",
    answer:
      "Yes! All your credits come from one shared pool. You can use them with any sender mask on your account without restrictions.",
  },
  {
    question: "What is the Pay As You Go option?",
    answer:
      "SMPAYG lets you send individual SMS at LKR 0.60 per message with no pack commitment. It's perfect for testing the platform or very low-volume sending.",
  },
  {
    question: "What happens when credits expire?",
    answer:
      "Unused credits expire after the 3-month validity period. You can top up anytime before or after expiry. There are no penalties.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No, setup is completely free. Our team provides hands-on assistance with account setup, mask registration, and integration guidance at no extra cost.",
  },
  {
    question: "Can I upgrade to a larger pack mid-cycle?",
    answer:
      "Yes! You can purchase an additional pack anytime. New credits are added to your existing pool and have their own 3-month validity from the purchase date.",
  },
];

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function formatLKR(amount: number): string {
  if (amount < 1) return `LKR ${amount.toFixed(2)}`;
  return `LKR ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ──────────────────────────────────────────────
// FAQ Accordion Item
// ──────────────────────────────────────────────

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between py-5 text-left transition-colors hover:text-primary"
      >
        <span className="pr-4 font-heading text-base font-semibold text-secondary md:text-lg">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background text-text-light"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1V13M1 7H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-text-light md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // All packages except SMPAYG for the table
  const tablePacks = smsPackages.filter((p) => p.code !== "SMPAYG");

  return (
    <main>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden bg-background pb-8 pt-28 md:pt-36 lg:pt-40">
        <Container>
          <div className="flex flex-col items-center text-center">
            <AnimatedEntry variants={fadeInUp}>
              <Badge variant="coral" className="mb-6">
                Simple Pricing
              </Badge>
              <h1 className="font-heading text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
                One Price. No Surprises.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-text-light md:text-xl">
                No monthly subscriptions. No hidden fees. Buy credits, use them
                within 3 months. The more you buy, the less you pay per SMS.
              </p>
            </AnimatedEntry>

            {/* Decorative Stamp */}
            <div className="mt-8">
              <NoSubscriptionStamp />
            </div>
          </div>
        </Container>
      </section>

      {/* ============ Pay As You Go Banner ============ */}
      <section className="bg-background pb-4">
        <Container>
          <AnimatedEntry variants={fadeInUp}>
            <div className="mx-auto max-w-xl rounded-2xl border-2 border-dashed border-border bg-surface p-5 text-center">
              <div className="flex items-center justify-center gap-3">
                <Badge variant="outline">SMPAYG</Badge>
                <span className="font-heading text-sm font-semibold text-secondary">
                  Pay As You Go
                </span>
              </div>
              <p className="mt-2 text-sm text-text-light">
                Send individual SMS at{" "}
                <span className="font-semibold text-primary">
                  LKR 0.60/SMS
                </span>{" "}
                — no pack commitment needed. Perfect for testing or very low
                volume.
              </p>
              <Button
                href={registerUrl}
                variant="ghost"
                size="sm"
                className="mt-3"
              >
                Start Sending
              </Button>
            </div>
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============ Highlighted Pack Cards ============ */}
      <section className="bg-background py-12 md:py-20">
        <Container>
          <SectionHeading
            title="Pick Your Pack"
            subtitle="Choose the size that fits your needs. All packs include full platform access."
          />

          <AnimatedEntry
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {highlightedPacks.map((pack) => (
              <PackCard key={pack.code} {...pack} />
            ))}
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============ Full Package Table ============ */}
      <section className="bg-background pb-12">
        <Container>
          <AnimatedEntry variants={fadeInUp}>
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-background">
                <h3 className="font-heading text-lg font-semibold text-secondary">
                  All Packages
                </h3>
                <p className="text-sm text-text-light">
                  Compare all available SMS credit packs. Credits valid for 3
                  months.
                </p>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-background/50">
                      <th className="px-6 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-text-light">
                        Package
                      </th>
                      <th className="px-6 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-text-light text-right">
                        SMS Count
                      </th>
                      <th className="px-6 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-text-light text-right">
                        Total Price
                      </th>
                      <th className="px-6 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-text-light text-right">
                        Per SMS
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablePacks.map((pkg) => {
                      const isHighlighted = ["SB5X", "SB30X", "SB100X"].includes(pkg.code);
                      return (
                        <tr
                          key={pkg.code}
                          className={cn(
                            "border-b border-border transition-colors hover:bg-background/50",
                            isHighlighted && "bg-primary/5"
                          )}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="font-heading text-sm font-semibold text-secondary">
                                {pkg.name}
                              </span>
                              {pkg.code === "SB30X" && (
                                <Badge variant="coral">Popular</Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-heading text-sm font-medium text-text">
                            {pkg.smsCount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right font-heading text-sm font-semibold text-secondary">
                            {formatLKR(pkg.price)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={cn(
                              "inline-block rounded-full px-3 py-1 text-xs font-semibold",
                              isHighlighted
                                ? "bg-primary/10 text-primary"
                                : "bg-background text-text-light"
                            )}>
                              {formatLKR(pkg.perSmsCost)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              href={registerUrl}
                              variant={isHighlighted ? "primary" : "ghost"}
                              size="sm"
                            >
                              Get Started
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List */}
              <div className="md:hidden divide-y divide-border">
                {tablePacks.map((pkg) => {
                  const isHighlighted = ["SB5X", "SB30X", "SB100X"].includes(pkg.code);
                  return (
                    <div
                      key={pkg.code}
                      className={cn(
                        "p-4",
                        isHighlighted && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-sm font-semibold text-secondary">
                            {pkg.name}
                          </span>
                          {pkg.code === "SB30X" && (
                            <Badge variant="coral">Popular</Badge>
                          )}
                        </div>
                        <span className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          isHighlighted
                            ? "bg-primary/10 text-primary"
                            : "bg-background text-text-light"
                        )}>
                          {formatLKR(pkg.perSmsCost)}/SMS
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-text-light">
                          {pkg.smsCount.toLocaleString()} SMS
                        </span>
                        <span className="font-heading font-semibold text-secondary">
                          {formatLKR(pkg.price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="cream-to-white" />

      {/* ============ Calculator ============ */}
      <section className="bg-surface py-20 md:py-28">
        <Container>
          <SectionHeading
            badge="Estimate"
            title="Calculate Your Cost"
            subtitle="Slide to see how much your SMS campaigns will cost and which pack to choose."
          />
          <PricingCalculator />
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="white-to-cream" />

      {/* ============ FAQ ============ */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <SectionHeading
            badge="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know about our pricing and credits."
          />

          <div className="mx-auto max-w-2xl">
            <AnimatedEntry variants={fadeInUp}>
              <div className="rounded-2xl border border-border bg-surface px-6 md:px-8">
                {faqs.map((faq, index) => (
                  <FaqItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaq === index}
                    onToggle={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                  />
                ))}
              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </section>

      {/* ============ Setup CTA ============ */}
      <SetupAssistanceCTA />
    </main>
  );
}
