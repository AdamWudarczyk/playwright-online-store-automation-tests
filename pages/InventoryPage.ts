import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryList: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('//div[contains(@class,"inventory_list")]');
        this.cartLink = page.locator('//a[contains(@class,"shopping_cart_link")]');
    }

    async addProductByIndex(index: number): Promise<void> {
        const addButtons = this.page.locator('.inventory_item button');
        await addButtons.nth(index).click();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    async assertOnInventoryPage(): Promise<void> {
        await expect(this.inventoryList).toBeVisible();
    }
}
