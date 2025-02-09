import { test } from '@playwright/test';
import { POManager } from '../pages/POManager.js';
const PlaywrightUtils = require('../utils/playwrightUtils'); 
import { ContactForm } from '../Data/ContactForm.json'; // Correct ES6 import

test.describe.configure({ mode: 'serial' });

test.describe('@smoke Test 2: Contact Us Form', () => {

    test('TC01_verify contactus button on Home page', async ({ page }) => {
        await page.goto('/');
        const poManager = new POManager(page);
        const contactFormPage = poManager.getContactUsFormPage();
        await contactFormPage.verifyContactUsLink();
    });

    test('TC02_submit the contact us form', async ({ page }) => {
        await page.goto('/');
        const poManager = new POManager(page);
        const contactFormPage = poManager.getContactUsFormPage();
        const pwUtils = new PlaywrightUtils(page);
        console.log('Name is:', ContactForm.Name);
        console.log('Email is:', ContactForm.Email);
        console.log('Subject is:', ContactForm.Subject);
        console.log('Message body is:', ContactForm.MessageBody);
        
        await contactFormPage.clickContactUsLink();
        await contactFormPage.fillContactUsForm(
            ContactForm.Name, 
            ContactForm.Email, 
            ContactForm.Subject, 
            ContactForm.MessageBody, 
            ContactForm.filePath
        );
        await contactFormPage.clickSubmitBtn();
        await pwUtils.handleAlert('accept', 'Press OK to proceed!');
        await page.waitForLoadState();
        await contactFormPage.verifySuccessMessage();
        await contactFormPage.clickHomeBtn();
    });

});
