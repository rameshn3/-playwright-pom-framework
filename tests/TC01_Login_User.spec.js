const { test } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const testConfig = require('../Data/login_data.json'); // Import the entire JSON object

test.describe('Smoke Suite', () => {

    test('TC01_Login user with correct email and password', async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        console.log("Running tests in environment with BASE_URL=", testConfig.logindata.BASE_URL);
        await loginpage.navigateToUrl(testConfig.logindata.BASE_URL);
        await loginpage.doLogin(testConfig.logindata.username, testConfig.logindata.password);
        await loginpage.verifyLoggedInUserAndLogo();
    });

    test('TC02_logout', async ({ page }) => {
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        await loginpage.navigateToUrl(testConfig.logindata.BASE_URL);
        await loginpage.doLogin(testConfig.logindata.username, testConfig.logindata.password);
        await loginpage.verifyLoggedInUserAndLogo();
        await loginpage.doLogout();
    });

});
