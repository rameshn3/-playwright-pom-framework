const { test } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { testConfig } = require('../Data/login_data'); // Ensure correct import

test.describe('Smoke Suite', () => {

    test('TC01_Login user with correct email and password', async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();

        console.log("Running tests in environment with BASE_URL=", testConfig.BASE_URL);
        process.env.USERNAME = "rameshqaonline@gmail.com";
        console.log("🔍 Forced USERNAME:", `"${process.env.USERNAME}"`);
        console.log("🔍 Debugging PASSWORD:", `"${testConfig.password}"`);
        if (!testConfig.BASE_URL) {
            throw new Error("🚨 BASE_URL is not defined. Please check your .env file.");
        }

        await loginpage.navigateToUrl(testConfig.BASE_URL);
        await loginpage.doLogin( process.env.USERNAME, testConfig.password);
        await loginpage.verifyLoggedInUserAndLogo();
    });

    test('TC02_logout', async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();

        await loginpage.navigateToUrl(testConfig.BASE_URL);
        await loginpage.doLogin( process.env.USERNAME, testConfig.password);
        await loginpage.verifyLoggedInUserAndLogo();
        await loginpage.doLogout();
    });

});
