import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import users from '../../fixtures/users.json' with { type: 'json' };

test.describe('E2E - Checkout', () => {
    test('E2E-01: complete order with 2 items', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventory.assertOnInventoryPage();

        await inventory.addProductByIndex(0);
        await inventory.addProductByIndex(1);

        await inventory.goToCart();
        await cart.assertCartVisible();

        expect(await cart.countItems()).toBe(2);

        await cart.goToCheckout();
        await checkout.fillInformation('Adam', 'Tester', '00-001');

        await checkout.finishOrder();
        await checkout.assertOrderFinished();
    });
    test('E2E-02: cannot continue checkout with empty required fields @e2e', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(users.validUser.username, users.validUser.password);
        await inventory.assertOnInventoryPage();

        await inventory.addProductByIndex(0);

        await inventory.goToCart();
        await cart.assertCartVisible();
        await cart.goToCheckout();
        await checkout.continueWithEmptyData();

        const error = await checkout.getErrorMessage();
        expect(error).toContain('Error: First Name is required');
    });

});
