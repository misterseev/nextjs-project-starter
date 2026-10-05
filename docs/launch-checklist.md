# New project checklist

- [ ] Rename package.json and set project ownership, repository, license, and review dates.
- [ ] Configure build and runtime environments; never expose secrets in NEXT_PUBLIC values.
- [ ] Replace homepage copy, SITE_NAME, SITE_DESCRIPTION, icons, social card, and actual language settings.
- [ ] Set the real HTTPS SITE_URL and rebuild for production with APP_ENV=production and INDEXING_ENABLED=true only when content is ready.
- [ ] Set previews to APP_ENV=preview, keep indexing disabled, and authenticate confidential previews.
- [ ] Build features through public APIs; authorize all private data reads, actions, and handlers.
- [ ] Review crawler policy, canonical strategy, sitemap entries, schema, and localized equivalents.
- [ ] Validate the live canonical origin, robots, sitemap, status codes, structured data, and social sharing.
- [ ] Configure trusted API/image origins, deployment-specific CSP/TLS/HSTS, and privacy policy.
- [ ] Connect redacted error monitoring and privacy-appropriate field performance telemetry.
- [ ] Define route performance budgets and test keyboard, screen reader, mobile, and reduced motion.
- [ ] Run pnpm check and both E2E indexing modes; review dependency audit results.
- [ ] Review the ESLint compatibility exception and assign a named owner.
- [ ] Choose deployment, backup, incident response, and rollback procedures.
