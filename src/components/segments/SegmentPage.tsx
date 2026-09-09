import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/Icon";
import { registerUrl } from "@/lib/constants";

type Item = {
  title: string;
  description: string;
  icon: ComponentProps<typeof Icon>["name"];
};

type SegmentPageProps = {
  page: string;
  headline: string;
  introduction: string;
  preview: { sender: string; message: string; context: string };
  useCaseHeading: string;
  useCases: Item[];
  capabilityHeading: string;
  capabilities: Item[];
  setupDescription: string;
  steps: { title: string; description: string }[];
  finalHeading: string;
  finalDescription: string;
};

export function SegmentPage({
  page,
  headline,
  introduction,
  preview,
  useCaseHeading,
  useCases,
  capabilityHeading,
  capabilities,
  setupDescription,
  steps,
  finalHeading,
  finalDescription,
}: SegmentPageProps) {
  return (
    <main id="main-content">
      <section className="sb-section bg-white">
        <div className="sb-shell grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <h1 className="sb-page-heading">{headline}</h1>
            <p className="sb-lead max-w-2xl">{introduction}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link className="sb-primary" href={registerUrl} data-cta-location={`${page}-hero`}>Get Started <Icon name="arrow" size={18} /></Link>
              <Link className="sb-text-link" href="/pricing">Explore pricing <Icon name="arrow" size={17} /></Link>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-slate-500">Opens the account portal. Sender names may require approval.</p>
          </div>
          <figure className="m-0 rounded-3xl bg-[#eef4ff] p-7 sm:p-10">
            <div className="mx-auto max-w-sm rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5 text-blue-700">
                <Icon name="message" size={25} />
                <span className="text-sm font-bold tracking-wide">{preview.sender}</span>
              </div>
              <div className="mt-6 rounded-xl rounded-tl-none bg-slate-100 p-5 text-base leading-relaxed text-slate-800">{preview.message}</div>
              <p className="mb-0 mt-5 text-xs leading-relaxed text-slate-500">{preview.context}</p>
            </div>
            <figcaption className="mt-5 text-center text-xs leading-relaxed text-slate-500">Illustrative message. No SMS is sent from this preview.</figcaption>
          </figure>
        </div>
      </section>

      <section className="sb-section border-y border-slate-200 bg-slate-50" aria-labelledby={`${page}-use-cases`}>
        <div className="sb-shell">
          <h2 id={`${page}-use-cases`} className="mb-10 max-w-3xl font-semibold tracking-tight text-slate-950">{useCaseHeading}</h2>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {useCases.map((item) => (
              <article key={item.title}>
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><Icon name={item.icon} /></span>
                <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mb-0 mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sb-section bg-white" aria-labelledby={`${page}-capabilities`}>
        <div className="sb-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 id={`${page}-capabilities`} className="font-semibold tracking-tight text-slate-950">{capabilityHeading}</h2>
            <Link href="/contact" className="sb-text-link mt-7">Talk through your setup <Icon name="arrow" size={17} /></Link>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {capabilities.map((item) => (
              <article key={item.title} className="flex gap-5 py-6">
                <span className="mt-1 shrink-0 text-blue-700"><Icon name={item.icon} /></span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mb-0 mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sb-section bg-[#f0f5ff]" aria-labelledby={`${page}-setup`}>
        <div className="sb-shell grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id={`${page}-setup`} className="font-semibold tracking-tight text-slate-950">Know what comes next.</h2>
            <p className="sb-lead mt-5">{setupDescription}</p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600">Credits are valid for 3 months. Confirm current rates, taxes, and sender-name setup costs before purchasing.</p>
          </div>
          <ol className="sb-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sb-final-section">
        <div className="sb-shell sb-final">
          <div><h2>{finalHeading}</h2><p>{finalDescription}</p></div>
          <div>
            <Link href={registerUrl} className="sb-primary sb-white-button" data-cta-location={`${page}-final`}>Get Started <Icon name="arrow" size={18} /></Link>
            <span>Continue to the SMS Buddy account portal</span>
          </div>
        </div>
      </section>
    </main>
  );
}
