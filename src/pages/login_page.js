const { expect } = require('@playwright/test');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');
const data = require('../helper/util/test-data/test_data.json');


class LoginPage {
    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            userInput: "input[formcontrolname='username']",
            passwordInput: "input[formcontrolname='password']",
            loginBtn: 'button[color="primary"]',
            userNameDisplay: "xpath=//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]",
            errorMessage: '#mat-error-0'
        };
    }

    // async navigateToLoginPage() {
    //     await this.base.goto(data.loginPageULR);
    //     await expect(this.page).toHaveTitle('BookCart');
    // }

    async enterUserName(user) {
        await this.page.locator(this.Elements.userInput).fill(user);
    }

    async enterPassword(password) {
        await this.page.locator(this.Elements.passwordInput).fill(password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.loginBtn);
    }

    async verifyLoginSuccesseful () {
        await expect(this.page.locator(this.Elements.userNameDisplay)).toContainText('georgel');
    }

    async getErrorMessage() {
        await expect(this.page.locator(this.Elements.errorMessage)).toHaveText('Username or Password is incorrect.');
    }

    async loginUser(user, password) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}

module.exports = LoginPage;
