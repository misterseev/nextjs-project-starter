import type { MetadataRoute } from "next";

import { siteConfig } from "@/shared/config/site";
import { absoluteUrl } from "@/shared/seo/metadata";
import { publicPages } from "@/shared/seo/public-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.isIndexable) return [];
  // Do not manufacture lastModified from build time; use actual content dates.
  return publicPages.map((path) => ({ url: absoluteUrl(path) }));
}
