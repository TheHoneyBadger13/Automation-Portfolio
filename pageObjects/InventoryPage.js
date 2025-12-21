class InventoryPage {
  constructor(page) {
    this.page = page; 
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async addAllItemsToCart(testInfo) {
    const inventoryItems = this.page.locator('.inventory_list .inventory_item');

    // 1. Wait for the first item to ensure the list has loaded
    await inventoryItems.first().waitFor({ state: 'visible' });

    // 2. Get the total count of items
    const itemCount = await inventoryItems.count();
    console.log(`Number of items found: ${itemCount}`);

    // 3. Loop through each item by index and click its specific button
    for (let i = 0; i < itemCount; i++) {
      // Scope the locator to the specific item at index 'i'
      const itemButton = inventoryItems.nth(i).locator('.btn_inventory');
      await itemButton.click();
      // Take a screenshot and attach it to the Playwright Report
      const screenshot = await this.page.screenshot();
      await testInfo.attach(`Item ${i} Added`, {
        body: screenshot,
        contentType: 'image/png',
      });
      console.log(`Clicked "Add to Cart" for item at index ${i+1}`);
    }
  }

}

module.exports = InventoryPage;