import { setWorldConstructor, Before, After, World, IWorldOptions, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60000);

export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  launchBrowser(scenarioName: string): Promise<void>; 
  closeBrowser(scenarioName: string): Promise<void>;
  takeScreenshot(name: string): Promise<string>;
}

class CustomWorld extends World implements ICustomWorld {
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  public async launchBrowser(scenarioName: string): Promise<void> {
    const isHeadless = process.env.PLAYWRIGHT_HEADLESS === 'true';
    
    // 1. Launch Browser
    this.browser = await chromium.launch({ 
      headless: isHeadless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // 2. Setup Context with VIDEO enabled
    this.context = await this.browser.newContext({
      recordVideo: {
        dir: './test-results/bdd-videos/',
        size: { width: 1280, height: 720 }
      }
    });

    // 3. Start TRACING
    await this.context.tracing.start({ 
      screenshots: true, 
      snapshots: true, 
      sources: true 
    });

    this.page = await this.context.newPage();
  }

  public async closeBrowser(scenarioName: string): Promise<void> {
    // 4. Stop Tracing and save file
    if (this.context) {
      const safeName = scenarioName.replace(/\W/g, '_');
      await this.context.tracing.stop({
        path: path.join(process.cwd(), `test-results/bdd-traces/${safeName}-${Date.now()}.zip`)
      });
      
      // 5. Closing context SAVES the video
      await this.context.close();
    }
    
    if (this.browser) {
      await this.browser.close();
    }
  }

  public async takeScreenshot(name: string): Promise<string> {
    const screenshotDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = path.join(screenshotDir, `${name}-${timestamp}.png`);
    await this.page.screenshot({ path: filename, fullPage: true });
    return filename;
  }
}

setWorldConstructor(CustomWorld);

// Updated Before Hook
Before({ timeout: 30000 }, async function (this: CustomWorld, { pickle }) {
  await this.launchBrowser(pickle.name);
});

// Updated After Hook
After(async function (this: CustomWorld, { result, pickle }) {
  // Handle Screenshots on failure
  if (result?.status === Status.FAILED) {
    try {
      const safeName = pickle.name.replace(/\W/g, '_');
      const screenshotPath = await this.takeScreenshot(`failed-${safeName}`);
      const image = fs.readFileSync(screenshotPath);
      this.attach(image, 'image/png'); 
    } catch (error) {
      console.error('Failed to take failure screenshot:', error);
    }
  }

  // Graceful Cleanup (This will now save video and trace correctly)
  await this.closeBrowser(pickle.name);
  
  // Wait a moment for the video file to finish writing to disk
  await new Promise(resolve => setTimeout(resolve, 1000));
});