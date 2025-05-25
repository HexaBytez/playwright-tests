import { defineConfig } from '@playwright/test';
import { BASE_URL } from './config/urls';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  retries: 1,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  outputDir: 'test-results/',
  expect: {
    timeout: 120000,
  },
  use: {
    headless: true,
    baseURL: BASE_URL,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 120000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    //{ name: 'firefox', use: { browserName: 'firefox' } },
    //{ name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
