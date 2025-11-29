import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.thankYouMessage = page.locator('.complete-header');
        this.errorMessage = page.locator('[data-test="error"]');
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
