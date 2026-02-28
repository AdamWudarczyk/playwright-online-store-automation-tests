import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/';
        this.usernameInput = page.locator('//input[@placeholder="Username"]');
        this.passwordInput = page.locator('//input[@placeholder="Password"]');
        this.loginButton = page.locator('//input[@type="submit" and @value="Login"]');
        this.errorMessage = page.locator('//*[@data-test="error"]');
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent())?.trim() ?? '';
    }

}
