# API integrations

Create server-only clients here using `createApiClient` with a validated, trusted base URL. Keep credentials in `env.server.ts`; never place them in `NEXT_PUBLIC_` variables.

Services belong to the owning feature. The starter client uses GET, validates JSON with Zod, checks status codes, defaults to `no-store`, applies a timeout, honors cancellation, and rejects cross-origin requests and redirects. Use a separate reviewed mutation contract when needed.

For public cacheable data, set an intentional Next.js fetch policy at the service boundary. Document freshness and invalidation ownership. Do not call your application's own API routes from Server Components.
