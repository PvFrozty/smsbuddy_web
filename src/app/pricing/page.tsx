import { RateHighlight } from "@/components/pricing/RateHighlight";
import { createMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { registerUrl, smsPackages, lowestExtraSmsPackage } from "@/lib/constants";

export const metadata = createMetadata("/pricing");

const formatPrice = (amount: number) =>
  `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const starterPack = smsPackages.find((pack) => pack.code === "SB1X")!;

const faqs = [
  {
    question: "How much does 1,000 SMS cost with SMS Buddy?",
    answer: `The ${starterPack.code} package costs LKR ${starterPack.price.toLocaleString("en-LK")} for ${starterPack.smsCount.toLocaleString("en-LK")} included SMS. Long or Unicode messages may use multiple credits. Credits are valid for 3 months; confirm tax treatment and any sender-name charges with the team before purchase.`,
  },
  {
    question: "How long do my credits last?",
    answer: "Credits are valid for 3 months from purchase. Unused credits expire at the end of that period, so choose a pack that fits your expected usage.",
  },
  {
    question: "Does one message always use one credit?",
    answer: "No. Long messages and messages using Unicode characters may use multiple credits. Check the credit count for your final message before sending, especially when using Sinhala or Tamil.",
  },
  {
    question: "How are extra SMS priced?",
    answer: "Each package has a separate rate for extra SMS. For example, SB100X costs LKR 58,000 for 100,000 SMS, with extra SMS at LKR 0.48 each. The extra-SMS rate does not change the package price.",
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
        <div className="sb-shell grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="max-w-3xl">
            <h1 className="sb-page-heading">Bulk SMS pricing for your next campaign.</h1>
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
          <RateHighlight location="pricing" />
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
              Package prices and extra-SMS rates are listed separately below. All credits have a 3-month validity.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
            <table className="w-full text-left text-sm" aria-describedby="pricing-conditions">
              <caption className="sr-only">SMS Buddy package pricing in LKR, with included SMS counts and separate rates for extra SMS.</caption>
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-6 py-5 font-medium">Package</th>
                  <th scope="col" className="px-6 py-5 text-right font-medium">SMS count</th>
                  <th scope="col" className="px-6 py-5 text-right font-medium">Package price</th>
                  <th scope="col" className="px-6 py-5 text-right font-medium">Extra SMS cost (per SMS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {smsPackages.map((pack) => (
                  <tr key={pack.code} className={pack.code === lowestExtraSmsPackage.code ? "bg-blue-50 text-slate-900" : "text-slate-700"}>
                    <th scope="row" className="px-6 py-5 font-semibold text-slate-950">{pack.code}{pack.code === lowestExtraSmsPackage.code && <span className="mt-1 block text-xs font-medium text-blue-700">Our lowest extra-SMS rate</span>}{pack.code === "SMPAYG" && <span className="mt-1 block text-xs font-normal text-slate-500">Pay As You Go</span>}</th>
                    <td className="px-6 py-5 text-right tabular-nums">{pack.smsCount.toLocaleString("en-LK")}</td>
                    <td className="px-6 py-5 text-right font-semibold tabular-nums">{formatPrice(pack.price)}</td>
                    <td className="px-6 py-5 text-right tabular-nums">{formatPrice(pack.extraSmsCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="grid gap-3 md:hidden" aria-describedby="pricing-conditions">
            {smsPackages.map((pack) => (
              <li key={pack.code} className={`rounded-2xl border p-5 ${pack.code === lowestExtraSmsPackage.code ? "border-blue-200 bg-blue-50" : "border-slate-200"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-slate-950">{pack.code}{pack.code === lowestExtraSmsPackage.code && <span className="mt-1 block text-xs font-medium text-blue-700">Our lowest extra-SMS rate</span>}{pack.code === "SMPAYG" && <span className="ml-2 text-sm font-normal text-slate-500">Pay As You Go</span>}</h3>
                  <p className="text-sm text-slate-600">{pack.smsCount.toLocaleString("en-LK")} SMS</p>
                </div>
                <p className="mt-3 text-xl font-semibold tabular-nums text-slate-950">{formatPrice(pack.price)}</p>
                <p className="mt-1 text-sm text-slate-600">Package price · Extra SMS: {formatPrice(pack.extraSmsCost)} each</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-slate-500">Extra-SMS rates apply separately from the package price. Long or Unicode messages may use more than one credit.</p>
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
