import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { registerUrl, smsPackages } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore SMS Buddy credit packs for your business in Sri Lanka. Compare indicative pack totals, find a pack for your usage, and create your account.",
};

const formatPrice = (amount: number) =>
  `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const faqs = [
  {
    question: "How long do my credits last?",
    answer: "Credits are valid for 3 months from purchase. Unused credits expire at the end of that period, so choose a pack that fits your expected usage.",
  },
  {
    question: "Does one message always use one credit?",
    answer: "No. Long messages and messages using Unicode characters may use multiple credits. Check the credit count for your final message before sending, especially when using Sinhala or Tamil.",
  },
  {
    question: "Are these prices final?",
    answer: "The prices on this page are indicative. Confirm the current credit rate, taxes, and any sender-name setup costs with the team or in your account before you buy.",
  },
  {
    question: "What happens after I get started?",
    answer: "You’ll open the SMS Buddy account portal. Set up your account, review the available credit options, and arrange your sender name before sending branded messages. Sender names may require approval.",
  },
];

export default function PricingPage() {
  return (
    <main id="main-content">
      <section className="sb-section border-b border-slate-200 bg-white">
        <div className="sb-shell">
          <div className="max-w-3xl">
            <h1 className="sb-page-heading">A credit pack that fits your next move.</h1>
            <p className="sb-lead mt-6 max-w-2xl">
              Plan your campaigns and customer updates with pay-as-you-go credits.
              Choose what you expect to use, with no monthly subscription.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={registerUrl} className="sb-primary" data-cta-location="pricing-hero">Get Started</Button>
              <Button href="/contact" variant="ghost" className="sb-secondary">Talk to the team</Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">Opens the account portal. Credits are valid for 3 months.</p>
          </div>
        </div>
      </section>

      <section className="sb-section bg-slate-50" aria-labelledby="pack-chooser-heading">
        <div className="sb-shell">
          <div className="mb-8 max-w-2xl">
            <h2 id="pack-chooser-heading" className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Find your pack.</h2>
            <p className="mt-4 leading-relaxed text-slate-600">Start with your expected credit usage. This chooser compares pack sizes and totals so you can plan your spend.</p>
          </div>
          <PricingCalculator />
        </div>
      </section>

      <section className="sb-section bg-white" aria-labelledby="all-packs-heading">
        <div className="sb-shell">
          <div className="mb-8 max-w-2xl">
            <h2 id="all-packs-heading" className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Every option, clearly listed.</h2>
            <p id="pricing-conditions" className="mt-4 leading-relaxed text-slate-600">
              Prices are indicative. Confirm current rates, taxes, and any sender-name setup costs before buying. All credits have a 3-month validity.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
            <table className="w-full text-left text-sm" aria-describedby="pricing-conditions">
              <caption className="sr-only">SMS Buddy indicative credit pricing. Effective rate is the pack total divided by its credit quantity.</caption>
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-5 font-medium">Option</th>
                  <th scope="col" className="px-6 py-5 text-right font-medium">Credits</th>
                  <th scope="col" className="px-6 py-5 text-right font-medium">Indicative total</th>
                  <th scope="col" className="px-6 py-5 text-right font-medium">Effective price / credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {smsPackages.map((pack) => (
                  <tr key={pack.code} className="text-slate-700">
                    <th scope="row" className="px-6 py-5 font-semibold text-slate-950">{pack.name}</th>
                    <td className="px-6 py-5 text-right tabular-nums">{pack.smsCount.toLocaleString("en-LK")}</td>
                    <td className="px-6 py-5 text-right font-semibold tabular-nums">{formatPrice(pack.price)}</td>
                    <td className="px-6 py-5 text-right tabular-nums">{formatPrice(pack.price / pack.smsCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="grid gap-3 md:hidden" aria-describedby="pricing-conditions">
            {smsPackages.map((pack) => (
              <li key={pack.code} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-slate-950">{pack.name}</h3>
                  <p className="text-sm text-slate-600">{pack.smsCount.toLocaleString("en-LK")} {pack.smsCount === 1 ? "credit" : "credits"}</p>
                </div>
                <p className="mt-3 text-xl font-semibold tabular-nums text-slate-950">{formatPrice(pack.price)}</p>
                <p className="mt-1 text-sm text-slate-500">Indicative total · {formatPrice(pack.price / pack.smsCount)} / credit</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-slate-500">Effective price per credit is the pack total divided by the credits included. Long or Unicode messages may use more than one credit.</p>
        </div>
      </section>

      <section className="sb-section border-t border-slate-200 bg-slate-50" aria-labelledby="pricing-faq-heading">
        <div className="sb-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="pricing-faq-heading" className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Before you buy.</h2>
            <p className="mt-4 leading-relaxed text-slate-600">A few details to help you choose with confidence.</p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer rounded text-base font-semibold text-slate-950 outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-600">{faq.question}</summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
