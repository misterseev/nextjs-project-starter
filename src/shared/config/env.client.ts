import { z } from "zod";

// Add only browser-safe NEXT_PUBLIC_ values here, each read with a literal key.
// Next.js cannot inline dynamic process.env[key] lookups into browser bundles.
const clientEnvSchema = z.object({});
export const clientEnv = clientEnvSchema.parse({});
