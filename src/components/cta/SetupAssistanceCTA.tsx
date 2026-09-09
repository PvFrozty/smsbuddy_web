import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { registerUrl, siteConfig } from "@/lib/constants";

export function SetupAssistanceCTA() {
  return (
    <section className="border-t border-blue-100 bg-blue-50 py-16 md:py-24" aria-labelledby="setup-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-blue-700">A little help goes a long way.</p>
          <h2 id="setup-heading" className="mt-4 font-heading text-3xl font-bold text-slate-950 sm:text-4xl">
            Your next message starts here.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Create your business account, or ask our team about sender names,
            credit packages and connecting your software.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={registerUrl} size="lg" data-cta-location="setup-assistance">
              Get Started
            </Button>
            <Button href={siteConfig.whatsapp} variant="ghost" size="lg">
              Ask us on WhatsApp
            </Button>
          </div>
          <p className="mt-4 text-sm text-slate-500">Business details and email verification are part of signup.</p>
        </div>
      </Container>
    </section>
  );
}
