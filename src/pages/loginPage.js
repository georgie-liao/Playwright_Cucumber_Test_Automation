const { expect } = require('@playwright/test');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            userInput: 'Username',
            passwordInput: 'Password',
            loginBtn: 'button[color="primary"]',
            errorMessage: 'alert'
        };
    }

    async navigateToLoginPage() {
        await this.base.goto('/login');
        await expect(this.page).toHaveTitle('BookCart');
    }

    async enterUserName(user) {
        const userInput = await this.page.locator(`[label="${this.Elements.userInput}"]`);
        await userInput.fill(user);
    }

    async enterPassword(password) {
        const passwordInput = await this.page.locator(`[label="${this.Elements.passwordInput}"]`);
        await passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(`[color='primary']`);
    }

    async getErrorMessage() {
        const errorMessage = await this.page.locator(`[role="${this.Elements.errorMessage}"]`);
        return errorMessage.textContent();
    }

    async loginUser(user, password) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

module.exports = LoginPage;
