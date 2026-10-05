# Architecture and extension guide

The source standard is [document.md](../document.md). This starter implements reusable foundations; domain-specific authentication, CMS, forms, analytics, localization, and hosting are configured when the product needs them.

```text
src/
  app/
    (marketing)/           Public layout and thin route composition
    (app)/                 Instructions for future authenticated routes
    api/health/            Minimal liveness endpoint; no dependency details
    layout.tsx             Language, global styles, metadata defaults
    error.tsx              Recoverable segment errors using Next 16.3 retry
    global-error.tsx        Independent root error document
    loading.tsx
    not-found.tsx
    robots.ts
    sitemap.ts
    manifest.ts
    opengraph-image.tsx
    icon.svg
  features/
    home/
      index.ts             Client-safe public entry
      views/
  shared/
    api/                   Server-only validated HTTP transport
      clients/
    config/                Separate server/client env and site identity
    lib/                   Product-agnostic helpers
    seo/                   Canonicals, metadata, JSON-LD, public URL registry
  ui/
    primitives/            Accessible low-level components
    patterns/              Reusable UI composition
  test/                    Vitest setup, MSW, render helpers
  instrumentation.ts       Redacted server error event hook
tests/e2e/                 Browser-level public discovery checks
scripts/create-feature.mjs Feature scaffold
docs/                      Architecture, SEO, launch, and decision records
```

## Adding a feature

```sh
pnpm feature articles
```

The generator refuses invalid names and existing destinations. It creates actions, components, hooks, schemas, server, types, utils, views, and separate public entries. Empty directories include `.gitkeep` so cloning preserves them. Remove unused directories.

Keep components server-rendered unless they need browser APIs or interaction. Export client-safe code from `index.ts`; expose server services from `server.ts` with `import "server-only"`. Do not mix these exports. Server Components may call feature services directly.

A new public page should export `createMetadata({ title, description, path })`, render a feature view, and be registered in `public-pages.ts` only if it is canonical and indexable. Root metadata intentionally has no canonical URL to avoid new pages inheriting the homepage canonical. For data-driven metadata, use `generateMetadata`, await route params, and share the validated domain read with the page.

ESLint enforces feature public entries (including relative paths), prohibits shared/UI dependencies on features/routes, detects import cycles, and requires type imports and consistent ordering. The Next compiler enforces server-only modules. Types use strict mode and checked indexed access.

## Rendering and caching

| Surface                          | Policy                                                                  |
| -------------------------------- | ----------------------------------------------------------------------- |
| Homepage, manifest, social image | Static; rebuild when site identity changes                              |
| Robots and sitemap               | Static; rebuild after domain or indexing changes                        |
| Health endpoint                  | Uncached liveness only; no credentials or infrastructure details        |
| External API reads               | `no-store` by default; a public feature may explicitly opt into caching |
| Future personalized routes       | Dynamic; authenticate and authorize near data access                    |

Cache Components, experimental features, global client providers, Axios, React Hook Form, Zustand, and TanStack Query are not enabled by default. Add them only for an actual requirement and record ownership.

## UI and localization

Tailwind v4 tokens live in `src/app/globals.css`. The owned Button uses Radix Slot, class-variance-authority, and one `cn` helper. `components.json` routes future shadcn components into `ui/primitives`. Review each generated component and add its required tokens and dependencies.

System fonts keep first builds independent of font download services. For branded or Lao typography, add licensed local fonts with `next/font/local`. The sample content is English, so `lang=en` and `locale=en_US` are intentional. For Lao content, update visible text, metadata, `site.ts`, global-error language, and social image font coverage together. Multiple languages need real URL equivalents and reciprocal hreflang; none are invented.

## Security and operations

The starter sets content-type, frame, referrer, and permissions headers, plus a minimal CSP covering base URLs, objects, form actions, and framing. It is not a complete script-src CSP. Choose a tested nonce/hash policy for a product's scripts and rendering model; avoid allowing arbitrary scripts just to silence violations. Configure HSTS and TLS at the production host after domain/subdomain review.

No remote image origins are allowed until explicitly added. No authentication, fake sessions, webhook endpoints, database credentials, or mutation examples are shipped.

`instrumentation.ts` emits route templates, generated correlation IDs, and error digests without request bodies, headers, URL parameters, or error messages. Connect that event to your chosen telemetry backend. Hosting/framework logs need their own redaction and retention policy.

There is no real-user analytics endpoint or external telemetry provider in the template. Before launch, select consent/privacy policy, connect error monitoring and Core Web Vitals collection, define route budgets, and test alerts. Automated checks do not replace manual keyboard/screen-reader review.

## Tests

Vitest covers environment/indexing policy, canonical rules, JSON-LD injection handling, API trust boundaries, and keyboard error recovery. MSW rejects unhandled requests. Async Server Components are exercised in Playwright rather than simulated with unit rendering.

Playwright builds and starts a dedicated server on port 3100, checks HTML without JavaScript, verifies every registered sitemap page, checks headers/status/metadata/manifest/social image, and runs axe plus a mobile overflow and keyboard check. Run both preview and production indexing modes. No production website is contacted; the canonical test domain is only metadata.
