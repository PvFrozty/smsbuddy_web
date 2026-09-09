import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BuddyWaving } from "@/illustrations/BuddyWaving";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | SMS Buddy" },
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-[80vh] items-center">
      <Container className="text-center">
        <BuddyWaving className="mx-auto mb-8 h-32 w-32 opacity-60" />

        <h1 className="font-heading text-6xl font-bold text-primary sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 font-heading text-2xl font-semibold text-secondary">
          Oops! This message wasn&apos;t delivered
        </h2>

        <p className="mx-auto mt-4 max-w-md text-text-light">
          Looks like this page got lost in the queue. Don&apos;t worry — unlike
          our SMS delivery, some things just can&apos;t be retried.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Contact Us
          </Button>
        </div>
      </Container>
    </main>
  );
}
