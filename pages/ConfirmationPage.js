// @ts-check
const{expect} = require('@playwright/test')

class ConfirmationPage{

    constructor(page){
        this.page = page;
        this.orderPlacedHeader = page.locator("h2[class='title text-center'] b");
        this.confirmationMessage = page.locator("div[class='col-sm-9 col-sm-offset-1'] p");
        this.downloadInvoiceBtn = page.locator(".btn.btn-default.check_out");
        this.continueBtn = page.locator("a[data-qa='continue-button']");
               
    }

    async verifyOrderConfirmation(confirmTextMsg){
       const confirmMsg = await this.confirmationMessage.textContent();
       expect(confirmMsg).toContain(confirmTextMsg);
    }

    
    async clickContinueBtn(){
        await this.continueBtn.click();
    }

}
module.exports = {ConfirmationPage}