import type { Route } from "next";

// Add only implemented, canonical, indexable pages. E2E checks every entry.
export const publicPages = ["/"] as const satisfies readonly Route[];
