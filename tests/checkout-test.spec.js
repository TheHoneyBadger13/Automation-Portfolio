// @ts-check
import { test, expect } from '@playwright/test';
const LoginPage = require('../pageObjects/LoginPage');
const InventoryPage = require('../pageObjects/InventoryPage');

test('Testing if add to cart works on all items', async ({ page }, testInfo) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addAllItemsToCart(testInfo);
});
