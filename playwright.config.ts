import { defineConfig } from "@playwright/test";

const staticExport = process.env.PLAYWRIGHT_STATIC_EXPORT === "true";
const baseURL = process.env.PLAYWRIGHT_BASE_URL || (staticExport ? "http://localhost:3002" : "http://localhost:3000");
export default defineConfig({
  testDir: "./tests",
  timeout: 180000,
  expect: { timeout: 15000 },
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: staticExport
      ? `npx serve out -l ${new URL(baseURL).port || "3002"}`
      : `npm run dev -- --port ${new URL(baseURL).port || "3000"}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120000,
  },
});
