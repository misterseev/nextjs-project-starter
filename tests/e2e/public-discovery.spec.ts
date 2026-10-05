import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { publicPages } from "../../src/shared/seo/public-pages";

const production = process.env.E2E_INDEXING === "true";

test("public content and metadata work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto("http://127.0.0.1:3100/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Next.js Starter",
  );
  await expect(page).toHaveTitle("Next.js Starter");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /reusable foundation/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.acme.org",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    production ? "index, follow" : "noindex, nofollow",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Next.js Starter",
  );
  const data: unknown = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(data).toMatchObject({
    "@type": "WebSite",
    name: "Next.js Starter",
    url: "https://www.acme.org",
  });
  await context.close();
});

test("sitemap entries are successful canonical pages with matching indexing policy", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(locations).toEqual(
    production
      ? publicPages.map((path) =>
          new URL(path, "https://www.acme.org").href.replace(/\/$/, ""),
        )
      : [],
  );
  for (const path of publicPages) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new URL(path, "https://www.acme.org").href.replace(/\/$/, ""),
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      production ? "index, follow" : "noindex, nofollow",
    );
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Allow: /");
  expect(
    (await robots.text()).includes("Sitemap: https://www.acme.org/sitemap.xml"),
  ).toBe(production);
});

test("headers, health, social image, and missing pages behave correctly", async ({
  request,
}) => {
  const home = await request.get("/");
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
  expect(home.headers()["x-frame-options"]).toBe("DENY");
  expect(home.headers()["x-powered-by"]).toBeUndefined();
  expect(home.headers()["x-robots-tag"]).toBe(
    production ? undefined : "noindex, nofollow",
  );
  const health = await request.get("/api/health");
  expect(await health.json()).toEqual({ status: "ok" });
  expect(health.headers()["cache-control"]).toContain("no-store");
  expect(health.headers()["x-robots-tag"]).toContain("noindex");
  expect((await request.get("/this-page-does-not-exist")).status()).toBe(404);
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const manifest = await request.get("/manifest.webmanifest");
  expect(await manifest.json()).toMatchObject({
    name: "Next.js Starter",
    start_url: "/",
  });
});

test("homepage is accessible and supports keyboard skip navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
