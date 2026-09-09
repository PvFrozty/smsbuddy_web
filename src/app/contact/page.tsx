import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { registerUrl, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to SMS Buddy about business messaging, sender names, credit packages and API integration in Sri Lanka.",
};

const contactOptions = [
  { title: "WhatsApp", description: "Start a conversation with our team.", action: siteConfig.whatsapp, label: "Open WhatsApp" },
  { title: "Email", description: "Share your questions or requirements.", action: "mailto:hello@smsbuddy.lk", label: "hello@smsbuddy.lk" },
  { title: "Phone", description: "Contact the team by phone.", action: `tel:${siteConfig.phone}`, label: "+94 77 117 2031" },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-white">
      <section className="border-b border-blue-100 bg-blue-50/60 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">A real conversation.<br />A clearer next step.</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Questions about sender names, SMS credits or your integration? Tell us what you want to send, and who you want to reach.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href={registerUrl} size="lg" data-cta-location="contact-hero">Get Started</Button>
              <Button href="#contact-form" variant="ghost" size="lg">Ask a question</Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">Signup includes your business details and email verification.</p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16" aria-label="Contact options">
        <Container>
          <div className="grid gap-5 sm:grid-cols-3">
            {contactOptions.map((option) => (
              <a key={option.title} href={option.action} className="rounded-2xl border border-slate-200 p-6 transition-colors hover:border-blue-400 hover:bg-blue-50/50">
                <h2 className="font-heading text-xl font-semibold text-slate-950">{option.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{option.description}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-blue-700">{option.label} <Icon name="arrow" size={14} style={{display:"inline"}} /></span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact-form" className="scroll-mt-24 pb-16 md:pb-24" aria-labelledby="contact-form-title">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-10">
              <h2 id="contact-form-title" className="mt-3 font-heading text-3xl font-bold text-slate-950">What would you like to do?</h2>
              <p className="mt-4 leading-relaxed text-slate-600">These details prepare a WhatsApp message. You can review it before sending it to our team.</p>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>

      <section className="border-t border-blue-100 bg-blue-50 py-16">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-950">Ready to create your account?</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-600">Register your business and verify your email to begin setting up SMS Buddy.</p>
          <div className="mt-7"><Button href={registerUrl} size="lg" data-cta-location="contact-final">Get Started</Button></div>
        </Container>
      </section>
    </main>
  );
}
