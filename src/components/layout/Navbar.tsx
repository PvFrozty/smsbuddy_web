"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { registerUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "For Developers", href: "/for-developers" },
  { label: "For SMEs", href: "/for-smes" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "backdrop-blur-md bg-background/80 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 md:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="group">
            <Image
              src="/smsbuddy-logo.png"
              alt="SMSBuddy"
              width={180}
              height={48}
              className="h-14 w-auto transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-transparent hover:bg-background-alt px-4 py-2 rounded-full text-sm font-medium text-text transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href={registerUrl} size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-background-alt transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="block w-5 h-0.5 bg-secondary rounded-full" />
            <span className="block w-5 h-0.5 bg-secondary rounded-full mt-1.5" />
            <span className="block w-4 h-0.5 bg-secondary rounded-full mt-1.5" />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
