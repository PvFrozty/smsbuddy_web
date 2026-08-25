import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { SmsConversationHero } from "@/components/hero/SmsConversationHero";
import { PillarCard } from "@/components/features/PillarCard";
import { FeatureChatThread } from "@/components/features/FeatureChatThread";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";
import { InlineCTA } from "@/components/cta/InlineCTA";
import { SetupAssistanceCTA } from "@/components/cta/SetupAssistanceCTA";
import { NoSubscriptionStamp } from "@/components/pricing/NoSubscriptionStamp";
import { MaskShieldIcon } from "@/illustrations/MaskShieldIcon";
import { QueuePipeIcon } from "@/illustrations/QueuePipeIcon";
import { CreditCoinIcon } from "@/illustrations/CreditCoinIcon";
import { SmsBubbleIcon } from "@/illustrations/SmsBubbleIcon";
import { registerUrl } from "@/lib/constants";
import { staggerContainer, fadeInUp } from "@/animations/variants";

const pillars = [
  {
    icon: <MaskShieldIcon className="h-10 w-10" />,
    title: "Built for Multi-Brand Teams",
    description:
      "Create unlimited sender masks and manage them all from one account. Perfect for agencies juggling multiple client brands.",
  },
  {
    icon: <QueuePipeIcon className="h-10 w-10" />,
    title: "Engineered for Reliability",
    description:
      "Our queue manager handles retries, rate limits, and delivery confirmations so you never lose a message.",
  },
  {
    icon: <CreditCoinIcon className="h-10 w-10" />,
    title: "No Subscriptions, Just Smart Credits",
    description:
      "Buy credits once and use them for 3 months. No recurring fees, no surprises — just pay for what you send.",
  },
  {
    icon: <SmsBubbleIcon className="h-10 w-10" />,
    title: "Local Experts in SMS",
    description:
      "Based in Sri Lanka, we provide hands-on setup assistance, mask registration guidance, and dedicated support.",
  },
];

const features = [
  {
    icon: <SmsBubbleIcon className="h-8 w-8" />,
    title: "API-Ready OTP Delivery",
    userProblem: "I need to send OTPs from my app",
    buddySolution:
      "Just plug in our API — queues and retries are handled automatically!",
  },
  {
    icon: <MaskShieldIcon className="h-8 w-8" />,
    title: "Multi-Brand Sender IDs",
    userProblem: "I manage 5 brands and need separate sender IDs",
    buddySolution:
      "Create unlimited masks, share one credit pool across all of them.",
  },
  {
    icon: <CreditCoinIcon className="h-8 w-8" />,
    title: "Bulk Promotional Campaigns",
    userProblem: "I want to blast a promotion to 10,000 contacts",
    buddySolution:
      "Import your list, pick a mask, and hit send. We handle the rest!",
  },
];

export default function Home() {
  return (
    <main>
      {/* ============ Section 1: Hero ============ */}
      <SmsConversationHero />

      {/* ============ Divider ============ */}
      <WavyDivider variant="cream-to-white" />

      {/* ============ Section 2: Pillars ============ */}
      <section className="bg-surface py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Why SMS Buddy"
            title="Built for Businesses Like Yours"
            subtitle="Four pillars that make SMS Buddy the go-to messaging platform for Sri Lankan businesses, agencies, and developers."
          />

          <AnimatedEntry
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.title}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="white-to-cream" />

      {/* ============ Section 3: Features as Chat Threads ============ */}
      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="How It Works"
            title="Problems We Solve"
            subtitle="See how SMS Buddy handles real messaging challenges with simple, powerful solutions."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureChatThread
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                userProblem={feature.userProblem}
                buddySolution={feature.buddySolution}
              />
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-16">
            <InlineCTA
              title="Ready to send your first SMS?"
              subtitle="Create your portal account and get set up in minutes with our guided onboarding."
              buttonText="Create Your Account"
              buttonHref={registerUrl}
              variant="coral"
            />
          </div>
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="cream-to-white" />

      {/* ============ Section 4: Testimonials ============ */}
      <section className="bg-surface py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Trusted by Businesses"
            title="What Our Customers Say"
            subtitle="Businesses across Sri Lanka rely on SMS Buddy for their messaging needs."
          />

          <TestimonialCarousel />
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="white-to-cream" />

      {/* ============ Section 5: No Subscription Stamp ============ */}
      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-center gap-8 text-center">
            <AnimatedEntry variants={fadeInUp}>
              <h2 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
                Pay Once. Send for 3 Months.
              </h2>
              <p className="mt-4 max-w-lg text-lg text-text-light">
                No subscriptions, no auto-renewals, no hidden fees. Buy credits
                when you need them and they stay valid for a full 3 months.
              </p>
            </AnimatedEntry>

            <NoSubscriptionStamp />
          </div>
        </Container>
      </section>

      {/* ============ Section 6: Setup Assistance CTA ============ */}
      <SetupAssistanceCTA />
    </main>
  );
}
