import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.removeButtons = page.locator('[data-test^="remove-"]');
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

    async removeItemByIndex(index) {
        await this.removeButtons.nth(index).click();
    }
}