import type { MetadataRoute } from "next";
import { searchPages } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Rebuilding is not the same as reviewing content; omit synthetic lastModified.
  return Object.keys(searchPages).map((path) => ({ url: new URL(path, siteConfig.url).toString() }));
}
