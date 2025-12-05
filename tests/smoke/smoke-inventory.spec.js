import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import users from '../../fixtures/users.json' with { type: 'json' };
import {InventoryPage} from "../../pages/InventoryPage";

test.describe('Smoke - Inventory', () => {

    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto();
    });

    test('SMK-05: inventory page loads essential elements @smoke', async ({ page }) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.assertOnInventoryPage();
        const items = page.locator('.inventory_item');
        await expect(items).toHaveCount(6);
    });

    test('SMK-06: sorting Z→A works @smoke', async ({ page }) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.assertOnInventoryPage();

        await page.selectOption('.product_sort_container', 'za');

        const names = await page.locator('.inventory_item_name').allTextContents();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    });

    test('SMK-7: adding item shows cart badge @smoke', async ({ page }) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.assertOnInventoryPage();

        await page.locator('button.btn_inventory').first().click();
        const badge = page.locator('.shopping_cart_badge');

        await expect(badge).toHaveText('1');
    });
});