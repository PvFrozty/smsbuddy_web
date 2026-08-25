"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { registerUrl } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Agencies", href: "/for-agencies" },
  { label: "For Developers", href: "/for-developers" },
  { label: "For SMEs", href: "/for-smes" },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-secondary/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-background z-50 flex flex-col shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background-alt transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-secondary"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-2 px-6 py-4 flex-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block text-2xl font-heading font-semibold text-secondary py-3 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-6 pb-8" onClick={onClose}>
              <Button href={registerUrl} size="lg" className="w-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
