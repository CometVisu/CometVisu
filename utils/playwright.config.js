/**
 * Playwright screenshot generation config
 *
 * Shared config for screenshot generation with Playwright
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: __dirname,
  testMatch: 'screenshots.playwright.js',
  
  // Run tests sequentially for screenshot generation
  workers: 1,
  fullyParallel: false,
  
  // Timeout for each test
  timeout: 60000,
  
  // Expect timeout
  expect: {
    timeout: 5000
  },

  use: {
    // Base URL for the dev server
    baseURL: 'http://localhost:8000',
    
    // Run headless
    headless: true,
    
    // Viewport size
    viewport: { width: 1300, height: 800 },
    
    // Locale settings
    locale: process.env.CHROME_LANG || 'en',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Trace on failure
    trace: 'retain-on-failure',
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
  },

  // Reporter configuration - 'line' shows progress and stdout/stderr
  // Empty array shows only stdout/stderr without progress
  reporter: process.env.CV_VERBOSE === 'true' 
    ? [['line']] 
    : [['dot']],

  // Projects for different browsers (we only need chromium)
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: undefined, // Use bundled chromium
        launchOptions: {
          args: [
            '--disable-gpu',
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ]
        }
      },
    },
  ],
});
