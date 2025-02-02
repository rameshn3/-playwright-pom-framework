// utils/fileUtils.js
const fs = require('fs');

class FileUtils {
  constructor(page) {
    this.page = page;
  }

  /** Upload a file */
  async uploadFile(selector, filePath) {
    const fileChooser = await this.page.locator(selector).setInputFiles(filePath);
  }

  /** Download a file */
  async downloadFile(selector) {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.locator(selector).click(),
    ]);
    
    const path = await download.path();
    console.log(`File downloaded at: ${path}`);
  }

  /** Check if file exists */
  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }
}

module.exports = FileUtils;
