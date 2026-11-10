import { freeTrialSms, registerUrl, siteConfig, smsPackages, transactionalPricing } from "@/lib/constants";
import { searchPages } from "@/lib/metadata";

export const dynamic = "force-static";

/** Optional agent-readable directory. Public HTML remains the source of truth. */
export function GET() {
  const pages = Object.entries(searchPages).map(([path, page]) =>
    `- [${page.title}](${new URL(path, siteConfig.url)}): ${page.description}`
  );
  const body = [
    `# ${siteConfig.name}`,
    "",
    "> SMS Buddy is a prepaid SMS gateway for Sri Lankan businesses, agencies and developers. It supports business messaging through a web portal and API access, with local setup assistance.",
    "",
    "## Product scope",
    "",
    "- Use cases include bulk promotions, order updates, appointment reminders and application-triggered verification messages.",
    "- Branded sender names require approval before use.",
    "- Applications using verification messages remain responsible for code validation, expiry and access controls.",
    "- API authentication, request formats, sending limits and delivery-status behavior should be confirmed with the team before integration. No API endpoints are specified by this directory.",
    "- Credits do not expire once purchased. Long or Unicode messages may use multiple credits.",
    `- New accounts get ${freeTrialSms} free SMS to try the service before buying a package. Confirm any sender-name setup charges before purchase.`,
    "",
    "## Public information",
    "",
    ...pages,
    "",
    "## SMS pricing",
    "",
    ...smsPackages.map((pack) => `- ${pack.name}: ${pack.smsCount.toLocaleString("en-LK")} SMS for LKR ${pack.price.toLocaleString("en-LK")} (LKR ${pack.unitPrice.toFixed(2)} per SMS).`),
    `- Prices confirmed on ${transactionalPricing.confirmedOn}. Credits do not expire. The rate depends on the package purchased, not the number of recipients.`,
    "- Confirm taxes, sender-name charges and promotional campaign pricing before purchase. Do not infer a tax-inclusive total.",
    "",
    "## Account and support",
    "",
    `- [Create an account](${registerUrl}): Registration happens in the separate SMS Buddy portal; creating an account is not the same as sending a message.`,
    `- [Contact the team](${siteConfig.url}/contact): Sender-name setup, current terms and API integration support.`,
    `- [Sitemap](${siteConfig.url}/sitemap.xml)`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
