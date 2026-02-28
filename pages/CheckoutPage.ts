import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly thankYouMessage: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;

        this.firstName = page.locator('//input[@data-test="firstName"]');
        this.lastName = page.locator('//input[@data-test="lastName"]');
        this.postalCode = page.locator('//input[@data-test="postalCode"]');
        this.continueBtn = page.locator('//input[@data-test="continue"]');
        this.finishBtn = page.locator('//button[@data-test="finish"]');
        this.thankYouMessage = page.locator('//h2[contains(@class,"complete-header")]');
        this.errorMessage = page.locator('//h3[@data-test="error"]');
    }

    async fillInformation(first: string, last:string, postal:string): Promise<void> {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(postal);
        await this.continueBtn.click();
    }

    async finishOrder(): Promise<void> {
        await this.finishBtn.click();
    }

    async assertOrderFinished(): Promise<void> {
        await expect(this.thankYouMessage).toHaveText('Thank you for your order!');
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent())?.trim() ?? '';
    }

    async continueWithEmptyData(): Promise<void> {
        await this.continueBtn.click();
    }

}
