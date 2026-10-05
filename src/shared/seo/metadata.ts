import type { Metadata } from "next";

import "server-only";

import { siteConfig } from "@/shared/config/site";

import { canonicalUrl } from "./url";

export function absoluteUrl(path: string): string {
  return canonicalUrl(path, siteConfig.origin);
}

export function createMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const index = siteConfig.isIndexable && !noIndex;
  const url = absoluteUrl(path);
  const socialTitle =
    title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  return {
    title: title === siteConfig.name ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: index },
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

// Canonicals belong to pages. A root canonical would be inherited by new routes.
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: { index: siteConfig.isIndexable, follow: siteConfig.isIndexable },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};
