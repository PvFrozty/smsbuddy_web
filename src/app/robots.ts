import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

// Marketing-site boundaries only. The separate portal must enforce its own
// authentication and crawler policy; robots.txt is not access control.
const privatePaths = ["/api/", "/admin/", "/account/", "/dashboard/", "/login/", "/register/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      {
        userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended"],
        allow: "/",
        disallow: privatePaths,
      },
      // Owner delegated this policy on 7 October 2026. Google-Extended is
      // allowed for Gemini grounding and also permits its covered training use.
      { userAgent: ["Amazonbot", "Applebot-Extended", "Bytespider", "CCBot", "ClaudeBot", "CloudflareBrowserRenderingCrawler", "GPTBot", "meta-externalagent"], disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
