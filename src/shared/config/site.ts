import "server-only";

import { serverEnv } from "./env.server";

export const siteConfig = {
  name: serverEnv.SITE_NAME,
  description: serverEnv.SITE_DESCRIPTION,
  origin: serverEnv.SITE_URL,
  language: "en",
  locale: "en_US",
  isIndexable: serverEnv.isIndexable,
} as const;
