import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  reporter: 'list',

  use: {
    ...devices['Desktop Chrome'],
    trace: 'on',
    screenshot: 'only-on-failure',
  },
});