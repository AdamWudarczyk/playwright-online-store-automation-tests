import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../fixtures/users.json';
import {InventoryPage} from "../../pages/InventoryPage";

type UsersFixture = {
    validUser: { username: string; password: string };
    lockedUser: { username: string; password: string };
};

const typedUsers = users as UsersFixture;

test.describe('Smoke - Login', () => {

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto();
    });

    test('SMK-01: successful login redirects to inventory page @smoke', async ({ page }) => {
        await loginPage.login(typedUsers.validUser.username, typedUsers.validUser.password);
        await expect(page).toHaveURL(/.*inventory\.html/);

        const inventoryList = page.locator('.inventory_list');
        await expect(inventoryList).toBeVisible();
    });

    test('SMK-02: locked_out_user cannot login @smoke', async () => {
        await loginPage.login(typedUsers.lockedUser.username, typedUsers.lockedUser.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Sorry, this user has been locked out');
        });

    test('SMK-03: invalid credentials show proper error @smoke', async () => {
        await loginPage.login(typedUsers.validUser.username,'wrong_password');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match any user');
    });

    test('SMK-04: empty credentials show required field error @smoke', async () => {
        await loginPage.login('', '');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username is required');
    });
});

