"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FloatingBubbles } from "@/components/ui/FloatingBubbles";
import { PhoneFrame } from "@/illustrations/PhoneFrame";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/animations/variants";

interface ConversationStep {
  type: "typing" | "message";
  sender: "user" | "buddy";
  message?: string;
}

const conversationSteps: ConversationStep[] = [
  { type: "typing", sender: "buddy" },
  {
    type: "message",
    sender: "buddy",
    message:
      "Hi! Your order #1234 has been shipped! Track it here: sms.bdy/track123",
  },
  { type: "typing", sender: "user" },
  { type: "message", sender: "user", message: "Got it, thanks!" },
  { type: "typing", sender: "buddy" },
  {
    type: "message",
    sender: "buddy",
    message:
      "Flash Sale! 30% off this weekend. Use code SAVE30. Shop now!",
  },
];

const TYPING_DURATION = 1200;
const MESSAGE_PAUSE = 600;

const trustIndicators = [
  { label: "95% delivery rate", icon: "signal" },
  { label: "3-month credit validity", icon: "clock" },
  { label: "No monthly fees", icon: "check" },
];

export function SmsConversationHero() {
  const [visibleSteps, setVisibleSteps] = useState<ConversationStep[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= conversationSteps.length) return;

    const step = conversationSteps[currentIndex];
    const delay = step.type === "typing" ? TYPING_DURATION : MESSAGE_PAUSE;

    const timer = setTimeout(() => {
      if (step.type === "typing") {
        // Show typing indicator temporarily
        setVisibleSteps((prev) => [...prev, step]);
        // After typing duration, remove typing and advance to message
        setTimeout(() => {
          setVisibleSteps((prev) => prev.filter((s) => s.type !== "typing"));
          setCurrentIndex((i) => i + 1);
        }, TYPING_DURATION);
      } else {
        setVisibleSteps((prev) => [...prev, step]);
        setCurrentIndex((i) => i + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background pt-24 pb-16 lg:pt-32 lg:pb-20">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />

      <FloatingBubbles />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left side — Text content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <Badge variant="coral" className="mb-6">
              Sri Lanka&apos;s Friendly SMS Gateway
            </Badge>

            <h1 className="font-heading text-4xl font-bold leading-tight text-secondary sm:text-5xl lg:text-6xl">
              Send SMS That Your Customers{" "}
              <span className="text-primary">Actually Read</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-light lg:text-xl">
              Reach customers with 90%+ open rates using branded sender masks.
              No subscriptions, no long-term contracts — just smart credits that
              work for 3 months.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button variant="primary" size="lg" href="/contact">
                Get Started
              </Button>
              <Button variant="ghost" size="lg" href="/features">
                See How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              {trustIndicators.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-text-light"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="var(--color-success)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side — Phone with conversation */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-1 justify-center lg:justify-end"
          >
            <PhoneFrame className="w-64 sm:w-72 lg:w-80">
              {/* Phone screen content */}
              <div className="flex h-full flex-col bg-background">
                {/* Phone header bar */}
                <div className="flex items-center gap-2 border-b border-border bg-white px-3 py-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                    <span className="text-xs font-bold text-white">SB</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary">
                      SMS Buddy
                    </p>
                    <p className="text-[10px] text-text-light">Business SMS</p>
                  </div>
                </div>

                {/* Messages area */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3"
                >
                  {visibleSteps.map((step, index) => {
                    if (step.type === "typing") {
                      return <TypingIndicator key={`typing-${index}`} />;
                    }
                    return (
                      <ChatBubble
                        key={`msg-${index}`}
                        message={step.message!}
                        sender={step.sender}
                      />
                    );
                  })}
                </motion.div>
              </div>
            </PhoneFrame>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
