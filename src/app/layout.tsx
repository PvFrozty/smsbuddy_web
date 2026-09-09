import type { Metadata } from "next";
import { plusJakartaSans, inter, jetbrainsMono, ubuntu } from "@/lib/fonts";
import { siteConfig } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConversionTracking } from "@/components/analytics/ConversionTracking";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SMS Buddy — Business SMS for Sri Lanka",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${ubuntu.variable} bg-background text-text font-body antialiased`}
      >
        <script
          type="application/json"
          id="smsbuddy-design-contract"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              THESIS:
                "Make business SMS tangible beside a direct account-creation CTA.",
              OWN_WORLD:
                "Cobalt retail-sign typography, white canvas, pale sky messaging workspace, flat geometric controls.",
              STORY:
                "Understand the offer, preview a message, learn setup and credit conditions, create an account.",
              FIRST_VIEWPORT:
                "Centered headline and signup action above a full-width interactive composer and realistic recipient phone.",
              FORM: "Retail window signage translated into a messaging workspace, candidate 3, seed 55f202a5.",
              FINISH:
                "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md",
            }),
          }}
        />
        <a className="sb-skip-link" href="#main-content">
          Skip to content
        </a>
        <ConversionTracking />
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
