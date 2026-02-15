import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FloatingBubbles } from "@/components/ui/FloatingBubbles";
import { InlineCTA } from "@/components/cta/InlineCTA";
import { SetupAssistanceCTA } from "@/components/cta/SetupAssistanceCTA";
import { QueueVisualizer } from "@/components/features/QueueVisualizer";
import { CreditPoolDiagram } from "@/components/features/CreditPoolDiagram";
import { MaskShieldIcon } from "@/illustrations/MaskShieldIcon";
import { QueuePipeIcon } from "@/illustrations/QueuePipeIcon";
import { CreditCoinIcon } from "@/illustrations/CreditCoinIcon";
import { SmsBubbleIcon } from "@/illustrations/SmsBubbleIcon";
import { PackageBoxIcon } from "@/illustrations/PackageBoxIcon";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
} from "@/animations/variants";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Features",
  description:
    "Discover SMS Buddy's powerful features: multi-mask management, queue manager with retries, flexible credit sharing, and developer-friendly API.",
};

/* ------------------------------------------------------------------ */
/*  Helper: Feature list item with check icon                          */
/* ------------------------------------------------------------------ */

function FeatureCheck({
  children,
  color = "#4ECDC4",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-5 w-5 shrink-0"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span className="text-base leading-relaxed text-text-light">{children}</span>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper: Feature card with icon                                     */
/* ------------------------------------------------------------------ */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <AnimatedEntry variants={fadeInUp}>
      <div className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hand-drawn-shadow hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          {icon}
        </div>
        <h4 className="mb-2 font-heading text-lg font-bold text-secondary">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-text-light">{description}</p>
      </div>
    </AnimatedEntry>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper: Split panel (portal vs API)                                */
/* ------------------------------------------------------------------ */

function SendingPanel({
  title,
  badge,
  badgeVariant,
  icon,
  items,
}: {
  title: string;
  badge: string;
  badgeVariant: "coral" | "navy" | "yellow" | "teal" | "outline";
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 hand-drawn-shadow md:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          {icon}
        </div>
        <div>
          <Badge variant={badgeVariant}>{badge}</Badge>
          <h4 className="mt-1 font-heading text-lg font-bold text-secondary">
            {title}
          </h4>
        </div>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <FeatureCheck key={item}>{item}</FeatureCheck>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function FeaturesPage() {
  return (
    <>
      {/* ============================================================= */}
      {/*  Hero Banner                                                    */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden bg-background pb-8 pt-28 md:pb-12 md:pt-36 lg:pt-40">
        <FloatingBubbles count={5} className="opacity-60" />

        <Container>
          <div className="relative flex flex-col items-center text-center">
            <AnimatedEntry variants={scaleIn}>
              <Badge variant="coral" className="mb-6">
                Features
              </Badge>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp}>
              <h1 className="max-w-3xl font-heading text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
                Everything Under the Hood
              </h1>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.15}>
              <p className="mt-6 max-w-2xl text-lg text-text-light md:text-xl">
                Discover the features that make SMS Buddy different from every
                other gateway. Built for reliability, designed for humans, and
                priced without the subscription trap.
              </p>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.3}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="primary" size="lg" href="/contact">
                  Get Started
                </Button>
                <Button variant="ghost" size="lg" href="/pricing">
                  View Pricing
                </Button>
              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </section>

      {/* ============================================================= */}
      {/*  Section 1: SMS Masks & Multi-Brand Management                  */}
      {/* ============================================================= */}
      <WavyDivider variant="cream-to-white" />

      <section className="bg-surface py-20 md:py-28 lg:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: illustration + icon cluster */}
            <AnimatedEntry variants={fadeInLeft}>
              <div className="relative flex justify-center">
                {/* Large shield icon */}
                <div className="relative">
                  <MaskShieldIcon className="h-48 w-48 md:h-56 md:w-56" />

                  {/* Floating brand badges */}
                  <div className="absolute -right-4 -top-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 font-heading text-xs font-bold text-primary shadow-sm">
                    ShopMax
                  </div>
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-xl border border-success/20 bg-success/10 px-3 py-1.5 font-heading text-xs font-bold text-success shadow-sm">
                    FreshBite
                  </div>
                  <div className="absolute -bottom-2 right-4 rounded-xl border border-secondary/20 bg-secondary/10 px-3 py-1.5 font-heading text-xs font-bold text-secondary shadow-sm">
                    TechCorp
                  </div>
                </div>
              </div>
            </AnimatedEntry>

            {/* Right: content */}
            <AnimatedEntry variants={fadeInRight}>
              <div>
                <Badge variant="navy" className="mb-4">
                  Multi-Brand
                </Badge>
                <h2 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
                  SMS Masks & Multi-Brand Management
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-light">
                  Managing multiple brands shouldn&apos;t mean juggling multiple
                  accounts. SMS Buddy lets you create and manage all your sender
                  IDs from a single dashboard, with shared credits and unified
                  reporting.
                </p>

                <ul className="mt-8 space-y-4">
                  <FeatureCheck>
                    Register unlimited masks / sender IDs
                  </FeatureCheck>
                  <FeatureCheck>
                    Manage all brands from one dashboard
                  </FeatureCheck>
                  <FeatureCheck>
                    TRC-compliant mask registration assistance
                  </FeatureCheck>
                  <FeatureCheck>
                    Instant switching between masks when sending
                  </FeatureCheck>
                </ul>
              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </section>

      {/* ============================================================= */}
      {/*  Section 2: Send Your Way                                       */}
      {/* ============================================================= */}
      <WavyDivider variant="white-to-cream" />

      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Flexible Sending"
            title="Send Your Way"
            subtitle="Whether you prefer a visual portal or a clean API, SMS Buddy gives you full control over how you send."
          />

          <AnimatedEntry
            variants={staggerContainer}
            className="grid gap-6 lg:grid-cols-2"
          >
            <AnimatedEntry variants={fadeInLeft}>
              <SendingPanel
                title="Web Portal"
                badge="No Code"
                badgeVariant="teal"
                icon={<SmsBubbleIcon className="h-8 w-8" />}
                items={[
                  "Create and manage contact lists visually",
                  "Import contacts from Excel or CSV files",
                  "Segment contacts with tags and groups",
                  "Schedule sends for the perfect time",
                  "Track delivery status in real time",
                ]}
              />
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInRight}>
              <SendingPanel
                title="Developer API"
                badge="REST API"
                badgeVariant="navy"
                icon={<PackageBoxIcon className="h-8 w-8" />}
                items={[
                  "Clean, RESTful API with full documentation",
                  "Webhook callbacks for delivery status updates",
                  "SDK examples in popular languages",
                  "Sandbox environment for testing",
                  "Rate limiting and automatic queuing built in",
                ]}
              />
            </AnimatedEntry>
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============================================================= */}
      {/*  Section 3: Queue Manager & Delivery Intelligence               */}
      {/* ============================================================= */}
      <WavyDivider variant="cream-to-white" />

      <section className="bg-surface py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Reliability"
            title="Queue Manager & Delivery Intelligence"
            subtitle="Never lose a message. Our queue manager handles ordering, retries, and delivery tracking so you can focus on your business."
          />

          {/* Full-width Queue Visualizer */}
          <AnimatedEntry variants={fadeInUp} className="mb-16">
            <QueueVisualizer />
          </AnimatedEntry>

          {/* Feature cards below the visualizer */}
          <div className="grid gap-6 sm:grid-cols-3">
            <FeatureCard
              icon={<QueuePipeIcon className="h-8 w-8" />}
              title="Ordered Dispatch"
              description="Messages are sent in the exact order they're received. No jumping the queue, no confusion for your customers."
            />
            <FeatureCard
              icon={
                <svg
                  viewBox="0 0 32 32"
                  className="h-8 w-8"
                  fill="none"
                  stroke="#F6A623"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12" />
                  <path d="M28 4l-6 6M28 4v5M28 4h-5" />
                </svg>
              }
              title="Auto-Retry"
              description="Failed deliveries are automatically retried with exponential backoff. Transient errors won't result in lost messages."
            />
            <FeatureCard
              icon={
                <svg
                  viewBox="0 0 32 32"
                  className="h-8 w-8"
                  fill="none"
                  stroke="#4ECDC4"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="4" y="6" width="24" height="20" rx="3" />
                  <path d="M4 14h24" />
                  <path d="M10 20h4M10 24h8" />
                </svg>
              }
              title="Delivery Reports"
              description="Real-time delivery receipts for every message. Know exactly what was delivered, what's pending, and what needs attention."
            />
          </div>
        </Container>
      </section>

      {/* ============================================================= */}
      {/*  Section 4: Flexible Credit Sharing                             */}
      {/* ============================================================= */}
      <WavyDivider variant="white-to-cream" />

      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Smart Credits"
            title="Flexible Credit Sharing"
            subtitle="One credit pool, all your brands. No per-mask billing, no wasted credits, no surprises on your invoice."
          />

          {/* Credit Pool Diagram */}
          <AnimatedEntry variants={fadeInUp} className="mb-16">
            <CreditPoolDiagram />
          </AnimatedEntry>

          {/* Explanation cards */}
          <AnimatedEntry
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-3"
          >
            <AnimatedEntry variants={fadeInUp}>
              <div className="rounded-2xl border border-border bg-surface p-6 text-center hand-drawn-shadow">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15">
                  <svg
                    viewBox="0 0 32 32"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#FFD166"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <rect x="5" y="5" width="22" height="22" rx="4" />
                    <path d="M5 13h22" />
                    <path d="M12 13v14" />
                  </svg>
                </div>
                <h4 className="font-heading text-base font-bold text-secondary">
                  3-Month Validity
                </h4>
                <p className="mt-2 text-sm text-text-light">
                  Credits stay active for a full 3 months from purchase. No
                  rush, no pressure, no expiry surprises.
                </p>
              </div>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp}>
              <div className="rounded-2xl border border-border bg-surface p-6 text-center hand-drawn-shadow">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-success/15">
                  <svg
                    viewBox="0 0 32 32"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#4ECDC4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <circle cx="16" cy="16" r="12" />
                    <path d="M16 10v6l4 4" />
                  </svg>
                </div>
                <h4 className="font-heading text-base font-bold text-secondary">
                  Zero Wastage
                </h4>
                <p className="mt-2 text-sm text-text-light">
                  Credits are shared across all your masks. If one brand is
                  quiet, another can use those credits instead.
                </p>
              </div>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp}>
              <div className="rounded-2xl border border-border bg-surface p-6 text-center hand-drawn-shadow">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <CreditCoinIcon className="h-7 w-7" />
                </div>
                <h4 className="font-heading text-base font-bold text-secondary">
                  Volume Tiers
                </h4>
                <p className="mt-2 text-sm text-text-light">
                  The more credits you buy, the better the rate. Simple volume
                  discounts with no commitment lock-in.
                </p>
              </div>
            </AnimatedEntry>
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============================================================= */}
      {/*  Section 5: API & Setup Assistance                              */}
      {/* ============================================================= */}
      <WavyDivider variant="cream-to-white" />

      <section className="bg-surface py-20 md:py-28 lg:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: content */}
            <AnimatedEntry variants={fadeInLeft}>
              <div>
                <Badge variant="teal" className="mb-4">
                  White-Glove Support
                </Badge>
                <h2 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
                  API & Setup Assistance
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-light">
                  We don&apos;t just hand you an API key and wish you luck. Every
                  SMS Buddy customer gets hands-on setup assistance from our
                  team. We&apos;re based in Sri Lanka and we speak your language
                  &mdash; both literally and technically.
                </p>

                <ul className="mt-8 space-y-4">
                  <FeatureCheck color="#FF6B54">
                    Mask registration help and TRC compliance guidance
                  </FeatureCheck>
                  <FeatureCheck color="#FF6B54">
                    Dedicated API integration support for your dev team
                  </FeatureCheck>
                  <FeatureCheck color="#FF6B54">
                    Testing environment with sandbox credits
                  </FeatureCheck>
                  <FeatureCheck color="#FF6B54">
                    Ongoing technical support via WhatsApp or email
                  </FeatureCheck>
                </ul>

                <div className="mt-8">
                  <Button variant="primary" size="lg" href="/contact">
                    Talk to Our Team
                  </Button>
                </div>
              </div>
            </AnimatedEntry>

            {/* Right: illustration cluster */}
            <AnimatedEntry variants={fadeInRight}>
              <div className="relative flex justify-center">
                {/* Code block mockup */}
                <div className="w-full max-w-sm rounded-2xl border border-border bg-secondary p-5 font-mono text-sm hand-drawn-shadow">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-primary/60" />
                    <span className="h-3 w-3 rounded-full bg-accent/60" />
                    <span className="h-3 w-3 rounded-full bg-success/60" />
                  </div>
                  <div className="space-y-1.5 text-xs leading-relaxed">
                    <p className="text-text-light/50">
                      <span className="text-accent">POST</span>{" "}
                      <span className="text-text-on-dark/70">
                        /api/v1/sms/send
                      </span>
                    </p>
                    <p className="text-text-on-dark/50">{"{"}</p>
                    <p className="pl-4 text-text-on-dark/70">
                      <span className="text-success">&quot;mask&quot;</span>:{" "}
                      <span className="text-primary-light">&quot;ShopMax&quot;</span>,
                    </p>
                    <p className="pl-4 text-text-on-dark/70">
                      <span className="text-success">&quot;to&quot;</span>:{" "}
                      <span className="text-primary-light">
                        &quot;+94771234567&quot;
                      </span>
                      ,
                    </p>
                    <p className="pl-4 text-text-on-dark/70">
                      <span className="text-success">&quot;message&quot;</span>:{" "}
                      <span className="text-primary-light">
                        &quot;Your OTP is 4829&quot;
                      </span>
                    </p>
                    <p className="text-text-on-dark/50">{"}"}</p>
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <p className="text-success/80">
                        <span className="text-success">200</span> OK
                      </p>
                      <p className="text-text-on-dark/50">{"{"}</p>
                      <p className="pl-4 text-text-on-dark/70">
                        <span className="text-success">&quot;status&quot;</span>:{" "}
                        <span className="text-accent">&quot;queued&quot;</span>,
                      </p>
                      <p className="pl-4 text-text-on-dark/70">
                        <span className="text-success">&quot;id&quot;</span>:{" "}
                        <span className="text-primary-light">
                          &quot;msg_8f3k2j...&quot;
                        </span>
                      </p>
                      <p className="text-text-on-dark/50">{"}"}</p>
                    </div>
                  </div>
                </div>

                {/* Floating helper badge */}
                <div className="absolute -bottom-3 -left-2 rounded-xl border border-success/30 bg-success/10 px-3 py-2 shadow-sm sm:-left-6">
                  <p className="font-heading text-xs font-bold text-success">
                    We help you set this up
                  </p>
                </div>
              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </section>

      {/* ============================================================= */}
      {/*  Inline CTA                                                     */}
      {/* ============================================================= */}
      <WavyDivider variant="white-to-cream" />

      <section className="bg-background py-20 md:py-28">
        <Container>
          <InlineCTA
            title="Ready to Get Started?"
            subtitle="Get set up in minutes with our guided onboarding and hands-on support."
            buttonText="Contact Us"
            buttonHref="/contact"
            variant="coral"
          />
        </Container>
      </section>

      {/* ============================================================= */}
      {/*  Setup Assistance CTA                                           */}
      {/* ============================================================= */}
      <SetupAssistanceCTA />
    </>
  );
}
