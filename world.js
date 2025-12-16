const { setWorldConstructor, Before, After, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

class CustomWorld extends World {
  async launchBrowser() {
    const isHeadless = process.env.PLAYWRIGHT_HEADLESS === 'true' || process.env.PLAYWRIGHT_HEADLESS === true;
    this.browser = await chromium.launch({ headless: isHeadless });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async takeScreenshot(name) {
    const screenshotDir = 'screenshots';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${screenshotDir}/${name}-${timestamp}.png`;
    await this.page.screenshot({ path: filename });
    return filename;
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.launchBrowser();
});

After(async function ({ result }) {
  // Take screenshot on failure
  if (result.status === 'FAILED') {
    const screenshot = await this.takeScreenshot('failure');
    this.attach(
      fs.readFileSync(screenshot),
      'image/png'
    );
  }
  
  // Optional: Take screenshot on success
  // if (result.status === 'PASSED') {
  //   const screenshot = await this.takeScreenshot('success');
  //   this.attach(
  //     fs.readFileSync(screenshot),
  //     'image/png'
  //   );
  // }
  
  await this.closeBrowser();
});
