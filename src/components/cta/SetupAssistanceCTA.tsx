import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { fadeInLeft, fadeInRight } from "@/animations/variants";
import { siteConfig } from "@/lib/constants";

export function SetupAssistanceCTA() {
  return (
    <div>
      <WavyDivider variant="cream-to-navy" />

      <section className="bg-secondary py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            {/* Left — Buddy character */}
            <AnimatedEntry
              variants={fadeInLeft}
              className="flex shrink-0 justify-center lg:w-1/3"
            >
              <Image
                src="/smsbuddy-mascot.png"
                alt="SMSBuddy mascot"
                width={300}
                height={300}
                className="w-48 md:w-56 lg:w-64 drop-shadow-2xl"
              />
            </AnimatedEntry>

            {/* Right — Text + CTA */}
            <AnimatedEntry variants={fadeInRight} className="flex-1 text-center lg:text-left">
              <h2 className="font-heading text-3xl font-bold text-text-on-dark sm:text-4xl lg:text-5xl">
                Need Help Getting Started?
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-on-dark/80">
                Our team provides hands-on setup assistance for every customer.
                From mask registration to API integration, we walk you through
                everything.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  variant="accent"
                  size="lg"
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  href="/contact"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Contact Us
                </Button>
              </div>
            </AnimatedEntry>
          </div>
        </Container>
      </section>
    </div>
  );
}
