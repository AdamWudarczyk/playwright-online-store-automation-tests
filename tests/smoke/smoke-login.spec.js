import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import users from '../../fixtures/users.json' with { type: 'json' };

test('SMK-01: successful login redirects to inventory page @smoke', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(page).toHaveURL(/.*inventory\.html/);

    const inventoryList = page.locator('.inventory_list');
    await expect(inventoryList).toBeVisible();
});
