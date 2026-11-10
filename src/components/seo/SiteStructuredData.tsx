import { siteConfig } from "@/lib/constants";

export function SiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: "SMSBuddy",
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/buddy-b.png`,
        telephone: siteConfig.phone,
        email: "hello@smsbuddy.lk",
        areaServed: { "@type": "Country", name: "Sri Lanka" },
        contactPoint: { "@type": "ContactPoint", contactType: "customer support", telephone: siteConfig.phone, url: `${siteConfig.url}/contact` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#application`,
        name: siteConfig.name,
        alternateName: "SMSBuddy",
        url: siteConfig.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "A prepaid SMS gateway for Sri Lankan businesses, agencies and developers, with a web portal, API access and approved sender names.",
        featureList: ["SMS portal", "API access", "Approved sender names", "Shared credit pool"],
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        alternateName: "SMSBuddy",
        url: siteConfig.url,
        inLanguage: "en-LK",
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
