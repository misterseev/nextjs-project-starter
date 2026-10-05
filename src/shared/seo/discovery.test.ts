import { beforeEach, expect, it, vi } from "vitest";
beforeEach(() => vi.resetModules());

it("keeps preview pages out of the sitemap and emits noindex", async () => {
  vi.stubEnv("APP_ENV", "preview");
  vi.stubEnv("INDEXING_ENABLED", "true");
  const { default: sitemap } = await import("@/app/sitemap");
  const { default: robots } = await import("@/app/robots");
  const { createMetadata } = await import("./metadata");
  expect(sitemap()).toEqual([]);
  expect(robots().sitemap).toBeUndefined();
  expect(
    createMetadata({
      title: "About",
      description: "About our team.",
      path: "/about",
    }).robots,
  ).toEqual({ index: false, follow: false });
});

it("publishes canonical production URLs and page-specific social metadata", async () => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("APP_ENV", "production");
  vi.stubEnv("INDEXING_ENABLED", "true");
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("SITE_URL", "https://www.acme.org");
  const { default: sitemap } = await import("@/app/sitemap");
  const { default: robots } = await import("@/app/robots");
  const { createMetadata, rootMetadata } = await import("./metadata");
  expect(sitemap()).toEqual([{ url: "https://www.acme.org" }]);
  expect(robots().sitemap).toBe("https://www.acme.org/sitemap.xml");
  expect(rootMetadata.alternates).toBeUndefined();
  expect(
    createMetadata({
      title: "Adapt - Innovate - Forward",
      description: "A starter",
      path: "/",
    }).title,
  ).toEqual({ absolute: "Adapt - Innovate - Forward" });
  const metadata = createMetadata({
    title: "About",
    description: "About our team.",
    path: "/about",
  });
  expect(metadata.alternates?.canonical).toBe("https://www.acme.org/about");
  expect(metadata.openGraph).toMatchObject({
    description: "About our team.",
    url: "https://www.acme.org/about",
  });
  expect(
    createMetadata({
      title: "Private",
      description: "Private page",
      path: "/account",
      noIndex: true,
    }).robots,
  ).toEqual({ index: false, follow: false });
});
