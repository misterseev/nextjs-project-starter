import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const features = readdirSync(new URL("./src/features", import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const zones = [
  {
    target: "./src/shared",
    from: ["./src/features", "./src/app", "./src/ui"],
    message: "Shared infrastructure cannot depend on UI, routes, or features.",
  },
  {
    target: "./src/ui",
    from: ["./src/features", "./src/app"],
    message: "UI must remain independent of features and routes.",
  },
  {
    target: "./src/features",
    from: "./src/app",
    message: "Features cannot import the routing layer.",
  },
  ...features.map((feature) => ({
    target: [
      "./src/app",
      ...features
        .filter((other) => other !== feature)
        .map((other) => `./src/features/${other}`),
    ],
    from: `./src/features/${feature}`,
    except: ["./index.ts", "./server.ts"],
    message:
      "Use the feature public API (index.ts), or its explicit server-only server.ts entry.",
  })),
];

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
  {
    files: ["src/**/*.{ts,tsx}"],
    settings: {
      "import/resolver": { typescript: { project: "./tsconfig.json" } },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "import/no-duplicates": "error",
      "import/no-cycle": "error",
      "import/no-restricted-paths": [
        "error",
        { basePath: fileURLToPath(new URL(".", import.meta.url)), zones },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "type",
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          warnOnUnassignedImports: true,
          pathGroups: [
            { pattern: "**/*.css", group: "index", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/test/**/*.{ts,tsx}"],
    rules: { "import/no-restricted-paths": "off" },
  },
]);
