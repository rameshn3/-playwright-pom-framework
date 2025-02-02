// @ts-check
const{expect} = require('@playwright/test')

class CheckoutPage{

    constructor(page){
        this.page = page;
        this.addressDetailHeader = page.locator("(//h2[@class='heading'])[1]");
        this.yourDeliveryAddressHeader = page.locator("//h3[normalize-space()='Your delivery address']");
        this.deliveryAddressDetails = page.locator("ul#address_delivery >li");
        this.billingAddressHeader = page.locator("//h3[normalize-space()='Your billing address']");
        this.reviewOrderHeader = page.locator("//h2[normalize-space()='Review Your Order']");
        this.commentTextAreabox = page.locator("//textarea[@name='message']");
        this.placeOrderBtn = page.locator(".btn.btn-default.check_out");
    }

    async verifyDeliveryAddressDetails(expectedName, expectedMobile){
        const name = await this.deliveryAddressDetails.nth(1).textContent();
       const mobileNo = await this.deliveryAddressDetails.nth(7).textContent();
       console.log("name --->"+name + " mobile no : -->"+mobileNo);
       expect(name).toContain(expectedName);
       expect(mobileNo).toContain(expectedMobile);
    }

    async verifyCheckoutContent(){
        expect(await this.addressDetailHeader).toBeVisible();
        expect(await this.yourDeliveryAddressHeader).toBeVisible();
        expect(await this.billingAddressHeader).toBeVisible();
        expect(await this.reviewOrderHeader).toBeVisible();
    }

    async fillCommentbox(textToEnter){
        await this.commentTextAreabox.fill(textToEnter);
    }

    async clickPlaceOrder(){
        await this.placeOrderBtn.click();
    }

}
module.exports = {CheckoutPage}