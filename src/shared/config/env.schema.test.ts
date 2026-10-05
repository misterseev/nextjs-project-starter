import { describe, expect, it } from "vitest";

import { parseServerEnv } from "./env.schema";

describe("deployment configuration", () => {
  it("reports malformed origins by field name without leaking their value", () => {
    expect(() => parseServerEnv({ SITE_URL: "private-invalid-value" })).toThrow(
      "Invalid server environment: SITE_URL. See .env.example.",
    );
  });
  it("requires explicit deployment configuration for production builds", () => {
    expect(() => parseServerEnv({ NODE_ENV: "production" })).toThrow(
      "Invalid server environment",
    );
  });
  it("keeps development, test, and preview non-indexable even with the opt-in", () => {
    for (const APP_ENV of ["development", "test", "preview"]) {
      expect(
        parseServerEnv({
          NODE_ENV: "production",
          APP_ENV,
          SITE_URL: "https://www.acme.org",
          INDEXING_ENABLED: "true",
        }).isIndexable,
      ).toBe(false);
    }
  });
  it("requires production mode and an explicit opt-in", () => {
    const config = {
      NODE_ENV: "production",
      APP_ENV: "production",
      SITE_URL: "https://www.acme.org/",
    };
    expect(parseServerEnv(config).isIndexable).toBe(false);
    expect(
      parseServerEnv({ ...config, INDEXING_ENABLED: "true" }).isIndexable,
    ).toBe(true);
    expect(
      parseServerEnv({
        ...config,
        INDEXING_ENABLED: "true",
        VERCEL_ENV: "preview",
      }).isIndexable,
    ).toBe(false);
    expect(
      parseServerEnv({
        ...config,
        INDEXING_ENABLED: "true",
        NODE_ENV: "development",
      }).isIndexable,
    ).toBe(false);
  });
  it.each([
    "http://localhost:3000",
    "https://example.com",
    "https://www.acme.org/path",
    "https://user:password@www.acme.org",
    "https://www.acme.org?q=1",
    "ftp://www.acme.org",
  ])("rejects invalid production origins: %s", (SITE_URL) => {
    expect(() =>
      parseServerEnv({
        NODE_ENV: "production",
        APP_ENV: "production",
        SITE_URL,
      }),
    ).toThrow();
  });
  it("rejects misspelled booleans instead of coercing false to true", () => {
    expect(() => parseServerEnv({ INDEXING_ENABLED: "yes" })).toThrow();
    expect(parseServerEnv({ INDEXING_ENABLED: "false" }).isIndexable).toBe(
      false,
    );
  });
});
