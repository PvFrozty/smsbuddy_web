import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { registerUrl, siteConfig, smsPackages, lowestExtraSmsPackage } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export const metadata = createMetadata("/guides/bulk-sms-sri-lanka");

const sections = [
  ["what-is-bulk-sms", "What is bulk SMS?"],
  ["first-campaign", "Your first campaign"],
  ["cost", "What does it cost?"],
  ["sender-name", "Your business sender name"],
  ["portal-or-api", "Portal or API?"],
] as const;

const starter = smsPackages.find((pack) => pack.code === "SB1X")!;
const volume = lowestExtraSmsPackage;
const number = (value: number) => value.toLocaleString("en-LK");

export default function BulkSmsGuide() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Bulk SMS guide", item: `${siteConfig.url}/guides/bulk-sms-sri-lanka` },
    ],
  };
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
      <header className="sb-section border-b border-slate-200 bg-white">
        <div className="sb-shell">
          <h1 className="sb-page-heading max-w-4xl">How to send bulk SMS in Sri Lanka.</h1>
          <p className="sb-lead mt-6 max-w-2xl">Start with your audience, your sender name and a credit pack that fits. Here’s how to prepare your first campaign with SMS Buddy.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href={registerUrl} className="sb-primary" data-cta-location="guide-hero">Get Started <Icon name="arrow" size={18} /></a>
            <Link href="/pricing" className="sb-text-link">Compare SMS packages <Icon name="arrow" size={18} /></Link>
          </div>
          <p className="mt-6 text-sm text-slate-600">SMS Buddy product guide · Pricing checked <time dateTime="2026-09-09">9 September 2026</time></p>
        </div>
      </header>

      <div className="sb-shell grid gap-12 py-14 lg:grid-cols-[220px_minmax(0,760px)] lg:gap-20 lg:py-20">
        <nav aria-label="On this page" className="self-start lg:sticky lg:top-28">
          <h2 className="text-base font-semibold text-slate-950">In this guide</h2>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-blue-700">
            {sections.map(([id, label]) => <li key={id}><a href={`#${id}`} className="underline-offset-4 hover:underline">{label}</a></li>)}
          </ul>
        </nav>

        <article className="min-w-0 space-y-12 text-base leading-8 text-slate-700 [&_h2]:mb-5 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-slate-950 [&_p+p]:mt-4">
          <section id="what-is-bulk-sms" className="scroll-mt-28">
            <h2>What is bulk SMS?</h2>
            <p>Bulk SMS means sending a text message to a selected group of recipients. Businesses use it for promotions, announcements and customer updates. An SMS gateway connects a web portal or application to the messaging service used to send those texts.</p>
            <p>SMS Buddy gives Sri Lankan businesses a portal for campaigns and API access for application messages. Your approved sender name identifies your business, while prepaid credits cover your sending.</p>
          </section>

          <section id="first-campaign" className="scroll-mt-28">
            <h2>How do I send 1,000 SMS?</h2>
            <p>Create an account, arrange an approved sender name, add enough credits and prepare your recipient list. With SMS Buddy, the {starter.code} package includes {number(starter.smsCount)} SMS for LKR {number(starter.price)}. Check the final message’s credit count: one recipient can use more than one credit.</p>
            <ol className="mt-7 list-decimal space-y-5 pl-6 marker:font-semibold marker:text-blue-700">
              <li><strong className="text-slate-950">Create your account.</strong> Enter your contact and business details in the SMS Buddy portal, then verify your email.</li>
              <li><strong className="text-slate-950">Arrange your sender name.</strong> Apply for the business name you want recipients to see. Confirm requirements and approval before planning a launch date.</li>
              <li><strong className="text-slate-950">Prepare your audience.</strong> Import contacts from Excel or CSV. Check the numbers, remove duplicates and use recipients who have agreed to hear from your business.</li>
              <li><strong className="text-slate-950">Choose credits and write your message.</strong> Include a clear reason for contacting the recipient and one useful next step. Check your balance against the final message and audience.</li>
              <li><strong className="text-slate-950">Test, review and send.</strong> Complete a controlled send to an agreed test audience. Check the sender, text and links before the wider campaign, then review the available delivery information.</li>
            </ol>
            <p className="mt-6"><Link href="/#message-demo" className="font-medium text-blue-700 underline underline-offset-4">Try the interactive SMS example</Link> to see how a branded message can look. It is a preview; it does not send an SMS.</p>
          </section>

          <section id="cost" className="scroll-mt-28">
            <h2>How much does bulk SMS cost?</h2>
            <p>SMS Buddy lists package prices, included SMS and extra-SMS rates separately. There is no monthly subscription, and credits are valid for 3 months from purchase. Choose a pack you expect to use within that period.</p>
            <div className="my-6 rounded-xl bg-blue-50 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-950">Two package examples</h3>
              <dl className="mt-4 space-y-4">
                <div><dt className="font-semibold text-slate-950">{starter.code} · {number(starter.smsCount)} SMS</dt><dd>LKR {number(starter.price)} for the package. Extra SMS: LKR {starter.extraSmsCost.toFixed(2)} each.</dd></div>
                <div><dt className="font-semibold text-slate-950">{volume.code} · {number(volume.smsCount)} SMS</dt><dd>LKR {number(volume.price)} for the package. Extra SMS: LKR {volume.extraSmsCost.toFixed(2)} each.</dd></div>
              </dl>
              <p className="mt-4 text-sm leading-6">The {volume.code} included average is LKR {(volume.price / volume.smsCount).toFixed(2)} per SMS. Its LKR {volume.extraSmsCost.toFixed(2)} rate applies to extra SMS, not the messages included in the package.</p>
            </div>
            <p>Long messages and Unicode text, including Sinhala or Tamil, may use multiple credits. Review the final credit count before sending. Confirm tax treatment, any sender-name charges and how extra SMS are purchased with the team before paying.</p>
            <p><Link href="/pricing" className="font-medium text-blue-700 underline underline-offset-4">See all SMS packages and use the credit calculator.</Link></p>
          </section>

          <section id="sender-name" className="scroll-mt-28">
            <h2>Can customers see my business name?</h2>
            <p>Yes, you can apply for a branded sender name, also called a sender ID or mask. Sender names need approval before use. The team can explain the required business details and documents for your request.</p>
            <p>If you manage several brands, SMS Buddy supports a shared credit pool across your account’s approved sender names. <Link href="/for-agencies" className="font-medium text-blue-700 underline underline-offset-4">Explore the agency workflow.</Link></p>
          </section>

          <section id="portal-or-api" className="scroll-mt-28">
            <h2>Should I use the portal or an SMS API?</h2>
            <p>Use the portal when your team wants to compose a campaign and select recipients without writing code. Use an API integration when a software event should trigger a message, such as an order update or verification code.</p>
            <p>For OTP messages, your application remains responsible for code validation, expiry and access controls. Confirm the current API authentication, formats and sending limits with the team before implementing an integration.</p>
            <p><Link href="/for-developers" className="font-medium text-blue-700 underline underline-offset-4">Explore SMS API integration</Link> or <Link href="/for-smes" className="font-medium text-blue-700 underline underline-offset-4">see messaging for small businesses.</Link></p>
          </section>

          <section className="border-t border-slate-200 pt-10">
            <h2>Ready for your first campaign?</h2>
            <p>Create your account to begin setup. If you need help choosing credits or arranging your sender name, talk to the SMS Buddy team.</p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <a href={registerUrl} className="sb-primary" data-cta-location="guide-final">Get Started <Icon name="arrow" size={18} /></a>
              <Link href="/contact" className="sb-text-link">Ask the team <Icon name="arrow" size={18} /></Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
