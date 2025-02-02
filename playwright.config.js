// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// Load environment variables based on NODE_ENV (default: local)
const ENV = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `configs/.env.${ENV}`) });

console.log(`Running tests in ${ENV} environment with BASE_URL=${process.env.BASE_URL}`);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  timeout:30*1000, //30 s timeout per test
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html',{outputFolder:'results/html-report'}],
  ["allure-playwright",{
    detail:true,
    outputFolder:"results/allure-report-results",
    suiteTitle: false,
  },]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: process.env.HEADLESS === 'true',
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name:`Chrome`,
      use:{
        browserName:`chromium`,
        channel:`chrome`,
        headless:false,
        viewport:{width:1500, height:730},
        ignoreHTTPSErrors:true,
        //enable file downloads in chrome
        acceptDownloads:true,
        screenshot:`only-on-failure`,
        video:`retain-on-failure`,
        trace:`retain-on-failure`,
        //Slows down the execution by ms
        launchOptions:{
          slowMo:1000
        }
      },
    },
    {
      name:`edge`,
      use:{
        browserName:`chromium`,
        channel:`edge`,
        headless:false,
        viewport:{width:1500, height:730},
        ignoreHTTPSErrors:true,
        //enable file downloads in chrome
        acceptDownloads:true,
        screenshot:`only-on-failure`,
        video:`retain-on-failure`,
        trace:`retain-on-failure`,
        //Slows down the execution by ms
        launchOptions:{
          slowMo:1000
        }
      },
    },
    {
      name: 'chromium',
      use: {  browserName:`chromium`,
        headless:false,
        viewport:{width:1500, height:730},
        ignoreHTTPSErrors:true,
        //enable file downloads in chrome
        acceptDownloads:true,
        screenshot:`only-on-failure`,
        video:`retain-on-failure`,
        trace:`retain-on-failure`,
        //Slows down the execution by ms
        launchOptions:{
          slowMo:1000
        }
      }, 
    },

    {
      name: 'firefox',
      use: {  browserName:`firefox`,
        channel:`chrome`,
        headless:false,
        viewport:{width:1500, height:730},
        ignoreHTTPSErrors:true,
        //enable file downloads in chrome
        acceptDownloads:true,
        screenshot:`only-on-failure`,
        video:`retain-on-failure`,
        trace:`retain-on-failure`,
        //Slows down the execution by ms
        launchOptions:{
          slowMo:1000
        }
      },
    },

    {
      name: 'webkit',
      use: { browserName:`webkit`,
        headless:false,
        viewport:{width:1500, height:730},
        ignoreHTTPSErrors:true,
        //enable file downloads in chrome
        acceptDownloads:true,
        screenshot:`only-on-failure`,
        video:`retain-on-failure`,
        trace:`retain-on-failure`,
        //Slows down the execution by ms
        launchOptions:{
          slowMo:1000
        }
       },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

