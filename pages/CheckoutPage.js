import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.firstName = page.locator('//input[@data-test="firstName"]');
        this.lastName = page.locator('//input[@data-test="lastName"]');
        this.postalCode = page.locator('//input[@data-test="postalCode"]');
        this.continueBtn = page.locator('//input[@data-test="continue"]');
        this.finishBtn = page.locator('//button[@data-test="finish"]');
        this.thankYouMessage = page.locator('//h2[contains(@class,"complete-header")]');
        this.errorMessage = page.locator('//h3[@data-test="error"]');
    }

    async fillInformation(first, last, postal) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(postal);
        await this.continueBtn.click();
    }

    async finishOrder() {
        await this.finishBtn.click();
    }

    async assertOrderFinished() {
        await expect(this.thankYouMessage).toHaveText('Thank you for your order!');
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async continueWithEmptyData() {
        await this.continueBtn.click();
    }

}
