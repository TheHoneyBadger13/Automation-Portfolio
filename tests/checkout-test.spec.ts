// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage'; 
import {InventoryPage} from '../pageObjects/InventoryPage';
import {CartPage} from '../pageObjects/CartPage';
import {CheckoutPage} from '../pageObjects/CheckoutPage';

test('Testing if add to cart works on all items', async ({ page }, testInfo):Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addAllItemsToCart({ screenshot: true }, testInfo);
});

test('Checkout random product', async ({ page }, testInfo):Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cartPage = new CartPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addRandomItemsToCart({ screenshot: true }, testInfo);
  await inventoryPage.clickCartButton({ screenshot: true }, testInfo);
  await cartPage.clickCheckoutButton();
  await checkoutPage.fillCheckoutForm({
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    options: { screenshot: true },
  });
  await checkoutPage.clickFinishButton();
  await checkoutPage.clickBackHomeButton();
});

test('Checking out all products', async ({ page }, testInfo):Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cartPage = new CartPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addAllItemsToCart({ screenshot: true }, testInfo);
  await inventoryPage.clickCartButton({ screenshot: true }, testInfo);
  await cartPage.clickCheckoutButton({ screenshot: true }, testInfo);
  await checkoutPage.fillCheckoutForm({
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
    options: { screenshot: true },
  });
  await checkoutPage.clickFinishButton({ screenshot: true }, testInfo);
  await checkoutPage.clickBackHomeButton({ screenshot: true }, testInfo);
});

test('All fields are blank in checkout information @negative', async ({ page }, testInfo):Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cartPage = new CartPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addAllItemsToCart({ screenshot: true }, testInfo);
  await inventoryPage.clickCartButton({ screenshot: true }, testInfo);
  await cartPage.clickCheckoutButton({ screenshot: true }, testInfo);
  await checkoutPage.clickContinueButton({ screenshot: true }, testInfo);
  await checkoutPage.verifyFirstNameError({ screenshot: true }, testInfo);
});

test('Last name field is blank in checkout information @negative', async ({ page }, testInfo):Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cartPage = new CartPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addAllItemsToCart({ screenshot: true }, testInfo);
  await inventoryPage.clickCartButton({ screenshot: true }, testInfo);
  await cartPage.clickCheckoutButton({ screenshot: true }, testInfo);
  await checkoutPage.clickContinueButton({ screenshot: true }, testInfo);
  await checkoutPage.fillCheckoutForm({
    firstName: 'John',
    postalCode: '12345',
    options: { screenshot: true },
  });
  await checkoutPage.verifyLastNameError({ screenshot: true }, testInfo);
});

test('PostalCode field is blank in checkout information @negative', async ({ page }, testInfo):Promise<void> => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const cartPage = new CartPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addAllItemsToCart({ screenshot: true }, testInfo);
  await inventoryPage.clickCartButton({ screenshot: true }, testInfo);
  await cartPage.clickCheckoutButton({ screenshot: true }, testInfo);
  await checkoutPage.clickContinueButton({ screenshot: true }, testInfo);
  await checkoutPage.fillCheckoutForm({
    firstName: 'John',
    lastName: 'Doe',
    options: { screenshot: true },
  });
  await checkoutPage.verifyPostalCodeError({ screenshot: true }, testInfo);
});