import {expect, test} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {InventoryPage} from "../../pages/InventoryPage";
import users from '../../fixtures/users.json' with { type: 'json' };

let loginPage;
let inventoryPage;

test.describe('Smoke - Inventory', () => {
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto();
    });

    test('SMK-06: product details open correctly @smoke', async ({page}) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await expect(page).toHaveURL(/.*inventory\.html/);

        const firstProduct = page.locator('.inventory_item_name').first();
        const productTitle = await firstProduct.textContent();
        await firstProduct.click();
        const detailsTitle = page.locator('.inventory_details_name');
        await expect(detailsTitle).toHaveText(productTitle ?? '');
    });
});