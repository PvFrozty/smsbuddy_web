import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Preserve the restrictions observed in the public Cloudflare policy.
      // Search crawlers remain separate from these training/bulk crawlers.
      { userAgent: ["Amazonbot", "Applebot-Extended", "Bytespider", "CCBot", "ClaudeBot", "CloudflareBrowserRenderingCrawler", "Google-Extended", "GPTBot", "meta-externalagent"], disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
