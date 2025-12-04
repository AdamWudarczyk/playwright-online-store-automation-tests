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
});