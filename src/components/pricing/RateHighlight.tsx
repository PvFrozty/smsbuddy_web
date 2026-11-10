import Link from "next/link";
import { transactionalPricing, registerUrl, smsPackages } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export function RateHighlight({ location }: { location: "home" | "pricing" }) {
  return (
    <aside id={location === "pricing" ? "volume-rates" : undefined} className="sb-rate-offer scroll-mt-24" aria-label="Transactional SMS volume pricing">
      {location === "pricing" && <span id="sb150x" className="scroll-mt-24" />}
      <h2 className="sb-rate-heading">Transactional SMS at volume.</h2>
      <p className="sb-rate-amount"><span>LKR</span> {transactionalPricing.volumeRate.toFixed(2)}</p>
      <p className="sb-rate-unit">per SMS with the {transactionalPricing.volumePackage.name} package ({transactionalPricing.volumePackage.smsCount.toLocaleString("en-LK")} SMS)</p>
      <p className="sb-rate-package">Start with <strong>{smsPackages[0].smsCount.toLocaleString("en-LK")} SMS for LKR {smsPackages[0].price.toLocaleString("en-LK")}</strong>. Bigger packages bring the rate from LKR {smsPackages[0].unitPrice.toFixed(2)} down to LKR {transactionalPricing.volumeRate.toFixed(2)}.</p>
      <p className="sb-rate-terms">No monthly subscription. Credits never expire.</p>
      <Link href={location === "pricing" ? registerUrl : "/pricing#volume-rates"} className="sb-rate-link" data-cta-location={location === "pricing" ? "pricing-volume-rates" : undefined}>
        {location === "pricing" ? "Buy a package" : "Explore pricing"}
        <Icon name="arrow" size={19} />
      </Link>
    </aside>
  );
}
