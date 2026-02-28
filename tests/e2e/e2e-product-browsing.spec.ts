import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../fixtures/users.json';

type UsersFixture = {
    validUser: {
        username: string;
        password: string;
    };
};

const typedUsers = users as UsersFixture;

test.describe('E2E - Product Browsing', () => {

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(typedUsers.validUser.username, typedUsers.validUser.password);
        await inventoryPage.assertOnInventoryPage();
    });

    test('E2E-05: user can open product details and return to inventory @e2e', async ({ page }) => {
        const firstProduct = page.locator('.inventory_item_name').first();
        const productName = await firstProduct.textContent();

        await firstProduct.click();
        await expect(page.locator('.inventory_details_name')).toHaveText(productName ?? '');

        await page.locator('#back-to-products').click();
        await inventoryPage.assertOnInventoryPage();
    });

});
