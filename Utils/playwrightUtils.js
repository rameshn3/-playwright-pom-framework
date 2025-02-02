// utils/playwrightUtils.js

const { expect } = require('@playwright/test');

class PlaywrightUtils {
  
  constructor(page) {
    this.page = page;
  }

  /** Click on an element */
  async click(selector) {
    await this.page.locator(selector).click();
  }

  /** Type into an input field */
  async type(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  /** Select from a dropdown */
  async selectDropdown(selector, value) {
    await this.page.locator(selector).selectOption(value);
  }

  /** Wait for an element to be visible */
  async waitForElement(selector, timeout = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /** Assert that an element contains text */
  async assertText(selector, expectedText) {
    const actualText = await this.page.locator(selector).textContent();
    expect(actualText.trim()).toBe(expectedText);
  }

  /** Take a screenshot */
  async takeScreenshot(filename = 'screenshot.png') {
    await this.page.screenshot({ path: `results/${filename}`, fullPage: true });
  }

  /** Log message to console */
  logMessage(message) {
    console.log(`🔹 LOG: ${message}`);
  }
}

module.exports = PlaywrightUtils;
