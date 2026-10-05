# Feature ownership

Run `pnpm feature articles` to scaffold a feature. Keep only directories the feature needs.

- `index.ts`: small client-safe public API.
- `server.ts`: separate public API that imports `server-only`.
- `views/`: substantial route UI, composed by `app/`.
- `components/`, `hooks/`: local UI and interactive behavior.
- `schemas/`: Zod input and transport schemas.
- `server/`: privileged services, repositories, and cache keys.
- `actions/`: independently authorized and validated mutations.
- `types/`, `utils/`: feature domain types and pure functions.

Cross-feature imports and routes must use public entries. ESLint discovers feature directories automatically and rejects internal imports, upward dependencies, and cycles. Tests may inspect internals to exercise boundaries.
