import {expect, test} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {InventoryPage} from "../../pages/InventoryPage";
import users from '../../fixtures/users.json' with { type: 'json' };

test.describe('Smoke - Product Details', () => {

    let loginPage;
    let inventoryPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto();
    });

    test('SMK-08: product details open correctly @smoke', async ({page}) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await expect(page).toHaveURL(/.*inventory\.html/);

        const firstProduct = page.locator('.inventory_item_name').first();
        const productTitle = await firstProduct.textContent();
        await firstProduct.click();
        const detailsTitle = page.locator('.inventory_details_name');
        await expect(detailsTitle).toHaveText(productTitle ?? '');
    });

    test('SMK-09: product image is displayed on details page @smoke', async ({ page }) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.assertOnInventoryPage();

        await page.locator('.inventory_item_name').first().click();

        const image = page.locator('.inventory_details_img');
        await expect(image).toBeVisible();
    });

    test('SMK-10: Back button returns to inventory page @smoke', async ({ page }) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.assertOnInventoryPage();

        await page.locator('.inventory_item_name').first().click();
        await page.locator('#back-to-products').click();

        await expect(page).toHaveURL(/.*inventory\.html/);
    });
});