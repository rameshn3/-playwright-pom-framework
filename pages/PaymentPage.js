// @ts-check
const{expect} = require('@playwright/test')

class PaymentPage{

    constructor(page){
        this.page = page;
        this.nameOncardEditbox = page.locator("input[name='name_on_card']");
        this.cardNumberEditbox = page.locator("input[name='card_number']");
        this.cvcEditbox = page.locator("input[name='cvc']");
        this.expirationMonth = page.locator("input[placeholder='MM']");
        this.expirationYear = page.locator("input[placeholder='YYYY']");
        this.payConfirmBtn = page.locator("#submit");
       
    }

    async enterPaymentDetails(nameOnCard, CardNumber, cvc, expiryMonth, year){
        await this.nameOncardEditbox.fill(nameOnCard);
        await this.cardNumberEditbox.fill(CardNumber);
        await this.cvcEditbox.fill(cvc);
        await this.expirationMonth.fill(expiryMonth);
        await this.expirationYear.fill(year);
    }

    
    async clickPayBtn(){
        await this.payConfirmBtn.click();
    }

}
module.exports = {PaymentPage}