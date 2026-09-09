import Link from "next/link";
import { lowestExtraSmsPackage as pack, registerUrl } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export function RateHighlight({ location }: { location: "home" | "pricing" }) {
  return (
    <aside id={location === "pricing" ? "sb150x" : undefined} className="sb-rate-offer scroll-mt-24" aria-label={`${pack.code} extra-SMS rate`}>
      <h2 className="sb-rate-heading">Our lowest extra-SMS rate.</h2>
      <p className="sb-rate-amount">
        <span>LKR</span> {pack.extraSmsCost.toFixed(2)}
      </p>
      <p className="sb-rate-unit">per extra SMS with {pack.code}</p>
      <p className="sb-rate-package">
        <strong>LKR {pack.price.toLocaleString("en-LK")}</strong> for{" "}
        <strong>{pack.smsCount.toLocaleString("en-LK")} included SMS</strong>
      </p>
      <p className="sb-rate-terms">Credits valid for 3 months. The extra-SMS rate applies separately from the package price.</p>
      <Link
        href={location === "pricing" ? registerUrl : "/pricing#sb150x"}
        className="sb-rate-link"
        data-cta-location={location === "pricing" ? "pricing-sb150x" : undefined}
      >
        {location === "pricing" ? "Get Started" : `Explore ${pack.code}`}
        <Icon name="arrow" size={19} />
      </Link>
    </aside>
  );
}
