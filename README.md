# Next.js Structure Starter

Reusable Next.js App Router foundation based on [document.md](./document.md). Uses Next.js 16.3.8, React 19, TypeScript, Tailwind CSS v4, pnpm, Zod, and a feature-based source layout.

ສຳລັບ clone ໄປເລີ່ມໂຄງການໃໝ່: ຕັ້ງ environment, ປ່ຽນຊື່/ເນື້ອຫາເວັບ ແລ້ວເພີ່ມ feature ຂອງທ່ານ. SEO ຈະປິດ indexing ໄວ້ກ່ອນຈົນກວ່າຈະພ້ອມເປີດ production.

## Quick start

Use Node **24.20.0** (`.nvmrc`) and pnpm **11.25.0** (`packageManager`).

```sh
# After cloning your copy:
nvm install
nvm use
# Install pnpm if it is not available:
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The template uses system fonts and does not need external accounts, API keys, a database, or font downloads.

Before launching, edit `.env.local` for local testing or set equivalent variables in your hosting environment:

```dotenv
APP_ENV=production
SITE_URL=https://your-real-domain.com
SITE_NAME="Your project"
SITE_DESCRIPTION="An accurate description matching your visible content."
INDEXING_ENABLED=true
```

Use `APP_ENV=preview` and `INDEXING_ENABLED=false` for previews. Production builds require explicit deployment settings; localhost is never silently used as a production canonical. Rebuild for each deployment environment because metadata and response headers are generated at build time.

## Included foundations

- `src/app` routes compose `src/features`; shared infrastructure and reusable UI have enforced import boundaries.
- Server Components by default, strict TypeScript, typed links, and separate server/client environment schemas.
- Central site identity, page metadata helper, canonical URL validation, Open Graph/Twitter cards, safe typed JSON-LD, robots, sitemap, and manifest.
- Preview noindex metadata and response headers; only registered public production URLs enter the sitemap.
- Accessible error, loading, 404, skip navigation, and a Radix-based Button with Tailwind tokens.
- Server-only API client with Zod parsing, status checking, timeouts, cancellation, and origin protection.
- Prettier, ESLint, Vitest, React Testing Library, MSW, Playwright, axe, and GitHub Actions.
- Minimal redacted request-error logging and a public uncached health endpoint.

Authentication, databases, CMS, state libraries, analytics providers, and deployment providers are product choices. Add them when needed; the starter does not ship a pretend authenticated dashboard.

## Commands

| Command                             | Purpose                                                    |
| ----------------------------------- | ---------------------------------------------------------- |
| `pnpm dev`                          | Development server                                         |
| `pnpm feature articles`             | Scaffold a new feature without overwriting existing files  |
| `pnpm typecheck`                    | Generate Next route types, then run TypeScript             |
| `pnpm lint`                         | Framework, accessibility, imports, and architecture checks |
| `pnpm format` / `pnpm format:check` | Format / verify formatting                                 |
| `pnpm test` / `pnpm test:watch`     | Unit/component/integration tests                           |
| `pnpm build` / `pnpm start`         | Build / serve production output                            |
| `pnpm check`                        | Types, lint, format, unit tests, production build          |
| `pnpm test:e2e`                     | Build and test a preview deployment                        |
| `E2E_INDEXING=true pnpm test:e2e`   | Build and test production discovery policy                 |

Install the test browser once with `pnpm exec playwright install chromium`. Linux CI uses `--with-deps`. E2E owns port 3100 and rebuilds the output; run its two modes sequentially locally. GitHub CI uses separate jobs for them and also audits production dependencies.

If your environment restricts the local worker ports Turbopack uses, build with `pnpm build:webpack` and run browser checks with `E2E_WEBPACK=true pnpm test:e2e` (combine with `E2E_INDEXING=true` for the production case). The default build and CI still use Turbopack.

## Where to change things

| Work                                     | Location                                             |
| ---------------------------------------- | ---------------------------------------------------- |
| Site name, description, origin, indexing | `.env.local` / hosting settings                      |
| Site language and social locale          | `src/shared/config/site.ts`                          |
| Homepage content                         | `src/features/home/views/home-view.tsx`              |
| Public routes/layout                     | `src/app/(marketing)`                                |
| New feature                              | `pnpm feature <name>`                                |
| Theme and fonts                          | `src/app/globals.css`                                |
| Reusable UI / shadcn target              | `src/ui/primitives`, `components.json`               |
| Page metadata and JSON-LD                | `src/shared/seo`                                     |
| Sitemap URL registration                 | `src/shared/seo/public-pages.ts`                     |
| External API integrations                | `src/shared/api/clients` and owning feature services |
| Security headers / image allowlist       | `next.config.ts`                                     |

The demo is English and uses matching language metadata. For Lao or multilingual products, update content, language, locale, and font coverage together; see the architecture guide.

## Documentation

- [Architecture and feature conventions](./docs/architecture.md)
- [SEO and AI-assisted discovery](./docs/seo-aeo.md)
- [New-project launch checklist](./docs/launch-checklist.md)
- [ESLint compatibility exception](./docs/decisions/0001-toolchain-compatibility.md)
- [Source engineering standard](./document.md)

ESLint 9 is retained because the installed Next.js React/accessibility/import plugins fail with ESLint 10. Review the documented exception during dependency updates. Runtime dependencies retain the existing Next.js/React versions; `pnpm-lock.yaml` provides reproducible installs.

No universal certification or search/AI visibility guarantee is implied. Production readiness also depends on real content, authorization, hosting, monitoring, manual accessibility review, and the launch checklist.
