import { RateHighlight } from "@/components/pricing/RateHighlight";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { freeTrialSms, registerUrl, smsPackages, transactionalPricing } from "@/lib/constants";

const lkr = (amount: number) => amount.toLocaleString("en-LK", { maximumFractionDigits: 2 });

export const metadata = createMetadata("/pricing");

const faqs = [
  { question: "Can I try it before I buy?", answer: `Yes. Every new account gets ${freeTrialSms} free SMS to try the service before you buy a package.` },
  { question: "What does an SMS cost?", answer: `SMS Buddy sells prepaid SMS packages. The rate goes down as the package gets bigger, from LKR ${smsPackages[0].unitPrice.toFixed(2)} with ${smsPackages[0].name} (${smsPackages[0].smsCount.toLocaleString("en-LK")} SMS) to LKR ${transactionalPricing.volumeRate.toFixed(2)} with ${transactionalPricing.volumePackage.name} (${transactionalPricing.volumePackage.smsCount.toLocaleString("en-LK")} SMS).` },
  { question: "Does sending more messages automatically lower the rate?", answer: "The rate depends on the package you buy, not on the size of a single campaign. Pick the package that matches the credits you expect to use. Credits don’t expire, so a bigger package keeps its lower rate for later sales." },
  { question: "How long do my credits last?", answer: "They don’t expire. Credits you buy stay in your account until you use them." },
  { question: "Does one message always use one credit?", answer: "No. Long messages and messages using Unicode characters may use multiple credits. Check the credit count for your final message before sending, especially when using Sinhala or Tamil." },
  { question: "What should I check before paying?", answer: "Check the package and total payable in the portal. Confirm tax treatment, any sender-name charges and promotional campaign pricing with the team." },
];

export default function PricingPage() {
  return (
    <main id="main-content">
      <section className="sb-section border-b border-slate-200 bg-white">
        <div className="sb-shell grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="max-w-3xl">
            <h1 className="sb-page-heading">SMS pricing that works with your volume.</h1>
            <p className="sb-lead mt-6 max-w-2xl">Prepaid SMS credits that never expire. No monthly subscription.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4"><Button href={registerUrl} className="sb-primary" data-cta-location="pricing-hero">Buy credits</Button><Button href="/contact" variant="ghost" className="sb-secondary">Talk to the team</Button></div>
            <p className="mt-4 text-sm text-slate-500">Every new account gets {freeTrialSms} free SMS to try it. Prices confirmed 9 November 2026.</p>
          </div>
          <RateHighlight location="pricing" />
        </div>
      </section>
      <section className="sb-section bg-slate-50" aria-labelledby="packages-heading">
        <div className="sb-shell">
          <div className="mb-8 max-w-2xl"><h2 id="packages-heading" className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">SMS packages.</h2><p className="mt-4 leading-relaxed text-slate-600">The bigger the package, the lower the price per SMS. Credits never expire.</p></div>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">SMS Buddy package prices in LKR</caption>
              <thead className="border-b border-slate-200 text-slate-600"><tr><th scope="col" className="px-4 py-4 font-medium sm:px-7">Package</th><th scope="col" className="px-3 py-4 sm:px-5 text-right font-medium">SMS included</th><th scope="col" className="px-3 py-4 sm:px-5 text-right font-medium">Per SMS</th><th scope="col" className="px-4 py-4 text-right font-medium sm:px-7">Price (LKR)</th></tr></thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {smsPackages.map((pack) => (
                  <tr key={pack.code} className={pack.highlighted ? "bg-blue-50" : undefined}>
                    <th scope="row" className="px-4 py-4 font-semibold text-slate-950 sm:px-7">{pack.name}{pack.highlighted && <span className="mt-1 block w-fit rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white sm:ml-2 sm:mt-0 sm:inline">Best rate</span>}</th>
                    <td className="px-3 py-4 sm:px-5 text-right text-slate-600">{pack.smsCount.toLocaleString("en-LK")}</td>
                    <td className="px-3 py-4 sm:px-5 text-right font-semibold text-slate-950">{pack.unitPrice.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right text-slate-950 sm:px-7">{lkr(pack.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">Prices are for SMS credits bought in the SMS Buddy portal. Confirm taxes, sender-name charges and promotional campaign pricing with the team.</p>
        </div>
      </section>
      <section className="sb-section bg-white" aria-labelledby="pack-chooser-heading">
        <div className="sb-shell"><div className="mb-8 max-w-2xl"><h2 id="pack-chooser-heading" className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Find your lowest price.</h2><p className="mt-4 leading-relaxed text-slate-600">Enter the credits you expect to use and we’ll show the cheapest way to buy them.</p></div><PricingCalculator /></div>
      </section>
      <section className="sb-section border-t border-slate-200 bg-slate-50" aria-labelledby="pricing-faq-heading">
        <div className="sb-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div><h2 id="pricing-faq-heading" className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Before you buy.</h2><p className="mt-4 leading-relaxed text-slate-600">A few details to help you choose with confidence.</p></div><div className="divide-y divide-slate-200 border-y border-slate-200">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer rounded text-base font-semibold text-slate-950 outline-offset-4 focus-visible:outline-2 focus-visible:outline-blue-600">{faq.question}</summary><p className="mt-4 text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}</div></div>
      </section>
    </main>
  );
}
