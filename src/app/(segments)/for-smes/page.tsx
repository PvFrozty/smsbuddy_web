import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { PillarCard } from "@/components/features/PillarCard";
import { InlineCTA } from "@/components/cta/InlineCTA";
import { SetupAssistanceCTA } from "@/components/cta/SetupAssistanceCTA";
import { SmsBubbleIcon } from "@/illustrations/SmsBubbleIcon";
import { CreditCoinIcon } from "@/illustrations/CreditCoinIcon";
import { PackageBoxIcon } from "@/illustrations/PackageBoxIcon";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/animations/variants";

export const metadata = {
  title: "For SMEs",
  description:
    "Simple SMS for small and medium businesses. No technical knowledge needed. Send campaigns from our easy portal.",
};

const valueProps = [
  {
    icon: <SmsBubbleIcon className="h-10 w-10" />,
    title: "Simple Portal",
    description:
      "Create and send SMS campaigns without writing a single line of code. Our web portal walks you through composing, targeting, and sending -- step by step.",
  },
  {
    icon: <PackageBoxIcon className="h-10 w-10" />,
    title: "Import Your Contacts",
    description:
      "Upload your contact list from Excel or CSV, organize recipients into segments, and target the right audience for every campaign.",
  },
  {
    icon: <CreditCoinIcon className="h-10 w-10" />,
    title: "No Monthly Fees",
    description:
      "Pay only for the campaigns you send. Buy credits when you need them and they stay valid for a full 3 months. No subscriptions, no auto-renewals.",
  },
];

const industries = [
  {
    emoji: "🛍️",
    title: "Retail",
    color: "bg-primary/10 text-primary",
    useCases: [
      "Promotional offers and discount codes",
      "Flash sale alerts to loyal customers",
      "Loyalty reward notifications",
      "New arrival announcements",
    ],
  },
  {
    emoji: "🏥",
    title: "Healthcare",
    color: "bg-success/15 text-success",
    useCases: [
      "Appointment reminders and confirmations",
      "Test result notifications",
      "Follow-up care reminders",
      "Prescription refill alerts",
    ],
  },
  {
    emoji: "🎓",
    title: "Education",
    color: "bg-accent/20 text-secondary",
    useCases: [
      "Exam schedule reminders",
      "Fee payment due dates",
      "Parent notification updates",
      "Event and holiday announcements",
    ],
  },
  {
    emoji: "🚚",
    title: "Logistics",
    color: "bg-secondary/10 text-secondary",
    useCases: [
      "Delivery status updates",
      "Tracking link notifications",
      "Driver assignment alerts",
      "Warehouse pickup reminders",
    ],
  },
];

export default function ForSmes() {
  return (
    <>
      {/* ============ Hero ============ */}
      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedEntry variants={fadeInUp}>
              <Badge variant="yellow" className="mb-6">
                For Small &amp; Medium Businesses
              </Badge>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.1}>
              <h1 className="font-heading text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
                Reach Your Customers Without the Complexity
              </h1>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-text-light md:text-xl">
                You do not need telco expertise or a development team to send
                SMS campaigns. SMS Buddy gives you a simple web portal to
                compose messages, import contacts, and reach your customers in
                minutes.
              </p>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.3}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="primary" size="lg" href="/contact">
                  Send Your First Campaign
                </Button>
                <Button variant="ghost" size="lg" href="/pricing">
                  View Pricing
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
            badge="Simple & Powerful"
            title="SMS Made Easy for Your Business"
            subtitle="No coding, no contracts, no complexity. Just a straightforward way to reach your customers."
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

      {/* ============ Industry Use Cases ============ */}
      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Industry Solutions"
            title="SMS for Every Industry"
            subtitle="No matter your business, SMS is the fastest way to reach your customers. Here is how businesses like yours use SMS Buddy."
          />

          <div className="grid gap-8 sm:grid-cols-2">
            {industries.map((industry, i) => (
              <AnimatedEntry
                key={industry.title}
                variants={fadeInUp}
                delay={i * 0.1}
              >
                <div className="rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${industry.color}`}
                      aria-hidden="true"
                    >
                      {industry.emoji}
                    </span>
                    <h3 className="font-heading text-xl font-semibold text-secondary">
                      {industry.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {industry.useCases.map((useCase) => (
                      <li
                        key={useCase}
                        className="flex items-start gap-2.5 text-sm text-text-light"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-success"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedEntry>
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-16">
            <InlineCTA
              title="Send Your First Campaign"
              subtitle="No technical knowledge required. Import your contacts and start sending today."
              buttonText="Get Started"
              buttonHref="/contact"
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
