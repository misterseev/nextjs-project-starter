import type { z } from "zod";

import "server-only";

import { ApiError } from "./api-error";

type ApiClientOptions = { baseUrl: string; timeoutMs?: number };
export function createApiClient({
  baseUrl,
  timeoutMs = 10_000,
}: ApiClientOptions) {
  const base = new URL(baseUrl);
  if (
    !["http:", "https:"].includes(base.protocol) ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  ) {
    throw new Error(
      "API base URL must be an HTTP(S) URL without credentials, query, or fragment.",
    );
  }
  if (!base.pathname.endsWith("/")) base.pathname += "/";
  return {
    async get<T>(
      path: string,
      schema: z.ZodType<T>,
      init: Omit<RequestInit, "method" | "body" | "redirect"> = {},
    ): Promise<T> {
      // Credentials never leave the configured origin, including via redirects.
      const url = new URL(path, base);
      if (url.origin !== base.origin || url.username || url.password)
        throw new Error("Untrusted API origin.");
      const headers = new Headers(init.headers);
      if (!headers.has("Accept")) headers.set("Accept", "application/json");
      const timeout = AbortSignal.timeout(timeoutMs);
      const signal = init.signal
        ? AbortSignal.any([init.signal, timeout])
        : timeout;
      const response = await fetch(url, {
        ...init,
        method: "GET",
        headers,
        signal,
        redirect: "error",
        // Personalized reads are uncached unless a public service opts in.
        cache: init.cache ?? "no-store",
      });
      if (!response.ok) throw new ApiError(response.status);
      const body: unknown = await response.json();
      return schema.parse(body);
    },
  };
}
