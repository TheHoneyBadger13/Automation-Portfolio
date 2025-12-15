// @ts-check
import { test, expect } from '@playwright/test';
const LoginPage = require('../pageObjects/LoginPage');

test('SauceDemo login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'standard_user');
});
