// @ts-check
const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsLink = page.getByText(" Products");
        this.products = page.locator("//div[contains(@class,'productinfo')]");
        this.saleBanner = page.locator('#sale_image');
        this.productName = page.locator("//div[contains(@class,'productinfo')]/p");
        this.viewProduct = page.locator("//ul[contains(@class,'nav nav-pills nav-justified')]/li/a");
        this.price = page.locator("div[class='product-information'] span span");
        this.searchEditbox = page.locator('#search_product');
        this.searchTorchIcon = page.locator("#submit_search");
        this.brandName = page.locator("//b[normalize-space()='Brand:']");
        this.dressName = page.locator("div[class='product-information'] h2");
        this.addToCartBtn = page.locator("//div[@class='productinfo text-center']//a[@class='btn btn-default add-to-cart'][normalize-space()='Add to cart']");
        this.addedHeader = page.locator("//h4[normalize-space()='Added!']");
        this.addedToCartMsg = page.locator("div[id='cartModal'] p:nth-child(1)");
        this.viewCartLink = page.locator("//u[normalize-space()='View Cart']");
        this.continueShoppingBtn = page.locator(".btn.btn-success.close-modal.btn-block");
    }

    async navigateToProductsPage() {
        await this.productsLink.click();
        await expect(this.page).toHaveTitle("Automation Exercise - All Products");
    }

    async validateSaleBanner() {
        await this.saleBanner.waitFor();
        expect(await this.saleBanner.screenshot()).toMatchSnapshot('VisualTestData/saleBanner.jpg');
    }

    async validateProductCount(expProductCount) {
        const productCount = await this.products.count();
        console.log("product count --->" + productCount);
        expect(productCount).toBe(expProductCount);
    }

    async searchproduct(productName) {
        await this.searchEditbox.waitFor();
        await this.searchEditbox.fill(productName);
        await this.searchTorchIcon.click();
    }

    async validateSearchProduct(productName) {
        const productCount = await this.products.count();
        console.log("product count --->" + productCount);
        for (let i = 0; i < productCount; i++) {
            const rowText = await this.productName.nth(i).textContent();
            console.log(`--UI Text is--->${rowText}`);
            expect(rowText).toBe(productName);
        }
    }
async clickAddToCart(){
    await  this.addToCartBtn.click();
}
    async clickOnViewProductBtn(productName) {
        const productCount = await this.products.count();
        console.log("product count --->" + productCount);
        console.log(`view product count ${await this.viewProduct.count()}`);
        for (let i = 0; i < productCount; i++) {
            if (await this.productName.nth(i).textContent() === productName) {
                await this.page.waitForLoadState();
                await this.viewProduct.nth(i).click();
                await this.page.goto('https://automationexercise.com/product_details/' + i);
                break;
            }
        }
    }

    async validateProductDetailsPage() {
        const dressName = await this.dressName.textContent();
        const price = await this.price.textContent();
        const brand = await this.brandName.textContent();
        console.log(`dressname ${dressName} price ${price} brandname ${brand}`);
    }

    async verifyAddToCartModalContent() {
       // await expect(this.addedHeader).toBeVisible();
        await expect(this.addedToCartMsg).toBeVisible();
        await expect(this.viewCartLink).toBeVisible();
        await expect(this.continueShoppingBtn).toBeVisible();
    }

    async navigateToCartPage() {
        await this.viewCartLink.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingBtn.click();
    }
}

module.exports = { ProductsPage };