// @vitest-environment node
import { delay, http, HttpResponse } from "msw";
import { expect, it } from "vitest";
import { z } from "zod";

import { server } from "@/test/server";

import { createApiClient } from "./create-api-client";

const client = createApiClient({ baseUrl: "https://api.acme.org/v1/" });
const schema = z.object({ name: z.string() });

it("validates successful upstream data", async () => {
  server.use(
    http.get("https://api.acme.org/v1/profile", () =>
      HttpResponse.json({ name: "Ada" }),
    ),
  );
  await expect(client.get("profile", schema)).resolves.toEqual({ name: "Ada" });
});
it("rejects invalid payloads", async () => {
  server.use(
    http.get("https://api.acme.org/v1/profile", () =>
      HttpResponse.json({ name: 42 }),
    ),
  );
  await expect(client.get("profile", schema)).rejects.toThrow();
});
it("returns safe errors without echoing upstream bodies", async () => {
  server.use(
    http.get("https://api.acme.org/v1/profile", () =>
      HttpResponse.json({ secret: "private" }, { status: 503 }),
    ),
  );
  await expect(client.get("profile", schema)).rejects.toMatchObject({
    status: 503,
    message: "The upstream request failed.",
  });
});
it("blocks cross-origin requests before sending credentials", async () => {
  await expect(
    client.get("https://evil.org/profile", schema, {
      headers: { Authorization: "secret" },
    }),
  ).rejects.toThrow("Untrusted API origin");
});
it("honors caller cancellation", async () => {
  const controller = new AbortController();
  controller.abort();
  await expect(
    client.get("profile", schema, { signal: controller.signal }),
  ).rejects.toThrow();
});

it("aborts slow upstream requests within its timeout budget", async () => {
  server.use(
    http.get("https://api.acme.org/v1/profile", async () => {
      await delay(100);
      return HttpResponse.json({ name: "Ada" });
    }),
  );
  const impatientClient = createApiClient({
    baseUrl: "https://api.acme.org/v1/",
    timeoutMs: 10,
  });
  await expect(impatientClient.get("profile", schema)).rejects.toMatchObject({
    name: "TimeoutError",
  });
});

it("refuses upstream redirects rather than forwarding credentials", async () => {
  server.use(
    http.get(
      "https://api.acme.org/v1/profile",
      () =>
        new HttpResponse(null, {
          status: 302,
          headers: { Location: "https://evil.org/profile" },
        }),
    ),
  );
  await expect(
    client.get("profile", schema, { headers: { Authorization: "secret" } }),
  ).rejects.toThrow();
});
