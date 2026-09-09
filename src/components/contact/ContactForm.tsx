"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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

const businessTypes: { value: BusinessType; label: string; icon: "people" | "code" | "box" | "message" }[] = [
  { value: "agency", label: "Agency / Marketing Team", icon: "people" },
  { value: "developer", label: "Developer / Product Team", icon: "code" },
  { value: "sme", label: "Small / Medium Business", icon: "box" },
  { value: "other", label: "Other", icon: "message" },
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
  const reducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    needs: [],
    message: "",
  });
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);

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
    setPreparedUrl(waUrl);
  };

  if (preparedUrl) {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-success/10 p-12 text-center"
      >
        <span className="inline-flex text-primary"><Icon name="message" size={40} /></span>
        <h3 className="mt-4 font-heading text-2xl font-bold text-secondary">
          Your message is ready
        </h3>
        <p className="mt-2 text-text-light">
          Review and send your prepared message in WhatsApp to contact our team.
          If WhatsApp did not open, use the button below.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={preparedUrl}>Open WhatsApp</Button>
          <Button type="button" variant="ghost" onClick={() => setPreparedUrl(null)}>
            Edit details
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Type Selection */}
      <fieldset>
        <legend className="mb-3 block font-heading text-sm font-semibold text-secondary">
          I am a...
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {businessTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              aria-pressed={formData.businessType === type.value}
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
              <Icon name={type.icon} size={25} />
              <span className="text-xs font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Contact Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Your Name *
          </label>
          <input
            type="text"
            required
            pattern=".*\S.*"
            title="Enter your name"
            id="contact-name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
            placeholder="John Silva"
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Company
          </label>
          <input
            type="text"
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
            placeholder="Acme Lanka (Pvt) Ltd"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Email *
          </label>
          <input
            type="email"
            required
            id="contact-email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-text transition-colors focus:border-primary focus:outline-none"
            placeholder="john@acmelanka.lk"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
            Phone
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            autoComplete="tel"
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
      <fieldset>
        <legend className="mb-3 block font-heading text-sm font-semibold text-secondary">
          What do you need help with?
        </legend>
        <div className="flex flex-wrap gap-2">
          {needOptions.map((need) => (
            <button
              key={need.value}
              type="button"
              aria-pressed={formData.needs.includes(need.value)}
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
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block font-heading text-sm font-semibold text-secondary">
          Tell us more
        </label>
        <textarea
          id="contact-message"
          name="message"
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
      <p className="text-sm text-text-light">
        Continue to WhatsApp with these details, then review and send your message.
      </p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
      >
        Continue in WhatsApp
      </Button>
    </form>
  );
}
