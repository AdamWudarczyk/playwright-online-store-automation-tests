import {expect, test} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {InventoryPage} from "../../pages/InventoryPage";
import users from '../../fixtures/users.json' with { type: 'json' };

test.describe('Smoke - Inventory', () => {

    let loginPage;
    let inventoryPage;

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

    test('SMK-07: sorting Z→A works @smoke', async ({ page }) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.assertOnInventoryPage();

        await page.selectOption('.product_sort_container', 'za');

        const names = await page.locator('.inventory_item_name').allTextContents();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    });

    test('SMK-08: adding item shows cart badge @smoke', async ({ page }) => {
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventoryPage.assertOnInventoryPage();

        await page.locator('button.btn_inventory').first().click();
        const badge = page.locator('.shopping_cart_badge');

        await expect(badge).toHaveText('1');
    });
});