const {test} = require('@playwright/test');
const{POManager} = require('../pages/POManager');
const{testConfig} = require('../Data/login_data');
const{orderData} = require('../Data/orderData');

test.describe('Smoke Suite',() =>{

    test('TC01_Login user with correct email and password', async ({page}) =>{
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        console.log("Running tests in dev environment with BASE_URL=", testConfig.BASE_URL);
        await loginpage.navigateToUrl(testConfig.BASE_URL);
        await loginpage.doLogin(testConfig.username,testConfig.password);
        await loginpage.verifyLoggedInUserAndLogo();
    })

    test('TC02_logout', async ({page}) =>{
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        await loginpage.navigateToUrl(testConfig.BASE_URL);
        await loginpage.doLogin(testConfig.username,testConfig.password);
        await loginpage.verifyLoggedInUserAndLogo();
        await loginpage.doLogout();
    })
})