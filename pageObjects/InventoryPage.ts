import { Locator, Page } from '@playwright/test';

interface InventoryOptions {
  screenshot?: boolean;
}
export class InventoryPage {
  private readonly page: Page;
  private readonly inventoryItems: Locator;
  private readonly cartButton: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page; 
    this.inventoryItems = page.locator('.inventory_list .inventory_item');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async clickCartButton(options?: InventoryOptions, testInfo?: any): Promise<void> {
    await this.cartButton.click();

    if (options?.screenshot && testInfo) {
      const screenshot = await this.page.screenshot();
      await testInfo.attach('Cart-Page-View', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  }

  async addAllItemsToCart(options?: InventoryOptions, testInfo?: any): Promise<void> {
    // 1. Wait for the first item to ensure the list has loaded
    await this.inventoryItems.first().waitFor({ state: 'visible' });

    // 2. Get the total count of items
    const itemCount: number = await this.inventoryItems.count();
    console.log(`Number of items found: ${itemCount}`);

    // 3. Loop through each item by index and click its specific button
    for (let i = 0; i < itemCount; i++) {
      // Scope the locator to the specific item at index 'i'
      const itemButton = this.inventoryItems.nth(i).locator('.btn_inventory');
      await itemButton.click();
      // Take a screenshot and attach it to the Playwright Report
      if (options?.screenshot && testInfo) {
        const screenshot = await this.page.screenshot();
        await testInfo.attach(`Item-${i + 1}-Added`, {
          body: screenshot,
          contentType: 'image/png',
        });
      }
      console.log(`Clicked "Add to Cart" for item at index ${i+1}`);
    }
  }

  
  async addRandomItemsToCart(options?: InventoryOptions, testInfo?: any): Promise<void> {

    // 1. Wait for the first item to ensure the list has loaded
    await this.inventoryItems.first().waitFor({ state: 'visible' });

    // 2. Get the total count of items
    const itemCount: number = await this.inventoryItems.count();
    console.log(`Number of items found: ${itemCount}`);

    // 3. Loop through each item by index and click its specific button
    let randomItem = Math.floor(Math.random() * itemCount);
      // Scope the locator to the specific item at index 'i'
      const itemButton = this.inventoryItems.nth(randomItem).locator('.btn_inventory');
      await itemButton.click();
      // Take a screenshot and attach it to the Playwright Report
      if (options?.screenshot && testInfo) {
        const screenshot = await this.page.screenshot();
        await testInfo.attach(`Item-${randomItem + 1}-Added`, {
          body: screenshot,
          contentType: 'image/png',
        });
      }
      console.log(`Clicked "Add to Cart" for item at index ${randomItem+1}`);
  }

}
