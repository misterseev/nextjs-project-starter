import { describe, expect, it } from "vitest";

import { canonicalUrl } from "./url";

describe("canonical URLs", () => {
  it("normalizes local trailing slashes", () => {
    expect(canonicalUrl("/about/", "https://www.acme.org")).toBe(
      "https://www.acme.org/about",
    );
    expect(canonicalUrl("/", "https://www.acme.org")).toBe(
      "https://www.acme.org",
    );
  });
  it.each([
    "https://evil.org",
    "//evil.org",
    "/\\evil.org",
    "/about?ref=ad",
    "/about#team",
  ])("rejects ambiguous canonical paths: %s", (path) => {
    expect(() => canonicalUrl(path, "https://www.acme.org")).toThrow();
  });
});
