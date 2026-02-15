import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { PillarCard } from "@/components/features/PillarCard";
import { InlineCTA } from "@/components/cta/InlineCTA";
import { SetupAssistanceCTA } from "@/components/cta/SetupAssistanceCTA";
import { MaskShieldIcon } from "@/illustrations/MaskShieldIcon";
import { CreditCoinIcon } from "@/illustrations/CreditCoinIcon";
import { SmsBubbleIcon } from "@/illustrations/SmsBubbleIcon";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/animations/variants";

export const metadata = {
  title: "For Agencies",
  description:
    "Multi-brand SMS management for agencies. Unlimited masks, shared credit pools, and sub-accounts.",
};

const valueProps = [
  {
    icon: <MaskShieldIcon className="h-10 w-10" />,
    title: "Unlimited Masks",
    description:
      "Register a unique sender ID for every client brand you manage. One dashboard, unlimited masks -- no extra accounts needed.",
  },
  {
    icon: <CreditCoinIcon className="h-10 w-10" />,
    title: "Shared Credit Pool",
    description:
      "Purchase credits once and allocate them flexibly across all your brands. No per-brand billing headaches or wasted balances.",
  },
  {
    icon: <SmsBubbleIcon className="h-10 w-10" />,
    title: "Sub-Accounts",
    description:
      "Give each client their own login with usage visibility and campaign controls, while you keep full oversight from a master account.",
  },
];

const useCases = [
  {
    emoji: "📢",
    title: "Campaign Blasts",
    description:
      "Run seasonal promotions, flash sales, and product launches across multiple client brands simultaneously. Schedule campaigns in advance and track delivery in real time.",
  },
  {
    emoji: "🏥",
    title: "Appointment Reminders",
    description:
      "Send automated appointment reminders for your healthcare clients. Reduce no-shows with timely, branded SMS notifications that patients actually read.",
  },
  {
    emoji: "📦",
    title: "Delivery Notifications",
    description:
      "Keep your e-commerce clients' customers informed with shipping confirmations, tracking updates, and delivery alerts -- all under each brand's own sender ID.",
  },
];

export default function ForAgencies() {
  return (
    <>
      {/* ============ Hero ============ */}
      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedEntry variants={fadeInUp}>
              <Badge variant="coral" className="mb-6">
                For Agencies
              </Badge>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.1}>
              <h1 className="font-heading text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
                One Platform, All Your Brands
              </h1>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-text-light md:text-xl">
                Managing SMS for multiple clients should not mean juggling
                multiple providers. SMS Buddy gives your agency a single
                dashboard to register masks, allocate credits, and launch
                campaigns for every brand in your portfolio.
              </p>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.3}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="primary" size="lg" href="/pricing">
                  View Pricing
                </Button>
                <Button variant="ghost" size="lg" href="/contact">
                  Talk to Us
                </Button>
              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="cream-to-white" />

      {/* ============ Value Props ============ */}
      <section className="bg-surface py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Why Agencies Choose Us"
            title="Built for Multi-Brand Teams"
            subtitle="Everything an agency needs to manage SMS across a growing roster of clients."
          />

          <AnimatedEntry
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {valueProps.map((prop) => (
              <PillarCard
                key={prop.title}
                icon={prop.icon}
                title={prop.title}
                description={prop.description}
              />
            ))}
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="white-to-cream" />

      {/* ============ Use Cases ============ */}
      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Use Cases"
            title="How Agencies Use SMS Buddy"
            subtitle="From promotional blasts to transactional alerts, agencies rely on SMS Buddy for every type of campaign."
          />

          <div className="grid gap-8 md:grid-cols-3">
            {useCases.map((useCase, i) => (
              <AnimatedEntry
                key={useCase.title}
                variants={fadeInUp}
                delay={i * 0.1}
              >
                <div className="rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="mb-4 block text-4xl" aria-hidden="true">
                    {useCase.emoji}
                  </span>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-secondary">
                    {useCase.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-light">
                    {useCase.description}
                  </p>
                </div>
              </AnimatedEntry>
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-16">
            <InlineCTA
              title="Start Managing All Your Brands"
              subtitle="One account, unlimited masks, shared credits. Get started in minutes."
              buttonText="View Pricing"
              buttonHref="/pricing"
              variant="coral"
            />
          </div>
        </Container>
      </section>

      {/* ============ Setup Assistance CTA ============ */}
      <SetupAssistanceCTA />
    </>
  );
}
