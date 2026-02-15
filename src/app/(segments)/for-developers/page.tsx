import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { PillarCard } from "@/components/features/PillarCard";
import { InlineCTA } from "@/components/cta/InlineCTA";
import { SetupAssistanceCTA } from "@/components/cta/SetupAssistanceCTA";
import { CodeSnippetShowcase } from "@/components/code/CodeSnippetShowcase";
import { QueuePipeIcon } from "@/illustrations/QueuePipeIcon";
import { SmsBubbleIcon } from "@/illustrations/SmsBubbleIcon";
import { PackageBoxIcon } from "@/illustrations/PackageBoxIcon";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/animations/variants";

export const metadata = {
  title: "For Developers",
  description:
    "Developer-friendly SMS API with clean REST endpoints, queue management, retry logic, and hands-on integration support.",
};

const valueProps = [
  {
    icon: <SmsBubbleIcon className="h-10 w-10" />,
    title: "Clean REST API",
    description:
      "Simple, well-documented endpoints that follow REST conventions. Send an SMS with a single POST request -- no SDKs to install, no complex auth flows.",
  },
  {
    icon: <QueuePipeIcon className="h-10 w-10" />,
    title: "Built-in Queue & Retries",
    description:
      "Our queue manager handles rate limiting, automatic retries, and delivery confirmations behind the scenes. Your messages always get through.",
  },
  {
    icon: <PackageBoxIcon className="h-10 w-10" />,
    title: "Hands-On Integration Support",
    description:
      "Stuck on an edge case? Our engineering team provides direct support to help you integrate, test, and go live faster than any other provider.",
  },
];

const apiFeatures = [
  {
    title: "Webhook Callbacks",
    description:
      "Receive real-time delivery status updates at your endpoint. Know instantly when a message is delivered, failed, or pending.",
  },
  {
    title: "Delivery Status Reports",
    description:
      "Query delivery status for any message via API. Get detailed reports including timestamps, carrier codes, and retry history.",
  },
  {
    title: "Sandbox Testing",
    description:
      "Test your integration without sending real messages or spending credits. Our sandbox mirrors production behavior exactly.",
  },
  {
    title: "Rate Limiting",
    description:
      "Intelligent rate limiting that adapts to carrier requirements. We handle the throttling so you can send at full speed without worrying about blocks.",
  },
  {
    title: "Batch Sending",
    description:
      "Send to thousands of recipients in a single API call. Our queue processes each message individually while you get a single batch reference ID.",
  },
];

export default function ForDevelopers() {
  return (
    <>
      {/* ============ Hero ============ */}
      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedEntry variants={fadeInUp}>
              <Badge variant="teal" className="mb-6">
                For Developers
              </Badge>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.1}>
              <h1 className="font-heading text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
                Plug In SMS. Ship Faster.
              </h1>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-text-light md:text-xl">
                A clean REST API with built-in queue management, automatic
                retries, and delivery tracking. No bloated SDKs, no complex
                configurations -- just send a POST request and you are live.
              </p>
            </AnimatedEntry>

            <AnimatedEntry variants={fadeInUp} delay={0.3}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button variant="primary" size="lg" href="/contact">
                  Get Your API Key
                </Button>
                <Button variant="ghost" size="lg" href="#api-features">
                  Explore API Features
                </Button>
              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="cream-to-white" />

      {/* ============ Code Showcase ============ */}
      <section className="bg-surface py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Quick Start"
            title="Send an SMS in 5 Lines"
            subtitle="Pick your language, copy the snippet, and start sending. It really is that simple."
          />

          <AnimatedEntry variants={fadeInUp}>
            <div className="mx-auto max-w-3xl">
              <CodeSnippetShowcase />
            </div>
          </AnimatedEntry>
        </Container>
      </section>

      {/* ============ Divider ============ */}
      <WavyDivider variant="white-to-cream" />

      {/* ============ Value Props ============ */}
      <section className="bg-background py-20 md:py-28 lg:py-32">
        <Container>
          <SectionHeading
            badge="Developer Experience"
            title="Built by Developers, for Developers"
            subtitle="We obsess over the details so you can focus on building your product."
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
      <WavyDivider variant="cream-to-white" />

      {/* ============ API Features ============ */}
      <section
        id="api-features"
        className="bg-surface py-20 md:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            badge="API Features"
            title="Everything You Need to Integrate"
            subtitle="Robust features that handle the complexity of SMS delivery so your code stays clean."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apiFeatures.map((feature, i) => (
              <AnimatedEntry
                key={feature.title}
                variants={fadeInUp}
                delay={i * 0.08}
              >
                <div className="rounded-2xl border border-border bg-[#FFF5EB] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-success/15">
                    <svg
                      className="h-4 w-4 text-success"
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
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-secondary">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-light">
                    {feature.description}
                  </p>
                </div>
              </AnimatedEntry>
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-16">
            <InlineCTA
              title="Get Your API Key"
              subtitle="Start integrating SMS into your product today. Free sandbox included."
              buttonText="Contact Us"
              buttonHref="/contact"
              variant="navy"
            />
          </div>
        </Container>
      </section>

      {/* ============ Setup Assistance CTA ============ */}
      <SetupAssistanceCTA />
    </>
  );
}
