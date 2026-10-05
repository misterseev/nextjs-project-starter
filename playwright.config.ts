import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const production = process.env.E2E_INDEXING === "true";
const buildCommand =
  process.env.E2E_WEBPACK === "true" ? "pnpm build:webpack" : "pnpm build";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://127.0.0.1:${port}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `${buildCommand} && pnpm start --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      APP_ENV: production ? "production" : "preview",
      SITE_URL: "https://www.acme.org",
      SITE_NAME: "Next.js Starter",
      SITE_DESCRIPTION:
        "A reusable foundation for accessible, discoverable web applications.",
      INDEXING_ENABLED: production ? "true" : "false",
      VERCEL_ENV: production ? "production" : "preview",
    },
  },
});
