import Link from "next/link";
import Image from "next/image";

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "API Docs", href: "/docs" },
];

const solutionLinks = [
  { label: "For Agencies", href: "/for-agencies" },
  { label: "For Developers", href: "/for-developers" },
  { label: "For SMEs", href: "/for-smes" },
];

const connectLinks = [
  { label: "WhatsApp", href: "https://wa.me/94XXXXXXXXX", external: true },
  { label: "Email", href: "mailto:hello@smsbuddy.lk", external: false },
  { label: "Get Started", href: "/get-started", external: false },
];

export function Footer() {
  return (
    <footer className="bg-background relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/smsbuddy-logo.png"
                alt="SMSBuddy"
                width={180}
                height={48}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-text-light text-sm leading-relaxed">
              Your friendly SMS gateway
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="font-heading font-semibold text-secondary mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-light hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions column */}
          <div>
            <h4 className="font-heading font-semibold text-secondary mb-4">
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-light hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h4 className="font-heading font-semibold text-secondary mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-light hover:text-primary text-sm transition-colors duration-200"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-light text-sm">
            &copy; 2025 SMS Buddy. All rights reserved.
          </p>
        </div>
      </div>

      {/* Buddy mascot — bottom right */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 opacity-20 lg:opacity-40 pointer-events-none">
        <Image
          src="/smsbuddy-mascot.png"
          alt=""
          width={200}
          height={200}
          className="h-32 md:h-40 lg:h-48 w-auto"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
