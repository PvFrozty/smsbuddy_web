import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { BuddyWaving } from "@/illustrations/BuddyWaving";
import { SmsBubbleIcon } from "@/illustrations/SmsBubbleIcon";
import { ContactForm } from "@/components/contact/ContactForm";
import { registerUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Get started with SMS Buddy. Contact us for setup assistance, API integration help, or to get your SMS masks approved.",
};

const contactOptions = [
  {
    icon: "💬",
    title: "Chat on WhatsApp",
    description: "Get instant help from our team",
    action: "https://wa.me/94XXXXXXXXX",
    actionLabel: "Open WhatsApp",
  },
  {
    icon: "📧",
    title: "Email Us",
    description: "For detailed inquiries and documentation",
    action: "mailto:hello@smsbuddy.lk",
    actionLabel: "Send Email",
  },
  {
    icon: "📞",
    title: "Call Us",
    description: "Speak directly with our team",
    action: "tel:+94XXXXXXXXX",
    actionLabel: "Call Now",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <Container className="text-center">
          <Badge variant="coral">Get Started</Badge>
          <h1 className="mt-4 font-heading text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
            Let&apos;s Get You Sending
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-light">
            Whether you need help setting up your masks, integrating our API, or
            just want to learn more — we&apos;re here for you. That&apos;s what
            buddies are for.
          </p>

          {/* Self-serve signup — for people who already know what they need */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border-2 border-primary/20 bg-surface p-6 text-center sm:p-8">
            <h2 className="font-heading text-xl font-bold text-secondary sm:text-2xl">
              Already know what you need?
            </h2>
            <p className="mt-2 text-text-light">
              Create your SMS Buddy account on the portal and start sending
              right away. No waiting, no subscription.
            </p>
            <div className="mt-6">
              <Button variant="primary" size="lg" href={registerUrl}>
                Create Your Account
              </Button>
            </div>
          </div>
        </Container>

        {/* Decorative buddy */}
        <div className="pointer-events-none absolute right-8 bottom-0 hidden opacity-20 lg:block">
          <BuddyWaving className="h-40 w-40" />
        </div>
      </section>

      <WavyDivider variant="cream-to-white" />

      {/* Contact Options */}
      <section className="bg-surface py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {contactOptions.map((option) => (
              <a
                key={option.title}
                href={option.action}
                className="group flex flex-col items-center rounded-2xl border-2 border-border bg-background p-8 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <span className="text-4xl">{option.icon}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-secondary">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm text-text-light">
                  {option.description}
                </p>
                <span className="mt-4 font-heading text-sm font-semibold text-primary group-hover:underline">
                  {option.actionLabel} →
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <WavyDivider variant="white-to-cream" />

      {/* Contact Form */}
      <section className="py-20">
        <Container>
          <SectionHeading
            badge="Setup Assistance"
            title="Tell Us What You Need"
            subtitle="Fill out the form and our team will get back to you within a few hours with a personalized setup plan."
          />

          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </Container>
      </section>

      <WavyDivider variant="cream-to-white" />

      {/* What to Expect */}
      <section className="bg-surface py-16">
        <Container>
          <SectionHeading
            title="What Happens Next?"
            subtitle="After you reach out, here's how we get you live."
          />

          <div className="mx-auto max-w-3xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-border" />

              {[
                {
                  step: "1",
                  title: "We Review Your Needs",
                  description:
                    "Our team reviews your form and understands your messaging requirements — masks, volume, API or portal, compliance needs.",
                  time: "Within 2 hours",
                },
                {
                  step: "2",
                  title: "Setup & Mask Registration",
                  description:
                    "We help register your SMS masks with operators, ensure TRC compliance, and set up your account with the right credit pack.",
                  time: "1-2 business days",
                },
                {
                  step: "3",
                  title: "Integration Support",
                  description:
                    "For API users, we provide sandbox access, walk through the documentation, and help debug your integration live.",
                  time: "Same day",
                },
                {
                  step: "4",
                  title: "You're Live!",
                  description:
                    "Start sending promotional and transactional SMS to your customers with full delivery tracking and queue management.",
                  time: "Ready to send",
                },
              ].map((item) => (
                <div key={item.step} className="relative mb-10 ml-14">
                  <div className="absolute -left-14 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <div className="rounded-2xl bg-background p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold text-secondary">
                        {item.title}
                      </h3>
                      <Badge variant="teal">{item.time}</Badge>
                    </div>
                    <p className="mt-2 text-text-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-secondary py-20">
        <Container className="text-center">
          <SmsBubbleIcon className="mx-auto mb-6 h-16 w-16 opacity-80" />
          <h2 className="font-heading text-3xl font-bold text-text-on-dark sm:text-4xl">
            Ready to Be Buddies?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-on-dark/80">
            Join businesses across Sri Lanka who trust SMS Buddy for their
            messaging needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 font-heading text-lg font-semibold text-secondary transition-all hover:bg-accent-light"
            >
              Create Your Account
            </a>
            <a
              href="https://wa.me/94XXXXXXXXX"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-text-on-dark/30 px-8 py-4 font-heading text-lg font-semibold text-text-on-dark transition-all hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
            <a
              href="mailto:hello@smsbuddy.lk"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-text-on-dark/30 px-8 py-4 font-heading text-lg font-semibold text-text-on-dark transition-all hover:bg-white/10"
            >
              Email Us
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
