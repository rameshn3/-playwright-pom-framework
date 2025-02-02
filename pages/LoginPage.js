const{expect} = require('@playwright/test')
class LoginPage{

    constructor(page){
        this.page = page;
        this.signupLoginLink = page.locator("//a[normalize-space()='Signup / Login']");
        this.emailEditbox = page.locator("//input[@data-qa='login-email']");
        this.passwordEditbox = page.locator("//input[@placeholder='Password']");
        this.loginBtn = page.locator("//button[@type='submit' and @data-qa='login-button']");
        this.loggedInUserName = page.locator("//ul[@class='nav navbar-nav']//li[last()]//b");
        this.logoutLink = page.getByRole('link',{name:' Logout'});
        this.logo = page.locator("img[alt='Website for automation practice']");
    }

    async navigateToUrl(url){
        await this.page.goto(url);
    }

    async doLogin(username,password){
        await this.signupLoginLink.click();
        await  this.emailEditbox.fill(username);
        await this.passwordEditbox.fill(password);
        await  this.loginBtn.click();
    }

    async doLogout(){
        await  this.logoutLink.click();
    }

    async verifyLoggedInUserAndLogo(){
        await expect( this.logo).toBeVisible();
        await expect(this.loggedInUserName).toHaveText('Ramesh Ch');
    }

}
module.exports = {LoginPage}