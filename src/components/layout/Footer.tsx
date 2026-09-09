import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { siteConfig, registerUrl } from "@/lib/constants";
export function Footer() {
  return (
    <footer className="sb-footer">
      <div className="sb-shell">
        <div className="sb-footer-top">
          <div>
            <Link href="/" aria-label="SMS Buddy home">
              <BrandMark />
            </Link>
            <p>
              Small messages.
              <br />
              Stronger connections.
            </p>
            <span>Business SMS for Sri Lanka.</span>
          </div>
          <div>
            <h2>Product</h2>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/guides/bulk-sms-sri-lanka">Bulk SMS guide</Link>
            <a href={registerUrl} data-cta-location="footer">
              Get Started
            </a>
          </div>
          <div>
            <h2>Made for you</h2>
            <Link href="/for-smes">Small businesses</Link>
            <Link href="/for-agencies">Agencies</Link>
            <Link href="/for-developers">Developers</Link>
          </div>
          <div>
            <h2>Let’s talk</h2>
            <Link href="/contact">Contact the team</Link>
            <a href={siteConfig.whatsapp}>Chat on WhatsApp</a>
            <a href={siteConfig.portal}>Log in to your account</a>
          </div>
        </div>
        <div className="sb-footer-bottom">
          <span>© {new Date().getFullYear()} SMS Buddy</span>
          <span>Made for the way your business connects.</span>
        </div>
      </div>
    </footer>
  );
}
