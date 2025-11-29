import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import users from '../../fixtures/users.json' with { type: 'json' };


test.describe('Smoke - Login', () => {
    test('SMK-01: successful login redirects to inventory page @smoke', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(users.validUser.username, users.validUser.password);
        await expect(page).toHaveURL(/.*inventory\.html/);

        const inventoryList = page.locator('.inventory_list');
        await expect(inventoryList).toBeVisible();
    });
    test('SMK-02: locked_out_user cannot login @smoke', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(users.lockedUser.username, users.lockedUser.password);

        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Sorry, this user has been locked out');
        });
    test('SMK-03: invalid credentials show proper error @smoke', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(users.validUser.username, 'wrong_password');

        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match any user');
    });


    });

