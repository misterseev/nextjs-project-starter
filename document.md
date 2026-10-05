# AiF - Front-End Next.js Standard Documentation

| Metadata | Value |
| --- | --- |
| Status | Normative |
| Version | 1.0.0 |
| Last updated | 2026-09-02 |
| Primary target | Production public websites and authenticated web applications |
| Framework model | Next.js App Router |
| Package manager | pnpm |

## 1. Purpose

This document defines the engineering standard for building secure, accessible, maintainable, high-performance, and discoverable Next.js applications. It establishes mandatory architecture boundaries, implementation conventions, quality gates, Search Engine Optimization (SEO), and Answer Engine Optimization (AEO) practices.

The standard optimizes for:

- server-first delivery with intentional client interactivity;
- feature ownership and predictable dependency direction;
- type safety from external data to rendered output;
- indexable, understandable, and answer-ready public content;
- secure authenticated workflows;
- strong user experience and Core Web Vitals;
- automated enforcement through local tooling and CI.

This is a living standard. Teams MAY extend it for product-specific needs, but exceptions MUST be documented and approved as described in [Governance and Exceptions](#28-governance-and-exceptions).

## 2. Normative Language

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are normative:

- **MUST / MUST NOT**: an absolute requirement or prohibition.
- **SHOULD / SHOULD NOT**: the default expectation; deviation requires a documented reason.
- **MAY**: optional and selected according to product needs.

Examples are illustrative. When an example conflicts with a normative rule, the normative rule takes precedence.

## 3. Scope

This standard applies to applications built primarily with:

- Next.js App Router;
- React and React Server Components;
- TypeScript;
- Tailwind CSS;
- shadcn/ui and Radix UI primitives;
- Zod;
- React Hook Form where complex client forms are required;
- Zustand where justified shared client state is required;
- native `fetch` by default, with Axios where its capabilities are justified;
- TanStack Query where long-lived client-side server state is justified;
- ESLint and Prettier, or Biome where the selected Next.js toolchain supports the required rules;
- pnpm.

The supporting test stack SHOULD include Vitest, React Testing Library, Mock Service Worker (MSW), and Playwright.

This standard covers public, indexable routes and authenticated application routes. It does not define back-end architecture, hosting-provider selection, content strategy ownership, or visual brand identity.

## 4. Engineering Principles

1. **Server first.** Components MUST remain Server Components unless client-side state, effects, event handlers, or browser APIs require a Client Component.
2. **Features over global technical buckets.** Business behavior MUST be grouped by feature.
3. **Routes compose features.** `page.tsx` and `layout.tsx` SHOULD remain thin composition and data-boundary files.
4. **One owner for every state value.** Server, cache, URL, form, and client state MUST NOT be duplicated without a documented synchronization strategy.
5. **Parse at trust boundaries.** External data MUST be treated as unknown until validated where failure creates meaningful risk.
6. **The server authorizes.** UI checks MUST NOT be treated as security boundaries.
7. **Public content is HTML content.** Essential meaning MUST be available without depending on post-hydration client requests.
8. **Optimize for people first.** SEO and AEO MUST improve or preserve human usefulness, accuracy, and accessibility.
9. **No visibility guarantees.** The application MUST NOT claim that metadata, structured data, or AEO guarantees ranking, rich results, AI citations, or inclusion.
10. **Automate objective policy.** Checkable rules SHOULD be enforced by types, linting, tests, or CI.

## 5. Approved Technology Policy

| Concern | Standard | Policy |
| --- | --- | --- |
| Framework | Next.js App Router | MUST |
| View model | React Server Components by default | MUST |
| Language | TypeScript | MUST |
| Styling | Tailwind CSS | MUST |
| UI foundation | shadcn/ui + Radix UI | SHOULD |
| Runtime schemas | Zod | MUST |
| Forms | Native forms/Server Actions or React Hook Form + Zod | Choose by interaction complexity |
| Server HTTP | Native `fetch` | SHOULD default |
| Specialized HTTP | Axios | MAY when justified |
| Client server-state | TanStack Query | MAY when justified |
| Shared client state | Zustand | MAY when justified |
| Static analysis | ESLint | MUST, unless Biome provides the complete approved rule set |
| Formatting | Prettier or Biome | MUST choose exactly one formatter |
| Package management | pnpm | MUST |
| Unit/component tests | Vitest + React Testing Library | SHOULD |
| Network mocking | MSW | SHOULD |
| End-to-end tests | Playwright | SHOULD; MUST for critical flows |

### 5.1 Version Policy

- Projects MUST use supported stable releases.
- Preview, canary, release-candidate, or experimental features MUST NOT be enabled without an approved Architecture Decision Record (ADR), owner, rollback plan, and production verification.
- The Node.js and pnpm versions MUST be declared through `package.json` and a runtime-version file or equivalent configuration.
- `pnpm-lock.yaml` MUST be committed.
- CI MUST install dependencies with `pnpm install --frozen-lockfile`.
- Major framework upgrades MUST review rendering, caching, middleware/proxy behavior, metadata output, bundle size, tests, and deployment compatibility.
- Version-specific behavior MUST be checked against the documentation for the installed version.

### 5.2 Dependency Rules

- A new dependency MUST be reviewed for maintenance, license, security, server/client compatibility, bundle cost, and platform overlap.
- Browser-only packages MUST NOT be imported into the server module graph.
- Server-only modules SHOULD import `server-only` to make the boundary explicit.
- Client-safe modules MUST NOT export secrets, privileged clients, or server-only functions.
- Deep imports into undocumented package internals MUST NOT be used.
- Multiple libraries for the same concern SHOULD NOT coexist without a migration plan.

## 6. Reference Project Structure

The application MUST use a feature-based structure adapted to App Router conventions:

```text
.
├── public/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── articles/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   ├── (app)/
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/page.tsx
│   │   ├── api/
│   │   │   ├── health/route.ts
│   │   │   └── webhooks/example/route.ts
│   │   ├── _components/
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── features/
│   │   ├── articles/
│   │   │   ├── actions/
│   │   │   │   └── article.actions.ts
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── server/
│   │   │   │   ├── article.keys.ts
│   │   │   │   ├── article.service.ts
│   │   │   │   └── article.repository.ts
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   ├── views/
│   │   │   └── index.ts
│   │   ├── auth/
│   │   └── dashboard/
│   ├── shared/
│   │   ├── api/
│   │   │   ├── create-api-client.ts
│   │   │   ├── api-error.ts
│   │   │   └── clients/
│   │   ├── config/
│   │   │   ├── env.client.ts
│   │   │   └── env.server.ts
│   │   ├── constants/
│   │   ├── lib/
│   │   ├── seo/
│   │   │   ├── json-ld.tsx
│   │   │   ├── metadata.ts
│   │   │   └── schemas.ts
│   │   ├── types/
│   │   └── utils/
│   ├── ui/
│   │   ├── primitives/
│   │   └── patterns/
│   └── test/
│       ├── factories/
│       ├── handlers/
│       ├── setup.ts
│       └── test-utils.tsx
├── tests/e2e/
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

Route groups and private folders do not create public URL segments. Generated Next.js artifacts MUST NOT be manually edited.

### 6.1 Directory Responsibilities

| Directory | Responsibility |
| --- | --- |
| `app/` | Route definitions, layouts, metadata files, loading/error boundaries, and feature composition |
| `features/` | Business capabilities with their own components, server access, actions, schemas, and public API |
| `shared/` | Product-agnostic infrastructure, configuration, SEO utilities, and cross-feature utilities |
| `ui/primitives/` | Low-level accessible UI primitives and shadcn/ui components |
| `ui/patterns/` | Reusable composed UI without feature-specific business rules |
| `test/` | Shared test setup, factories, handlers, and render helpers |
| `tests/e2e/` | User-level browser flows |

### 6.2 Dependency Direction

```text
app routes -> feature public APIs -> shared infrastructure
                         |        -> UI primitives/patterns
                         └------> feature internals
```

- Routes MAY import feature public APIs, shared modules, and UI modules.
- A feature MUST NOT import another feature's internal file.
- Cross-feature use MUST go through the target feature's `index.ts` public API or an explicitly shared domain module.
- `shared/` and `ui/` MUST NOT import product features.
- Server-only files MUST NOT be re-exported from a barrel that Client Components can import.
- Circular dependencies MUST NOT be accepted.

### 6.3 Feature Contract

Each substantial feature SHOULD own:

- schemas for input and boundary validation;
- server-side services or repositories;
- Server Actions for internal mutations where appropriate;
- custom hooks only for client interaction or client-side server state;
- feature-specific components and views;
- domain types and pure utilities;
- focused tests;
- a small, intentional public API.

## 7. Naming and File Conventions

- Files and directories MUST use `kebab-case` except framework-reserved names.
- React components and TypeScript types MUST use `PascalCase`.
- Functions, variables, and hooks MUST use `camelCase`; hooks MUST start with `use`.
- Constants MUST use `UPPER_SNAKE_CASE` only when they are immutable configuration-like values.
- Server Actions SHOULD end in `.actions.ts`.
- Server-only services SHOULD live under `server/` and use descriptive suffixes such as `.service.ts` or `.repository.ts`.
- Schemas SHOULD end in `.schema.ts`; tests SHOULD use `.test.ts` or `.test.tsx`.
- Framework files such as `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, and `error.tsx` MUST retain their reserved names.
- A dynamic route parameter MUST use a meaningful domain name such as `[articleSlug]`, not `[id]`, when ambiguity is possible.

### 7.1 Import Organization

Imports MUST be grouped consistently. Category comments MAY be used and, when the team adopts them, MUST use the same labels and order throughout the codebase.

Recommended order:

```tsx
// Import framework and library
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Import component
import { Card, CardContent } from "@/ui/primitives/card";
import { ArticleBody } from "@/features/articles";

// Import hook
import { useArticleEditor } from "@/features/articles/hooks/use-article-editor";

// Import service and action
import { getArticle } from "@/features/articles/server/article.service";

// Import schema and type
import type { Article } from "@/features/articles/types/article";

// Import constant and utility
import { SITE_NAME } from "@/shared/constants/site";
import { absoluteUrl } from "@/shared/seo/metadata";

// Import style
import "./article.css";
```

- `import type` MUST be used for type-only imports where supported.
- Side-effect stylesheet imports MUST appear last.
- Aliases SHOULD be used for cross-feature imports; relative imports SHOULD be limited to nearby files in the same module.
- Unused imports MUST fail linting.
- Import comments MUST describe categories, not repeat individual filenames.
- A file MUST NOT add an empty import group.
- Route files MAY use `// Import page component` when importing a feature view that represents the route body.

### 7.2 Comment Policy

- Comments MUST explain intent, constraints, security decisions, cache behavior, non-obvious algorithms, or external-system behavior.
- Comments MUST NOT narrate self-evident syntax.
- Complex functions SHOULD be divided into logical phases with concise comments.
- Authentication, authorization, cache invalidation, canonical selection, or structured-data mapping SHOULD include a comment when the reason is not obvious from names and types.
- Stale comments MUST be updated or removed in the same change as the code.
- Temporary workarounds MUST identify the reason, owner or tracking reference, and removal condition.

```ts
export async function publishArticle(input: unknown) {
  // Validate untrusted action input before authorization-dependent work.
  const command = PublishArticleSchema.parse(input);

  // Authorization is repeated at the mutation boundary because UI guards are not security controls.
  const session = await requireEditorSession();

  const article = await articleRepository.publish(command, session.userId);

  // Expire the article and listing caches so readers can observe the published state.
  updateTag(`article:${article.slug}`);
  updateTag("articles");

  return article;
}
```

## 8. TypeScript Standard

- `strict` mode MUST be enabled.
- Application code MUST NOT use `any` unless an approved, documented interoperability boundary makes it unavoidable.
- External input SHOULD enter the system as `unknown` and be parsed before use.
- Non-null assertions SHOULD NOT be used to bypass incomplete modeling.
- Discriminated unions SHOULD represent finite UI and request states.
- Public functions SHOULD declare return types when inference does not make the contract obvious.
- Server and client environment schemas MUST be separated.
- `NEXT_PUBLIC_` variables MUST be assumed visible to every user and MUST NOT contain secrets.
- Transport types and domain types SHOULD be separated when their shapes or lifecycles differ.

```ts
import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  publishedAt: z.string().datetime(),
});

export type Article = z.infer<typeof ArticleSchema>;
```

## 9. Server and Client Component Standard

- `page.tsx` and `layout.tsx` MUST remain Server Components unless there is a proven client requirement.
- The `'use client'` directive MUST define the smallest practical interactive boundary.
- A Client Component MUST NOT be created only to fetch initial public content.
- Props crossing from server to client MUST be serializable.
- Secrets, database clients, privileged API clients, and server-only environment variables MUST NOT cross the client boundary.
- Client providers SHOULD be rendered as deep in the tree as practical.
- Large third-party Client Components SHOULD be lazy-loaded when this improves measured performance.
- Server Components SHOULD fetch independent data in parallel to avoid waterfalls.
- Suspense and `loading.tsx` SHOULD provide meaningful progressive UI for dynamic work.

### 9.1 Component File Anatomy

```tsx
// Import framework and library
import type { ReactNode } from "react";

// Import component
import { Card } from "@/ui/primitives/card";

// Import type
import type { Article } from "../types/article";

type ArticleCardProps = {
  article: Article;
  footer?: ReactNode;
};

export function ArticleCard({ article, footer }: ArticleCardProps) {
  // Keep the visible summary aligned with the answer-ready page description.
  const description = article.summary.trim();

  return (
    <Card asChild>
      <article>
        <h2>{article.title}</h2>
        <p>{description}</p>
        {footer}
      </article>
    </Card>
  );
}
```

- A component MUST have one clear responsibility.
- Semantic elements MUST be preferred over generic containers.
- Props MUST be minimal and domain-meaningful.
- Derived values SHOULD be computed during render rather than synchronized through effects.
- Effects MUST be reserved for synchronization with external systems.
- Components MUST expose accessible names, states, and focus behavior.

## 10. Routing and App Router Conventions

- Route groups SHOULD separate public, authenticated, and operational areas without changing URLs.
- Layouts MUST contain only UI and data genuinely shared by descendant routes.
- Pages SHOULD delegate substantial UI to feature views.
- URL search parameters MUST own shareable filter, pagination, sort, tab, and search state.
- Route parameters and search parameters MUST be validated before use.
- `notFound()` SHOULD be used for genuinely missing public resources.
- Redirects MUST use the correct permanent or temporary semantics.
- Internal navigation MUST use `next/link` unless a native navigation behavior is intentionally required.
- Error boundaries MUST present a recoverable, accessible state and MUST NOT expose sensitive error detail.
- Private routes MUST be excluded from indexing using response or metadata controls; authentication alone MUST NOT be the only SEO policy.

## 11. Rendering Strategy

Every route MUST have an intentional rendering and freshness policy.

| Route characteristic | Preferred strategy |
| --- | --- |
| Stable public content | Prerendered and cached |
| Public content updated by CMS | Cached with time-based or on-demand revalidation |
| Request-specific public response | Dynamic server rendering |
| Personalized authenticated UI | Dynamic server rendering with client islands as needed |
| Highly interactive live surface | Server-rendered shell plus justified client data synchronization |

- Public content SHOULD be rendered into the initial HTML.
- A route MUST NOT be forced dynamic merely for developer convenience.
- Personalized output MUST NOT enter a shared public cache.
- Cached scopes MUST document freshness expectations and invalidation ownership.
- Cache tags SHOULD be domain-based and centrally generated.
- Tag-based invalidation SHOULD be preferred over broad path invalidation when it is more precise.
- Teams enabling Cache Components or another experimental/opt-in rendering model MUST record that choice in an ADR and test deployment behavior.
- Rendering decisions MUST be tested against the installed Next.js version because caching defaults and APIs can evolve.

## 12. Data Access and API Boundaries

### 12.1 Server-First Reads

- Initial route data SHOULD be read in Server Components or server-only services.
- Server Components SHOULD call the data source directly through an approved service or repository; they SHOULD NOT call the application's own Route Handler over HTTP.
- Native `fetch` SHOULD be the default for HTTP reads because it integrates with framework rendering and caching behavior.
- Response status MUST be checked before parsing.
- High-risk or unstable response bodies MUST be validated with Zod.
- Request timeouts or abort signals SHOULD be configured for external services.
- Logs MUST include useful request context but MUST NOT include secrets or sensitive personal data.

```ts
import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { ArticleSchema } from "../schemas/article.schema";

export async function getArticle(slug: string) {
  "use cache";

  // Cache public article content and give mutations a precise invalidation target.
  cacheLife("hours");
  cacheTag(`article:${slug}`);

  const response = await fetch(`${process.env.CONTENT_API_URL}/articles/${slug}`);

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Article request failed: ${response.status}`);

  return ArticleSchema.parse(await response.json());
}
```

The exact cache APIs in an example MUST be reconciled with the installed stable Next.js version before adoption.

### 12.2 Service and Repository Separation

- A service MUST own transport calls, response checks, parsing, and transport-to-domain mapping.
- A repository MAY abstract database or CMS access when multiple services need the same persistence contract.
- A Server Component or page MUST NOT contain reusable transport configuration.
- A Client Component MUST NOT import a server-only service.
- `try/catch` MUST NOT be used only to rethrow the same error without adding context or normalization.

### 12.3 Axios Policy

Axios MAY be used when interceptors, upload/download progress, a required adapter, or consistent integration with an existing API platform provides clear value.

- Server and browser Axios instances MUST be separate.
- A browser instance MUST NOT contain server secrets.
- The base URL and timeout MUST be configured centrally.
- Interceptors MUST be registered once and MUST NOT create refresh loops.
- A 401 refresh flow MUST coordinate concurrent failures and retry a request at most once.
- Errors MUST be normalized into an application error type.
- Authorization headers MUST NOT be forwarded to an untrusted origin.
- Server-side Axios calls MUST define caching separately; Axios does not automatically adopt Next.js `fetch` cache semantics.

```ts
import axios from "axios";

export const browserApi = axios.create({
  baseURL: "/api",
  timeout: 15_000,
  headers: { Accept: "application/json" },
});
```

### 12.4 Route Handlers

Route Handlers MAY be used for public APIs, webhooks, callbacks, file responses, or a deliberate Backend-for-Frontend boundary.

- A Route Handler MUST be treated as a public endpoint.
- Input, authentication, authorization, rate limits, and content type MUST be validated as applicable.
- Webhook signatures MUST be verified before processing.
- Route Handlers MUST return intentional status codes and safe error bodies.
- A `route.ts` file and `page.tsx` MUST NOT occupy the same route segment.
- CORS MUST be restrictive and explicit when cross-origin access is required.
- Internal server reads SHOULD NOT add a Route Handler merely to call the same application over HTTP.

## 13. Mutations, Server Actions, and Client Hooks

- Server Actions SHOULD be used for mutations initiated by the application's own UI when they simplify progressive enhancement and server validation.
- Server Actions MUST authenticate, authorize, validate, and protect each mutation independently.
- A Server Action MUST NOT trust hidden fields, client state, or middleware/proxy checks as authorization.
- The return value SHOULD be a small serializable result suitable for the UI.
- Cache invalidation MUST occur only after a successful mutation.
- Redirects and invalidation SHOULD be owned by the mutation boundary when they are invariant business behavior.
- Client-only success behavior such as closing a modal MAY remain at the call site.

```ts
"use server";

import { updateTag } from "next/cache";

import { requireEditorSession } from "@/features/auth/server/session";
import { CreateArticleSchema } from "../schemas/article.schema";
import { articleRepository } from "../server/article.repository";

export async function createArticle(input: unknown) {
  // Validate before invoking the domain and persistence layers.
  const command = CreateArticleSchema.parse(input);
  const session = await requireEditorSession();

  const article = await articleRepository.create(command, session.userId);

  // Provide read-your-own-writes behavior for the article listing.
  updateTag("articles");

  return { slug: article.slug };
}
```

### 13.1 TanStack Query and Custom Hook Separation

TanStack Query MAY be used for polling, optimistic updates, offline-aware interactions, live dashboards, or client-side data reused across distant interactive components.

- A feature query hook MUST call a feature service or approved endpoint; it MUST NOT duplicate HTTP configuration.
- Query keys MUST be generated by a feature key factory.
- Invalidation MUST be specific and performed after successful mutations.
- Initial public content MUST NOT be moved to a client query solely to standardize hooks.
- Server-rendered data hydration MUST be adopted only when its complexity is justified and tested.

```tsx
"use client";

// Import framework and library
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import service
import { updateArticle } from "../api/article.client-service";

// Import constant and type
import { articleKeys } from "../api/article.keys";
import type { UpdateArticleInput } from "../types/article";

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateArticleInput) => updateArticle(input),
    onSuccess: (article) => {
      // Refresh only cache entries affected by this mutation.
      void queryClient.invalidateQueries({ queryKey: articleKeys.detail(article.slug) });
      void queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
    },
  });
}
```

The consuming component SHOULD import and use the hook without configuring HTTP behavior:

```tsx
const { mutate: updateArticle, isPending } = useUpdateArticle();

function handleSubmit(values: UpdateArticleInput) {
  updateArticle(values, {
    onSuccess: () => setEditorOpen(false),
  });
}
```

## 14. State Ownership

| State | Required owner |
| --- | --- |
| Persisted domain data | Server/database/CMS |
| Cached server data | Next.js cache or TanStack Query, according to boundary |
| Shareable navigation state | URL path/search parameters |
| Form draft and validation | Native form state, Server Action state, or React Hook Form |
| Local interaction | Component state |
| Cross-route client-only state | Zustand only when justified |

- Zustand MUST NOT mirror server data, URL state, or form state by default.
- Stores MUST be small and domain-focused.
- Persisted client state MUST be versioned and validated before use.
- Global providers MUST NOT be added for state that can remain local or server-owned.
- State ownership MUST be identifiable during code review.

## 15. Forms and Validation

- Every mutation input MUST be validated on the server.
- Client validation MAY improve feedback but MUST NOT replace server validation.
- Simple forms SHOULD use platform form behavior and Server Actions.
- React Hook Form SHOULD be used for complex conditional fields, large forms, or rich client-side workflows.
- The same Zod schema MAY be shared only when client and server contracts are genuinely identical and the schema is safe for the client bundle.
- Errors MUST be mapped to the relevant field or an accessible form-level message.
- Pending state MUST prevent accidental duplicate submission without trapping keyboard users.
- Focus SHOULD move to the first invalid field or a clear error summary after failed submission.
- Destructive actions MUST require explicit confirmation proportional to risk.

## 16. UI, Styling, and Accessibility

### 16.1 Component Layers

- Radix UI primitives SHOULD provide accessible behavior for complex widgets.
- shadcn/ui source code MUST be treated as owned application code and reviewed when updated.
- Feature-specific business behavior MUST remain in `features/`, not in generic primitives.
- Composition SHOULD be preferred over variants that combine unrelated business concepts.

### 16.2 Tailwind CSS

- Design tokens MUST represent product colors, spacing, typography, radii, and shadows.
- Arbitrary values SHOULD be exceptional and repeated values MUST be promoted to tokens.
- Class composition MUST use one approved helper and a consistent variant strategy.
- Important overrides and global CSS SHOULD be rare and documented.
- Responsive behavior MUST be designed from the smallest supported viewport upward.

### 16.3 Accessibility

- Public and authenticated surfaces MUST target WCAG 2.2 AA unless a stricter policy applies.
- Pages MUST use semantic landmarks and a logical heading hierarchy.
- All functionality MUST be keyboard operable.
- Focus indicators MUST remain visible.
- Dialogs, menus, popovers, and disclosures MUST manage focus and accessible names correctly.
- Status, validation, loading, and error feedback MUST be perceivable without relying only on color.
- Images MUST have meaningful alternative text or intentionally empty alternative text when decorative.
- Motion MUST respect reduced-motion preferences.
- Automated accessibility checks SHOULD run in component and end-to-end tests, but manual keyboard and screen-reader checks remain required for critical flows.

## 17. Authentication, Authorization, and Security

- Authentication and session validation MUST occur on the server.
- Authorization MUST be checked as close as possible to every protected data read and mutation.
- Route-level redirects MAY improve UX but MUST NOT replace authorization in the data access layer, Server Action, or Route Handler.
- Cookies containing sessions SHOULD be `HttpOnly`, `Secure` in production, and configured with an appropriate `SameSite` policy.
- Secrets MUST remain in server-only environment variables or a managed secret store.
- User-supplied HTML MUST NOT be rendered without trusted sanitization.
- CSP, clickjacking protection, content-type protection, referrer policy, and permissions policy SHOULD be configured based on the threat model.
- CSRF protections MUST be evaluated for every cookie-authenticated mutation surface.
- Redirect destinations and callback URLs MUST be allowlisted or safely normalized.
- Error responses and logs MUST NOT reveal tokens, internal stack traces, or sensitive records.
- Dependency and source scanning SHOULD run in CI.

## 18. Environment and Runtime Configuration

- Environment variables MUST be validated at startup or build time with separate server and client schemas.
- A client variable MUST use the `NEXT_PUBLIC_` prefix and MUST be safe for public exposure.
- Server-only config MUST be imported only from server modules.
- Builds MUST NOT silently fall back to production-inappropriate defaults.
- Environment-specific URLs MUST be normalized and validated.
- Feature flags MUST have an owner, default, observability, and removal condition.
- Runtime selection MUST consider library compatibility and deployment constraints; Edge-specific assumptions MUST NOT be made without verification.

## 19. Metadata Standard

- Every indexable page MUST have a unique, descriptive title and useful description.
- Root metadata MUST define `metadataBase`, title template, application identity, and default social metadata.
- Static metadata SHOULD use the typed `metadata` export.
- Data-dependent metadata SHOULD use `generateMetadata` in a Server Component route.
- Metadata fetching SHOULD reuse or memoize the same domain read when the page needs identical data.
- A canonical URL MUST be emitted for indexable pages when duplicate or parameterized alternatives may exist.
- Open Graph and social image metadata SHOULD be provided for shareable public pages.
- Locale alternatives MUST be accurate and reciprocal when internationalized equivalents exist.
- Non-indexable routes MUST explicitly emit appropriate robots directives.
- Metadata MUST describe the visible page accurately and MUST NOT contain keyword stuffing or claims absent from the content.

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticle } from "@/features/articles/server/article.service";
import { absoluteUrl } from "@/shared/seo/metadata";

type ArticlePageProps = {
  params: Promise<{ articleSlug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { articleSlug } = await params;
  const article = await getArticle(articleSlug);

  if (!article) notFound();

  const canonical = absoluteUrl(`/articles/${article.slug}`);

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description: article.summary,
      images: [{ url: absoluteUrl(`/articles/${article.slug}/opengraph-image`) }],
    },
  };
}
```

## 20. Crawlability, Indexing, and URL Governance

- Indexable pages MUST return meaningful HTML, a successful HTTP status, and crawlable links.
- Navigation links to discoverable content MUST use real `href` values.
- `robots.txt` MUST describe crawl permissions and reference the canonical sitemap location.
- `robots.txt` MUST NOT be treated as access control or a method for removing sensitive URLs from an index.
- A page that must not appear in search MUST use `noindex` through supported metadata or response headers and MUST remain crawlable long enough for compliant crawlers to observe it.
- XML sitemaps MUST contain only canonical, indexable, successful URLs.
- Sitemap URLs MUST be absolute and use the production origin.
- Large sitemaps MUST be partitioned according to protocol and search-engine limits.
- Redirect chains, soft 404s, duplicate route variants, and conflicting canonical signals MUST be avoided.
- Pagination, filters, tracking parameters, and faceted URLs MUST have a documented canonical and indexing strategy.
- Staging, preview, and test deployments MUST be protected from accidental indexing.

```ts
import type { MetadataRoute } from "next";

import { siteConfig } from "@/shared/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard/", "/api/"] },
    ],
    sitemap: `${siteConfig.origin}/sitemap.xml`,
  };
}
```

The crawler policy MUST be reviewed with product, security, content, and legal owners. A blanket crawler rule MUST NOT be copied without understanding its effect.

## 21. Structured Data Standard

- Structured data SHOULD use JSON-LD and a vocabulary supported by the intended consumer.
- Markup MUST represent content visible on the page.
- Required and recommended properties for an eligible search feature MUST follow its current official documentation.
- The most specific accurate type SHOULD be used.
- Organization, WebSite, BreadcrumbList, Article, Product, FAQ, or other types MUST be added only when the page genuinely satisfies their definitions and applicable policies.
- Structured data MUST NOT fabricate reviews, authors, prices, availability, dates, credentials, or relationships.
- Entity identifiers and canonical URLs SHOULD be stable absolute URLs.
- User-controlled strings MUST be safely serialized to prevent script injection.
- JSON-LD MUST be validated in automated tests and with the relevant official validation tools before release.

```tsx
import type { Article } from "@/features/articles/types/article";
import { absoluteUrl } from "./metadata";

type ArticleJsonLdProps = {
  article: Article;
};

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
```

## 22. Answer Engine Optimization (AEO)

AEO in this standard means making accurate public content easy for search systems and AI-assisted answer systems to discover, understand, extract, attribute, and verify. It is an extension of strong technical SEO and content quality, not a guaranteed ranking mechanism.

### 22.1 Answer-Ready Content

- Each indexable page MUST have a clear primary topic and user intent.
- Important questions SHOULD receive a concise direct answer near the relevant heading, followed by supporting detail.
- Headings MUST describe the content that follows and SHOULD use language readers actually use.
- Definitions, steps, comparisons, requirements, dates, units, and limitations SHOULD be explicit.
- Lists and tables SHOULD be used when they make relationships easier to extract and understand.
- Important facts MUST include enough context to remain accurate when quoted or summarized.
- Content MUST distinguish facts, estimates, opinions, and product claims.
- Claims that depend on external evidence SHOULD cite the original or authoritative source near the claim.
- Publication and meaningful update dates SHOULD be visible when freshness affects correctness.
- Author or responsible organization information SHOULD be present when expertise and accountability matter.

### 22.2 Entity and Context Clarity

- People, organizations, products, locations, and concepts MUST be named consistently.
- Acronyms SHOULD be expanded on first use.
- Ambiguous pronouns or unsupported superlatives SHOULD be avoided in answer-critical passages.
- Canonical identity URLs and `sameAs` relationships MAY be used when accurate and useful.
- Internal links SHOULD connect supporting definitions, evidence, and related concepts with descriptive anchor text.
- Multi-language content MUST identify its language and link correct regional or language alternatives.

### 22.3 AI Crawler and Content-Control Policy

- Crawl permissions MUST be a deliberate product policy, not an accidental framework default.
- Search indexing, answer/search retrieval, model training, and user-triggered fetching SHOULD be evaluated as distinct purposes when crawler operators provide distinct controls.
- User-agent rules MUST be verified against the crawler owner's current official documentation before release.
- Restricted, licensed, paid, personal, or confidential content MUST NOT be exposed merely to improve discoverability.
- Content controls such as `noindex`, `nosnippet`, `data-nosnippet`, or crawler-specific rules MAY be used when they match the publishing policy.
- Analytics SHOULD monitor bot traffic, referrals, conversions, and server cost without invasive fingerprinting.

### 22.4 `llms.txt` and Experimental Conventions

- `llms.txt` MAY be published as a navigational aid when a product owner approves it.
- It MUST NOT replace `robots.txt`, sitemaps, canonical metadata, accessible HTML, or structured data.
- It MUST NOT be described as a standards-body requirement, universal crawler control, ranking factor, or guaranteed AI ingestion mechanism.
- Its links and claims MUST be maintained with the same accuracy and access rules as the website.
- Experimental discovery files MUST have an owner and MUST be removed if they become misleading or stale.

### 22.5 AEO Measurement

- Success MUST be measured through outcomes such as qualified organic traffic, cited referral traffic where observable, engagement, task completion, conversions, and support deflection.
- Search Console and equivalent webmaster data SHOULD be monitored for indexing, queries, rich results, and crawl issues.
- AEO reporting MUST NOT infer causation from a single ranking or an unverified AI response.
- Content experiments SHOULD define a baseline, target query or task, observation period, and rollback condition.

## 23. Performance and Core Web Vitals

- Performance budgets MUST be defined for critical public templates.
- Server Components MUST be used to minimize unnecessary client JavaScript.
- Client boundaries SHOULD be kept small and measurable.
- `next/image` SHOULD be used for eligible images with correct dimensions, responsive sizes, and priority only for true above-the-fold critical images.
- `next/font` SHOULD be used to self-host and optimize product fonts where appropriate.
- Third-party scripts MUST have a business owner and SHOULD use an appropriate loading strategy.
- Data requests SHOULD be parallelized or preloaded when independent.
- Streaming boundaries MUST show meaningful fallback UI and MUST NOT cause disruptive layout shift.
- Core Web Vitals SHOULD be collected from real users and segmented by route template, device, and geography where privacy policy permits.
- Lighthouse MAY support diagnosis but MUST NOT be the sole production performance signal.
- Bundle analysis SHOULD run before adding substantial client dependencies.

## 24. Internationalization

- Locale strategy MUST define URL structure, default locale, fallback behavior, and content ownership.
- The HTML `lang` attribute MUST match the rendered language.
- Localized pages MUST use stable, self-referencing canonical URLs.
- `hreflang` alternatives MUST point to true equivalents and SHOULD be reciprocal.
- Machine-translated content MUST be reviewed to the level required by its risk and audience.
- Dates, numbers, currencies, names, and pluralization MUST use locale-aware formatting.
- Structured data and visible metadata MUST match the page language.
- Mixed-language technical terms MAY remain in their standard English form when translation would reduce clarity.

## 25. Testing Standard

| Layer | Primary purpose |
| --- | --- |
| Unit | Schemas, mappings, URL rules, metadata helpers, and pure domain behavior |
| Component | Accessible behavior and client interaction |
| Integration | Server services, actions, Route Handlers, and cache invalidation contracts |
| End-to-end | Critical public discovery and authenticated user journeys |

- Tests MUST assert observable behavior rather than implementation details.
- Critical Server Actions and Route Handlers MUST test invalid input, unauthenticated access, unauthorized access, success, and safe failure.
- Public page tests SHOULD verify title, description, canonical URL, robots policy, primary heading, and JSON-LD validity.
- Sitemap tests MUST reject private, non-canonical, failing, or `noindex` URLs.
- Critical routes MUST be tested with JavaScript disabled or before hydration when essential content must be server-rendered.
- Accessibility checks SHOULD be automated and complemented by manual testing.
- Network tests MUST use deterministic handlers and MUST NOT depend on production services.
- End-to-end tests MUST cover at least one critical public route and every high-risk authenticated flow.

## 26. Linting, Formatting, and Required Scripts

- The project MUST maintain one authoritative lint configuration.
- Framework, TypeScript, React Hooks, accessibility, import-boundary, and security-relevant rules SHOULD be enabled where supported.
- Warning budgets SHOULD be zero in CI.
- Exactly one formatter MUST own formatting.
- Generated files and build artifacts MUST be excluded appropriately.

`package.json` MUST provide equivalent scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --max-warnings=0",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "check": "pnpm typecheck && pnpm lint && pnpm format:check && pnpm test && pnpm build"
  }
}
```

Names MAY differ, but CI MUST provide equivalent gates.

## 27. Git, Review, CI, and Operations

### 27.1 Change Discipline

- Changes SHOULD be small, reviewable, and independently verifiable.
- Generated lockfile changes MUST be reviewed.
- Architecture, dependency, caching, crawler-policy, and indexing changes MUST identify risk and rollback behavior.
- Public URL removals MUST include an intentional redirect, replacement, or removal response strategy.

### 27.2 Review Checklist

Every relevant review MUST ask:

- Is the server/client boundary minimal and safe?
- Is state owned by the correct layer?
- Are inputs parsed and mutations authorized?
- Is caching intentional and correctly invalidated?
- Is essential public content present in HTML?
- Are metadata, canonical, robots, sitemap, and structured data accurate?
- Is the content useful and answer-ready without being manipulative?
- Are accessibility, security, privacy, and performance requirements met?
- Are tests proportional to risk?

### 27.3 CI Quality Gates

CI MUST run:

1. frozen dependency installation;
2. type checking;
3. linting;
4. formatting verification;
5. unit and component tests;
6. production build;
7. end-to-end tests for critical flows;
8. dependency or security scanning according to organization policy.

Deployments SHOULD additionally run smoke tests for status codes, canonical origin, robots policy, sitemap accessibility, structured data, and representative public content.

### 27.4 Observability

- Unexpected server errors MUST be captured with route and correlation context.
- Logs MUST redact secrets and sensitive user information.
- Public-route uptime, latency, cache effectiveness, and Core Web Vitals SHOULD be monitored.
- Broken links, indexing exclusions, sitemap errors, and structured-data errors SHOULD generate actionable reports.
- Source maps and telemetry MUST follow privacy and access policies.

## 28. Governance and Exceptions

- The standard MUST have named maintainers.
- An exception MUST document the rule, business or technical reason, scope, risk, owner, review date, and removal condition.
- Security, privacy, accessibility, and legal requirements MUST NOT be waived solely for delivery speed.
- Experimental Next.js or discovery features MUST have an ADR.
- The standard SHOULD be reviewed at least twice per year and after major Next.js or search-platform changes.
- Examples SHOULD be updated when stable framework APIs change.

## 29. Definition of Done

A change is complete only when all applicable statements are true:

- [ ] Architecture and dependency boundaries follow this standard.
- [ ] Server and Client Component choices are intentional.
- [ ] Input validation, authentication, authorization, and error handling are implemented.
- [ ] Rendering, caching, and invalidation behavior are documented and tested.
- [ ] Public content is present in meaningful HTML.
- [ ] Metadata, canonical, robots, sitemap, and structured data are correct where applicable.
- [ ] Content is accurate, accessible, and answer-ready.
- [ ] Responsive layout, keyboard behavior, and focus behavior are verified.
- [ ] Performance impact and client bundle impact are acceptable.
- [ ] Type checking, linting, formatting, tests, and production build pass.
- [ ] Operational monitoring and rollback needs are addressed.

## 30. Architecture Decision Quick Reference

| Question | Default decision |
| --- | --- |
| Server or Client Component? | Server Component; add the smallest client boundary only when required |
| Where should initial public data load? | Server-only feature service called by a Server Component |
| Native `fetch` or Axios? | Native `fetch`; Axios only for a documented capability |
| Server Action or Route Handler? | Server Action for own-UI mutations; Route Handler for HTTP consumers/integrations |
| Next.js cache or TanStack Query? | Next.js cache for server-rendered reads; TanStack Query for justified live client state |
| URL or Zustand? | URL for shareable navigation state; Zustand for justified client-only state |
| Static or dynamic rendering? | Cache stable public output; render request-specific/personalized output dynamically |
| Metadata object or `generateMetadata`? | Static object for static values; `generateMetadata` for route data |
| JSON-LD everywhere? | Only accurate, relevant types supported by the page content |
| `llms.txt` required? | No; MAY be used as an experimental maintained aid |

## 31. Anti-Patterns

The following patterns MUST NOT be introduced:

- marking a layout or entire route tree `'use client'` for convenience;
- fetching essential public content only after hydration;
- calling the application's own Route Handler from a Server Component without a real network-boundary requirement;
- exposing secrets through `NEXT_PUBLIC_` variables or serialized props;
- trusting middleware/proxy, hidden fields, or UI visibility as authorization;
- using Axios while assuming it inherits Next.js `fetch` caching;
- duplicating the same server data in Next.js cache, TanStack Query, and Zustand without a design;
- adding global import buckets that erase feature ownership;
- comments that narrate obvious code or conceal unclear naming;
- canonical URLs that point to redirects, errors, or unrelated content;
- placing private, `noindex`, or duplicate URLs in a sitemap;
- structured data that does not match visible content;
- mass-produced shallow pages created only to target queries;
- fabricated authorship, expertise, dates, citations, reviews, or statistics;
- treating keyword repetition, schema markup, or `llms.txt` as an AEO shortcut;
- blocking a URL in `robots.txt` while relying on a page-level `noindex` that crawlers cannot read;
- declaring SEO or AEO success solely from a synthetic score.

## 32. Reference Configuration Baseline

The exact configuration MUST follow the installed stable versions, but the baseline SHOULD include:

- strict TypeScript settings;
- typed environment validation;
- approved remote image patterns;
- security headers appropriate to the deployment;
- an explicit canonical production origin;
- Metadata API defaults in the root layout;
- generated `robots.ts`, `sitemap.ts`, and `manifest.ts` where applicable;
- route-level error, not-found, and loading UI;
- import-boundary linting;
- test setup for Server Components, Client Components, and browser flows;
- real-user Core Web Vitals collection for critical public routes.

Configuration copied from an older project MUST be reviewed against the installed Next.js version before use.

## 33. Official References

Framework and platform:

- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js data fetching](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js caching and revalidation](https://nextjs.org/docs/app/getting-started/revalidating)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js authentication guide](https://nextjs.org/docs/app/guides/authentication)
- [Next.js Metadata and Open Graph images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist)

Search, structured data, and web quality:

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google crawling and indexing guidance](https://developers.google.com/search/docs/crawling-indexing)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google robots meta and X-Robots-Tag specification](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google guidance for generative AI search features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Schema.org vocabulary](https://schema.org/)
- [Sitemaps protocol](https://www.sitemaps.org/protocol.html)
- [W3C Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
- [web.dev Core Web Vitals](https://web.dev/articles/vitals)

Official documentation MUST be rechecked before adopting version-sensitive behavior.

## 34. Expected Outcomes

1. **Smaller client surface:** Server-first architecture reduces browser code, exposure, and synchronization complexity.
2. **Predictable change:** Feature ownership and explicit boundaries make delivery and refactoring safer.
3. **Trustworthy discovery:** Accurate HTML, metadata, and structured data help people and machines understand the same content.
4. **Answer-ready authority:** Clear, contextual, sourced content improves reuse without sacrificing truth or user value.
5. **Operational confidence:** Automated gates turn accessibility, security, performance, SEO, and AEO into repeatable engineering behavior.