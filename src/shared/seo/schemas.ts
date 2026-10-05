import type { WebSite, WithContext } from "schema-dts";

import "server-only";

import { siteConfig } from "@/shared/config/site";

import { absoluteUrl } from "./metadata";

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
  };
}
