# SEO and AI-assisted discovery

Technical foundations support discovery; they do not guarantee search rankings, rich results, or AI citations. AIO/AEO here means useful, accurate content that people and answer systems can understand.

## Publishing configuration

| Setting                         | Purpose                                                                 |
| ------------------------------- | ----------------------------------------------------------------------- |
| `SITE_URL`                      | Canonical HTTP(S) origin only; no path, query, credentials, or fragment |
| `SITE_NAME`, `SITE_DESCRIPTION` | Visible homepage identity, metadata, social image, and WebSite schema   |
| `APP_ENV`                       | development, test, preview, or production; independent of NODE_ENV      |
| `INDEXING_ENABLED`              | Explicit true/false switch; defaults to false                           |

Indexing requires a production build, `APP_ENV=production`, `INDEXING_ENABLED=true`, and a valid HTTPS production origin. Vercel previews remain noindex even if the production settings are copied. Other hosts must set `APP_ENV=preview` for their preview builds. Production builds without explicit APP_ENV/SITE_URL fail instead of silently using localhost.

Non-indexable deployments emit robots noindex metadata and an X-Robots-Tag header, with an empty sitemap. Their robots.txt allows crawling so compliant crawlers can observe noindex. Protect confidential previews with authentication; neither robots nor noindex is access control.

Metadata routes and headers are built for the target deployment. Rebuild after changing these settings, and do not promote a preview artifact to production without rebuilding. NEXT_PUBLIC values are also build-time public data.

## Page contract

1. Render essential content in the initial HTML with one clear primary heading.
2. Give each indexable page its own useful title, description, and canonical path through `createMetadata`.
3. Register only real, successful canonical public pages in `public-pages.ts`. Do not add login, dashboard, filters, query variants, or noindex pages.
4. Keep tracking parameters out of canonical URLs. Use real permanent redirects for moved URLs.
5. Use real content modification timestamps for sitemap lastModified; the starter omits it instead of generating a false date.
6. Keep structured data aligned with visible content. The starter emits only WebSite; add Organization, Article, BreadcrumbList, or other types only when justified by actual content.
7. Validate schema with [Schema.org Validator](https://validator.schema.org/) and eligible features with [Google Rich Results Test](https://search.google.com/test/rich-results).
8. For multilingual pages, use matching language metadata and accurate reciprocal alternatives.

JSON-LD is typed and escapes less-than signs before rendering, preventing script-tag injection. Social cards are generated locally through Next ImageResponse. Customize brand assets, and supply a suitable font before using scripts unsupported by the default image renderer.

## Answer-ready content

Answer the reader's main question near the relevant heading, then provide details, definitions, steps, tables, dates, units, and limitations when useful. Cite authoritative evidence near factual claims. Identify real authors and meaningful updates where accountability and freshness matter. Do not invent testimonials, expertise, review counts, or publication dates.

The default public crawler policy permits crawling. Decide search retrieval and training policies separately with product/content owners before launch; verify crawler names and controls against each operator's current documentation. A blanket robots rule is not a licensing or privacy mechanism.

No llms.txt is generated. It is an optional maintained navigation aid, not a universal standard or ranking requirement. Google's [AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says special AI text files and special schema are not required for its AI search features.

## Verification and measurement

Run browser checks in both modes:

```sh
pnpm test:e2e
E2E_INDEXING=true pnpm test:e2e
```

After launch, verify the actual domain's headers, canonical URLs, rendered HTML, robots, sitemap, redirects, and schema. Submit the production sitemap to the appropriate webmaster tools. Monitor indexing issues, qualified organic traffic, observed referral traffic, and task outcomes. Measure field Core Web Vitals; automated accessibility and synthetic measurements cover only part of production quality.

References: [Next metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Google structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), and [Google AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
