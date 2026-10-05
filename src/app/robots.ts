import type { MetadataRoute } from "next";

import { siteConfig } from "@/shared/config/site";
import { absoluteUrl } from "@/shared/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  // Allow crawling so crawlers can observe noindex on previews/private routes.
  // Authentication, not robots.txt, must protect confidential deployments.
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteConfig.isIndexable ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
