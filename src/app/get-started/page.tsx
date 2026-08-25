import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BuddyWaving } from "@/illustrations/BuddyWaving";
import { registerUrl } from "@/lib/constants";
import { RedirectToRegister } from "./RedirectToRegister";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Create your SMS Buddy account and start sending branded SMS across Sri Lanka.",
  robots: { index: false, follow: true },
};

/**
 * `/get-started` was linked from the navbar and footer before the portal
 * existed. The site is a static export, so redirects cannot be configured in
 * next.config — we forward with a meta refresh (works without JS) plus a
 * client-side replace, and leave a visible link as the final fallback.
 */
export default function GetStartedPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${registerUrl}`} />
      <RedirectToRegister />

      <section className="flex min-h-[80vh] items-center">
        <Container className="text-center">
          <BuddyWaving className="mx-auto mb-8 h-32 w-32 opacity-60" />

          <h1 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
            Taking you to sign up…
          </h1>

          <p className="mx-auto mt-4 max-w-md text-text-light">
            We&apos;re opening the SMS Buddy portal so you can create your
            account. If nothing happens, use the button below.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={registerUrl} variant="primary" size="lg">
              Create Your Account
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Talk to Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
