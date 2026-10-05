# Authenticated routes

This group intentionally has no example dashboard or simulated authentication.

When adding a real authenticated feature:

1. Add a server layout with `metadata = { robots: { index: false, follow: false } }`.
2. Validate the session and authorization in every protected service and mutation. A layout redirect alone is insufficient.
3. Render personalized reads dynamically; never put user data in a shared public cache.
4. Keep these URLs out of `shared/seo/public-pages.ts`.
5. Allow crawlers to observe noindex. Robots rules do not protect private content.
6. Add unauthorized, forbidden, success, expiry, and safe-error tests.

For a separate private deployment, keep `INDEXING_ENABLED=false` and enforce authentication at the hosting layer as appropriate.
