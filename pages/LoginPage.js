import { expect } from '@playwright/test';

/** @typedef {import('@playwright/test').Page} Page */

export class LoginPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/';
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertOnLoginPage() {
        await expect(this.loginButton).toBeVisible();
    }
}
