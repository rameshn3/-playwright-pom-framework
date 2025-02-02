const{LoginPage } = require('./LoginPage');
const{ContactUsFormPage} = require('./ContactUsFormPage');
const{ConfirmationPage} = require('./ConfirmationPage');
const{ProductsPage} = require('./ProductsPage');
const{PaymentPage} = require('./PaymentPage');
const{CheckoutPage} = require('./CheckoutPage');
const{CartPage} = require('./CartPage');
class POManager{

constructor(page){
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.contactUsFormPage = new ContactUsFormPage(this.page);
    this.confirmationPage  = new ConfirmationPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.paymentPage = new PaymentPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.cartPage = new CartPage(this.page);
}

getLoginPage(){
    return this.loginPage;
}

getContactUsFormPage(){
    return this.contactUsFormPage;
}

getConfirmationPage(){
    return this.confirmationPage;
}

getProductsPage(){
    return this.productsPage;
}

getPaymentPage(){
    return this.paymentPage;
}

getCheckoutPage(){
    return this.checkoutPage;
}

getCartPage(){
    return this.cartPage;
}

}
module.exports = {POManager};