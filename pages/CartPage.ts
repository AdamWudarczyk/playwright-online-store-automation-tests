import { expect, type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly removeButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator(
            '//div[contains(concat(" ", normalize-space(@class), " "), " cart_item ")]'
        );
        this.checkoutButton = page.locator('//button[@data-test="checkout"]');
        this.removeButtons = page.locator('//*[starts-with(@data-test,"remove-")]');
    }

    async countItems() {
        return await this.cartItems.count();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async assertCartVisible() {
        await expect(this.cartItems.first()).toBeVisible();
    }

    async removeItemByIndex(index: number) {
        await this.removeButtons.nth(index).click();
    }
}