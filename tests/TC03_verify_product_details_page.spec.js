const { expect, test } = require('@playwright/test');
const { POManager } = require('../pages/POManager');

// Import test data
const testConfig = require('../Data/login_data.json');
const orderdata = require('../Data/orderData.json').orderdata;

test.describe('Test 3: product page test', () => {
    let page;
    let poManager;
    let productsPg;
    let loginpage;
    let cartPg;
    let checkoutPg;
    let confirmPg;
    let paymentPg;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        poManager = new POManager(page);
        productsPg = poManager.getProductsPage();
        loginpage = poManager.getLoginPage();
        cartPg = poManager.getCartPage();
        checkoutPg = poManager.getCheckoutPage();
        confirmPg = poManager.getConfirmationPage();
        paymentPg = poManager.getPaymentPage();

        // Using testConfig data
        const { BASE_URL, username, password } = testConfig.logindata;

        console.log('base url is:' + BASE_URL);
        await loginpage.navigateToUrl(BASE_URL);
        await loginpage.doLogin(username, password);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('TC03_Add product to the Cart', async () => {
        test.setTimeout(60000);
        await productsPg.navigateToProductsPage();
        await expect(page).toHaveTitle('Automation Exercise - All Products');
        await productsPg.searchproduct(orderdata.productName);
        await productsPg.validateSearchProduct(orderdata.productName);
        await productsPg.clickAddToCart();
        await productsPg.navigateToCartPage();
        await cartPg.verifyProductIsDisplayed(orderdata.productName);
    });

    test('TC04_place an order', async () => {
        test.setTimeout(60000);
        await productsPg.navigateToProductsPage();
        await productsPg.searchproduct(orderdata.productName);
        await productsPg.validateSearchProduct(orderdata.productName);
        await productsPg.clickAddToCart();
        await productsPg.verifyAddToCartModalContent();
        await productsPg.navigateToCartPage();
        await cartPg.verifyProductIsDisplayed(orderdata.productName);
        await cartPg.clickCheckout();
        await checkoutPg.verifyDeliveryAddressDetails(orderdata.deliveryAddressName, orderdata.mobileNo);
        await checkoutPg.verifyCheckoutContent();
       // await checkoutPg.fillCommentBox('placing a dress order');
        await checkoutPg.clickPlaceOrder();
        await paymentPg.enterPaymentDetails(orderdata.NameOnCard, orderdata.CardNumber, orderdata.cvc, orderdata.expiryMonth, orderdata.expiryYear);
        await paymentPg.clickPayBtn();
        await confirmPg.verifyOrderConfirmation(orderdata.confirmationMessage);
        await confirmPg.clickContinueBtn();
    });
});
