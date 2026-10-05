import { z } from "zod";

const originSchema = z
  .url()
  .superRefine((value, ctx) => {
    // Format checks can continue into refinements; keep malformed values inside
    // Zod's safe result instead of throwing a URL error containing the input.
    if (!URL.canParse(value)) return;
    const url = new URL(value);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "Use an HTTP(S) origin without credentials, path, query, or fragment.",
      });
    }
  })
  .transform((value) => new URL(value).origin);

const serverSchema = z
  .object({
    APP_ENV: z.enum(["development", "test", "preview", "production"]),
    SITE_URL: originSchema,
    SITE_NAME: z.string().trim().min(1).default("Adapt - Innovate - Forward"),
    SITE_DESCRIPTION: z
      .string()
      .trim()
      .min(1)
      .default(
        "A reusable foundation for accessible, discoverable web applications.",
      ),
    INDEXING_ENABLED: z
      .enum(["true", "false"])
      .default("false")
      .transform((value) => value === "true"),
  })
  .superRefine((env, ctx) => {
    if (env.APP_ENV === "production") {
      const url = new URL(env.SITE_URL);
      if (
        url.protocol !== "https:" ||
        ["localhost", "127.0.0.1", "[::1]", "example.com"].includes(
          url.hostname,
        ) ||
        url.hostname.endsWith(".localhost") ||
        url.hostname.endsWith(".example")
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["SITE_URL"],
          message: "Production requires a real HTTPS canonical origin.",
        });
      }
    }
  });

// This pure parser is also used by next.config.ts, outside the React module graph.
export function parseServerEnv(raw: Record<string, string | undefined>) {
  const development = raw.NODE_ENV !== "production";
  const result = serverSchema.safeParse({
    APP_ENV: raw.APP_ENV ?? (development ? "development" : undefined),
    SITE_URL:
      raw.SITE_URL ?? (development ? "http://localhost:3000" : undefined),
    SITE_NAME: raw.SITE_NAME,
    SITE_DESCRIPTION: raw.SITE_DESCRIPTION,
    INDEXING_ENABLED: raw.INDEXING_ENABLED,
  });
  if (!result.success) {
    // Report field names only; future schema fields may contain secrets.
    throw new Error(
      `Invalid server environment: ${[...new Set(result.error.issues.map((issue) => issue.path.join(".") || "configuration"))].join(", ")}. See .env.example.`,
    );
  }
  return {
    ...result.data,
    isIndexable:
      result.data.APP_ENV === "production" &&
      result.data.INDEXING_ENABLED &&
      raw.NODE_ENV === "production" &&
      (raw.VERCEL_ENV === undefined || raw.VERCEL_ENV === "production"),
  };
}
