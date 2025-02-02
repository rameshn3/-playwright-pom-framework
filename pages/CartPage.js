// @ts-check
const{expect} = require('@playwright/test')

class CartPage{

    constructor(page){
        this.page = page;
        this.cartproducts = page.locator("table#cart_info_table >tbody > tr");
        this.lastCartproduct = page.locator("table#cart_info_table >tbody > tr").last();
        this.checkout = page.locator(".btn.btn-default.check_out");
    }

    async getProductLocator(productName){
        console.log(this.page.locator("h4>a:has-text('"+productName+"')"));
        return this.page.locator("h4>a:has-text('"+productName+"')");
    }

    async verifyProductIsDisplayed(productName){
        await this.cartproducts.waitFor();
        expect(await this.getProductLocator(productName)).toBeVisible();
    }

    async clickCheckout(){
        await this.checkout.click();
    }

}
module.exports = {CartPage}