import { Locator, Page, expect } from '@playwright/test';

// Interface 1: For reusable reporting settings
interface CheckoutOptions {
  screenshot?: boolean;
}

// Interface 2: For the form data itself
export interface CheckoutData {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  options?: CheckoutOptions;
  testInfo?: any;
}


export class CheckoutPage {
    private readonly page: Page;
    private readonly firstNameTextField: Locator;
    private readonly lastNameTextField: Locator;
    private readonly postalCodeTextField: Locator;
    private readonly finishButton: Locator;
    private readonly backHomeButton: Locator;
    private readonly continueButton: Locator;
    private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameTextField = page.locator('[data-test="firstName"]');
    this.lastNameTextField = page.locator('[data-test="lastName"]');
    this.postalCodeTextField = page.locator('[data-test="postalCode"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

  }

  

    async fillCheckoutForm(data: CheckoutData): Promise<void> {
        const { firstName, lastName, postalCode, options, testInfo } = data;
        // Generate the unique part
        const uniqueId = Date.now().toString().slice(-5);
        if (firstName) {
            await this.firstNameTextField.fill(`${firstName}_${uniqueId}`);
        }

        if (lastName) {
            await this.lastNameTextField.fill(`${lastName}_${uniqueId}`);
        }

        if (postalCode) {
            await this.postalCodeTextField.fill(postalCode);
        }
        await this.continueButton.click();
        if (options?.screenshot && testInfo) {
            const screenshot = await this.page.screenshot();
            await testInfo.attach('Cart-Page-View', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    }

    async clickContinueButton(options?: CheckoutOptions, testInfo?: any): Promise<void> {
        await this.continueButton.click();
        if (options?.screenshot && testInfo) {
            const screenshot = await this.page.screenshot();
            await testInfo.attach('Cart-Page-View', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    } 

    async clickFinishButton(options?: CheckoutOptions, testInfo?: any): Promise<void> {
        await this.finishButton.click();
        if (options?.screenshot && testInfo) {
            const screenshot = await this.page.screenshot();
            await testInfo.attach('Cart-Page-View', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    } 

    async clickBackHomeButton(options?: CheckoutOptions, testInfo?: any): Promise<void> {
        await this.backHomeButton.click();
        if (options?.screenshot && testInfo) {
            const screenshot = await this.page.screenshot();
            await testInfo.attach('Cart-Page-View', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    }

    async verifyFirstNameError(options?: CheckoutOptions, testInfo?: any): Promise<void> {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText('Error: First Name is required');
        if (options?.screenshot && testInfo) {
            const screenshot = await this.page.screenshot();
            await testInfo.attach('Cart-Page-View', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    }

    async verifyLastNameError(options?: CheckoutOptions, testInfo?: any): Promise<void> {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText('Error: Last Name is required');
        if (options?.screenshot && testInfo) {
            const screenshot = await this.page.screenshot();
            await testInfo.attach('Cart-Page-View', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    }

    async verifyPostalCodeError(options?: CheckoutOptions, testInfo?: any): Promise<void> {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText('Error: Postal Code is required');
        if (options?.screenshot && testInfo) {
            const screenshot = await this.page.screenshot();
            await testInfo.attach('Cart-Page-View', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    }

}
