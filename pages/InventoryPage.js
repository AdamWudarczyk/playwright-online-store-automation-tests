import { expect } from '@playwright/test';

/** @typedef {import('@playwright/test').Page} Page */

export class InventoryPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.inventoryList = page.locator('//div[contains(@class,"inventory_list")]');
        this.cartLink = page.locator('//a[contains(@class,"shopping_cart_link")]');
    }

    async addProductByIndex(index) {
        const addButtons = this.page.locator('.inventory_item button');
        await addButtons.nth(index).click();
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async assertOnInventoryPage() {
        await expect(this.inventoryList).toBeVisible();
    }
}
