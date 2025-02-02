// @ts-check
const{expect} = require('@playwright/test')

class ContactUsFormPage{
    constructor(page){
        this.page = page;
        this.contactUsLink = page.locator("//a[normalize-space()='Contact us']");
        this.getInTouchHeader = page.getByRole('heading',{name:'Get In Touch'});
        this.nameEditbox = page.getByPlaceholder('Name');
        this.emailEditbox = page.getByPlaceholder('Email');
        this.subjectEditbox = page.getByPlaceholder('Subject');
        this.messageTextAreaBox = page.getByPlaceholder('Your Message Here');
        this.chooseFileBtn = page.locator("//input[@name='upload_file']");
        this.submitBtn = page.locator("//input[@name='submit']");
        this.successMessage = page.locator('div.status.alert.alert-success');
        this.HomeBtn = page.locator("//span[normalize-space()='Home']");
    }

    async verifyContactUsLink(){
        expect(this.contactUsLink).toBeVisible();
        console.log(this.contactUsLink.textContent());
    }

    async clickContactUsLink(){
        this.contactUsLink.click();
       
    }

    async fillContactUsForm(name,email,subject,messageBody,filePath){
        await this.nameEditbox.fill(name);
        await this.emailEditbox.fill(email);
        await  this.subjectEditbox.fill(subject);
        await  this.messageTextAreaBox.fill(messageBody);
        await this.chooseFileBtn.setInputFiles(filePath); 
    }
    
    async clickSubmitBtn(){
        await this.submitBtn.click();
    }

    async verifySuccessMessage(expSucMsg){
        const actSucMsg = await this.successMessage.textContent();
        console.log('actual success mesage is:',actSucMsg);
        expect(actSucMsg).toBe(expSucMsg);
    }

    async clickHomeBtn(){
        await  this.HomeBtn.click();

    }
}
module.exports = {ContactUsFormPage}