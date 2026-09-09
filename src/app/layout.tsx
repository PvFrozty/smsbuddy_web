import type { Metadata } from "next";
import { plusJakartaSans, inter, jetbrainsMono, ubuntu } from "@/lib/fonts";
import { createMetadata } from "@/lib/metadata";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConversionTracking } from "@/components/analytics/ConversionTracking";
import "./globals.css";

export const metadata: Metadata = createMetadata("/");

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
        <SiteStructuredData />
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
