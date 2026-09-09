import Link from "next/link";
import { MessageDemo } from "@/components/home/MessageDemo";
import { Icon } from "@/components/ui/Icon";
import { registerUrl, siteConfig } from "@/lib/constants";
import { AgencyNetwork } from "@/components/home/AgencyNetwork";
import { HomeMotion } from "@/components/home/HomeMotion";
import { BrandVideo } from "@/components/home/BrandVideo";
import { BUDDY_B_PATH } from "@/lib/brand";
import { RateHighlight } from "@/components/pricing/RateHighlight";
import "./home.css";
const faqs = [
  [
    "What happens after I click Get Started?",
    "You’ll open the SMS Buddy registration page. Enter your contact and business details, including your address, then verify your email. Our team can guide you through sender-name setup and your first messages.",
  ],
  [
    "Do I need a monthly subscription?",
    "SMS Buddy uses prepaid credits rather than a monthly subscription. Buy credits when you need them and use them within 3 months. Each package lists its price, included SMS count and separate extra-SMS rate.",
  ],
  [
    "Will messages show my business name?",
    "You can apply for a branded sender name, also called a sender ID or mask. Sender names need approval before use. The team can help with the registration requirements.",
  ],
  [
    "Can I use SMS Buddy without writing code?",
    "Use the portal for business messaging. If you’re connecting an application, explore the API integration options with our team.",
  ],
  [
    "Can I manage more than one brand?",
    "SMS Buddy’s shared credit pool lets you use credits across your account’s approved sender names. It’s useful for teams and agencies working with multiple brands.",
  ],
  [
    "Can you help me get set up?",
    "Yes. Contact the local team for help with your account, sender-name registration and integration questions. You can get started with an account or speak to us first.",
  ],
];
export default function Home() {
  return (
    <main id="main-content" className="sb-home">
      <HomeMotion />
      <section className="sb-hero" aria-labelledby="hero-heading">
        <div className="sb-shell sb-hero-grid">
          <div className="sb-hero-copy">
            <h1 id="hero-heading">
              <span className="sb-headline-line">Your next customer</span>{" "}
              <span className="sb-headline-line">connection starts with a <span className="sb-text-word">text.</span></span>
            </h1>
            <p className="sb-hero-description">
              Your SMS gateway in Sri Lanka for bulk promotions, order updates and OTPs.
              Send from your own approved brand name.
            </p>
            <div className="sb-hero-actions">
              <a
                href={registerUrl}
                className="sb-primary"
                data-cta-location="hero"
              >
                Get Started <Icon name="arrow" />
              </a>
              <a href="#message-demo" className="sb-text-link">
                <span className="sb-play">
                  <svg
                    viewBox="0 0 16 16"
                    width="13"
                    height="13"
                    aria-hidden="true"
                  >
                    <path d="m6 3 7 5-7 5Z" fill="currentColor" />
                  </svg>
                </span>
                Try a message
              </a>
            </div>
            <p className="sb-reassurance">
              No monthly subscription <span>·</span> Local setup support
            </p>
          </div>
          <MessageDemo />
          <BrandVideo />
        </div>
      </section>
      <div className="sb-shell sb-benefit-strip">
        {[
          {
            icon: "message" as const,
            title: "Bring customers back",
            text: "Share offers and announcements",
          },
          {
            icon: "box" as const,
            title: "Keep people in the loop",
            text: "Send order and service updates",
          },
          {
            icon: "lock" as const,
            title: "Connect your application",
            text: "Deliver OTPs and notifications",
          },
        ].map((b) => (
          <div key={b.title}>
            <span className="sb-benefit-icon">
              <Icon name={b.icon} size={28} />
            </span>
            <span>
              <strong>{b.title}</strong>
              <small>{b.text}</small>
            </span>
          </div>
        ))}
      </div>
      <section className="sb-section sb-sky" id="product">
        <div className="sb-shell">
          <div className="sb-section-intro" data-reveal>
            <h2>
              One platform.
              <br />
              <span>Every kind of message.</span>
            </h2>
            <p>
              A promotion worth opening. An update someone’s waiting for. A code
              that gets them in. Make every message useful.
            </p>
          </div>
          <div className="sb-use-cases" data-reveal>
            <article>
              <div className="sb-use-visual sb-promo-visual">
                <div className="sb-mini-message">
                  <span>YOUR STORE</span>
                  <p>
                    Your weekend plans? A little something from us. Discover our
                    new arrivals in store.
                  </p>
                  <small>Illustrative message</small>
                </div>
                <span className="sb-message-tag">A reason to come back</span>
              </div>
              <h3>Turn “maybe later” into a visit.</h3>
              <p>
                Put offers, launches and announcements in your customers’
                inboxes. Start with people who have opted in to hear from you.
              </p>
              <Link href="/for-smes" className="sb-text-link">
                SMS for your business <Icon name="arrow" size={18} />
              </Link>
            </article>
            <article>
              <div className="sb-use-visual sb-order-visual">
                <div className="sb-order-ticket">
                  <Icon name="box" size={30} />
                  <strong>Ready for collection</strong>
                  <p>
                    One helpful update.
                    <br />
                    One less “where’s my order?”
                  </p>
                  <span>
                    <Icon name="check" size={14} /> Example order notification
                  </span>
                </div>
              </div>
              <h3>Keep the next step clear.</h3>
              <p>
                Send useful order updates and service notifications, so
                customers know what’s happening with your business.
              </p>
              <Link href="/features" className="sb-text-link">
                Explore the platform <Icon name="arrow" size={18} />
              </Link>
            </article>
            <article>
              <div className="sb-use-visual sb-otp-visual">
                <div className="sb-otp-title">
                  <Icon name="lock" size={22} /> Verification code
                </div>
                <div className="sb-otp-digits" aria-label="Example code 482916">
                  {"482916".split("").map((n, i) => (
                    <span key={i}>{n}</span>
                  ))}
                </div>
                <p>For the moments that need a code.</p>
                <small>Illustrative OTP</small>
              </div>
              <h3>Make messaging part of your app.</h3>
              <p>
                Connect SMS to your product for verification codes and
                transactional notifications through the API.
              </p>
              <Link href="/for-developers" className="sb-text-link">
                For developers <Icon name="arrow" size={18} />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className="sb-section" id="how-it-works">
        <div className="sb-shell sb-steps-layout" data-reveal>
          <div>
            <h2>
              From your business
              <br />
              to their inbox.
            </h2>
            <p className="sb-lead">
              A clear way to get started.
              <br />
              And a local team when you need a hand.
            </p>
            <a
              className="sb-primary"
              href={registerUrl}
              data-cta-location="how_it_works"
            >
              Get Started <Icon name="arrow" size={20} />
            </a>
          </div>
          <ol className="sb-steps">
            <li>
              <span>1</span>
              <div>
                <h3>Create your account</h3>
                <p>
                  Add your business and contact details, then verify your email
                  in the SMS Buddy portal.
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Get your sender name ready</h3>
                <p>
                  Apply for your business’s sender name. We can guide you
                  through the approval requirements.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Add credits. Start connecting.</h3>
                <p>
                  Choose credits for your needs, then send through the portal or
                  connect your app with the API.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="sb-section sb-brand-section">
        <div className="sb-shell sb-brand-layout" data-reveal>
          <AgencyNetwork />
          <div>
            <h2>
              More brands.
              <br />
              Less back and forth.
            </h2>
            <p className="sb-lead">
              Running campaigns for several businesses? Keep your approved
              sender names together and use one shared credit pool across your
              brands.
            </p>
            <Link href="/for-agencies" className="sb-text-link">
              Built for agencies, too <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <section className="sb-section">
        <div className="sb-shell sb-credit-section">
          <div>
            <h2>
              Buy credits.
              <br />
              Skip the subscription.
            </h2>
            <p className="sb-lead">
              Choose a pack that fits the messages you plan to send. Your
              credits stay valid for 3 months from purchase.
            </p>
            <Link href="/pricing" className="sb-text-link">
              Explore credit packs <Icon name="arrow" />
            </Link>
          </div>
          <RateHighlight location="home" />
        </div>
      </section>
      <section className="sb-section sb-faq-section">
        <div className="sb-shell sb-faq-layout">
          <div>
            <h2>
              Your business SMS
              <br />
              questions, answered.
            </h2>
            <p className="sb-lead">New to bulk SMS? <Link href="/guides/bulk-sms-sri-lanka" className="underline underline-offset-4">Read the getting-started guide.</Link></p>
            <a className="sb-text-link" href={siteConfig.whatsapp}>
              Talk to the local team <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="sb-faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>
                    <Icon name="plus" size={18} />
                  </span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="sb-final-section">
        <svg className="sb-final-mark" viewBox="0 0 72 88" fill="none" aria-hidden="true"><path d={BUDDY_B_PATH} fill="currentColor" fillRule="evenodd" /></svg>
        <div className="sb-shell sb-final">
          <div>
            <h2>
              Your customers are
              <br />a message away.
            </h2>
            <p>Make your next connection with SMS Buddy.</p>
          </div>
          <div>
            <a
              href={registerUrl}
              className="sb-primary sb-white-button"
              data-cta-location="final"
            >
              Get Started <Icon name="arrow" />
            </a>
            <span>Create your account in the SMS Buddy portal.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
