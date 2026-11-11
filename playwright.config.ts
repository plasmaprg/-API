import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://api.restful-api.dev',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
