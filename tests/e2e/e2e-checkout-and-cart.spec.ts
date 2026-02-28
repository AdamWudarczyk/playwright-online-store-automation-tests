import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import users from '../../fixtures/users.json';

type UserFixture = {
    validUser: {
      username: string;
      password: string;
    };
};

const typedUsers = users as UserFixture;

test.describe('E2E - Checkout', () => {
    let loginPage: LoginPage;
    let inventory: InventoryPage;
    let cart: CartPage;
    let checkout: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        checkout = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(typedUsers.validUser.username, typedUsers.validUser.password);
        await inventory.assertOnInventoryPage();
    });

    test('E2E-01: complete order with 2 items @e2e', async () => {
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

    test('E2E-02: cannot continue checkout with empty required fields @e2e', async () => {
        await inventory.addProductByIndex(0);

        await inventory.goToCart();
        await cart.assertCartVisible();
        await cart.goToCheckout();
        await checkout.continueWithEmptyData();

        const error = await checkout.getErrorMessage();
        expect(error).toContain('Error: First Name is required');
    });

    test('E2E-03: remove one item from cart @e2e', async () => {
        await inventory.addProductByIndex(0);
        await inventory.addProductByIndex(1);
        await inventory.goToCart();
        await cart.assertCartVisible();
        expect(await cart.countItems()).toBe(2);

        await cart.removeItemByIndex(0);
        expect(await cart.countItems()).toBe(1);
    });

    test('E2E-04: cart badge updates when adding multiple items @e2e', async ({ page }) => {
        await inventory.addProductByIndex(0);
        await inventory.addProductByIndex(1);
        await inventory.addProductByIndex(2);
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('3');

        await inventory.goToCart();
        await cart.assertCartVisible();
        expect(await cart.countItems()).toBe(3);
    });
});