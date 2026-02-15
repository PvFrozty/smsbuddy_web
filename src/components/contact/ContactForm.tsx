"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

type BusinessType = "agency" | "developer" | "sme" | "other";
type NeedType = "masks" | "api" | "portal" | "credits" | "compliance" | "other";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: BusinessType | "";
  needs: NeedType[];
  message: string;
}

const businessTypes: { value: BusinessType; label: string; emoji: string }[] = [
  { value: "agency", label: "Agency / Marketing Team", emoji: "🏢" },
  { value: "developer", label: "Developer / Product Team", emoji: "💻" },
  { value: "sme", label: "Small / Medium Business", emoji: "🏪" },
  { value: "other", label: "Other", emoji: "✨" },
];

const needOptions: { value: NeedType; label: string }[] = [
  { value: "masks", label: "SMS Mask Setup" },
  { value: "api", label: "API Integration" },
  { value: "portal", label: "Portal Access" },
  { value: "credits", label: "Credit Packages" },
  { value: "compliance", label: "TRC Compliance Help" },
  { value: "other", label: "Something Else" },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    needs: [],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const toggleNeed = (need: NeedType) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter((n) => n !== need)
        : [...prev.needs, need],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Build a WhatsApp message from the form data
    const lines = [
      `Hi! I'd like to get started with SMS Buddy.`,
      ``,
      `*Name:* ${formData.name}`,
      formData.company ? `*Company:* ${formData.company}` : "",
      `*Email:* ${formData.email}`,
      formData.phone ? `*Phone:* ${formData.phone}` : "",
      formData.businessType ? `*Type:* ${businessTypes.find((t) => t.value === formData.businessType)?.label}` : "",
      formData.needs.length > 0
        ? `*Needs:* ${formData.needs.map((n) => needOptions.find((o) => o.value === n)?.label).join(", ")}`
        : "",
      formData.message ? `\n*Message:*\n${formData.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-success/10 p-12 text-center"
      >
        <span className="text-5xl">🎉</span>
        <h3 className="mt-4 font-heading text-2xl font-bold text-secondary">
          We Got Your Message!
        </h3>
        <p className="mt-2 text-text-light">
          Our team will review your needs and get back to you within a few hours.
          Welcome to the SMS Buddy family!
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Type Selection */}
      <div>
        <label className="mb-3 block font-heading text-sm font-semibold text-secondary">
          I am a...
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {businessTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, businessType: type.value }))
              }
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all",
                formData.businessType === type.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-surface text-text-light hover:border-primary/30"
              )}
            >
              <span className="text-2xl">{type.emoji}</span>
              <span className="text-xs font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
            placeholder="John Silva"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
            placeholder="Acme Lanka (Pvt) Ltd"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
            placeholder="john@acmelanka.lk"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
            placeholder="+94 77 123 4567"
          />
        </div>
      </div>

      {/* What Do You Need */}
      <div>
        <label className="mb-3 block font-heading text-sm font-semibold text-secondary">
          What do you need help with?
        </label>
        <div className="flex flex-wrap gap-2">
          {needOptions.map((need) => (
            <button
              key={need.value}
              type="button"
              onClick={() => toggleNeed(need.value)}
              className={cn(
                "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all",
                formData.needs.includes(need.value)
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-text-light hover:border-primary/30"
              )}
            >
              {need.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
          Tell us more
        </label>
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          rows={4}
          className="w-full resize-none rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
          placeholder="How many SMS do you plan to send? What kind of messages? Any specific requirements?"
        />
      </div>

      {/* Submit */}
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-error"
          >
            Something went wrong. Please try again or contact us on WhatsApp.
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
