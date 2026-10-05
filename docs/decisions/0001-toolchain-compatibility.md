# 0001 — ESLint compatibility pin

Status: implemented compatibility exception.

Rule: document.md section 5.1 requires supported stable versions.

Decision: retain ESLint 9.39.5 with eslint-config-next 16.3.8. ESLint 10.12.0 was tested and fails while loading react/display-name because eslint-plugin-react 7.37.5 calls a removed context.getFilename API. eslint-plugin-import and eslint-plugin-jsx-a11y also declare support only through ESLint 9. No peer dependency overrides or experimental framework features are used.

Risk: ESLint 9 is marked unsupported by its registry metadata. It is a development dependency, but upgrades and security advisories still need review.

Owner: starter maintainer; assign a named maintainer when adopting the repository.
Review date: 2026-11-05.
Removal condition: the Next.js lint stack supports ESLint 10 and lint/import-boundary regression checks pass.
Rollback: restore package.json and pnpm-lock.yaml together if a toolchain upgrade fails.

MSW remains on its compatible stable 2.x line because the installed Vitest mocker declares an MSW 2.x peer. Node 24 types match the declared Node 24 runtime. Dependencies are pinned reproducibly by the committed pnpm lockfile.
