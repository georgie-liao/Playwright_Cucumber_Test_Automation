const { expect, Page } = require('@playwright/test');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');

class HeaderPage {
    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.headerPageElements = {
            searchInput: "Search books or authors",
            cartBtn: "button.mat-focus-indicator.mat-icon-button",
            cartValue: "#mat-badge-content-0",
            loginLink: "//span[text()='Login']/..",
            userMenu: "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
            myOrder: "//button[text()='My Orders' and @role='menuitem']",
            logoutLink: "//button[text()='Logout' and @role='menuitem']"
        };
    }

    async enterBookName(bookname) {
        const searchInput = await this.page.locator(`[placeholder="${this.headerPageElements.searchInput}"]`);
        await searchInput.type(bookname);
        await this.base.waitAndClick("mat-option[role='option']");
    }

    async clickOnCart() {
        await this.page.click(this.headerPageElements.cartBtn);
    }

    async getCartValue() {
        await this.page.waitForTimeout(1000);
        const cartValue = await this.page.textContent(this.headerPageElements.cartValue);
        return cartValue;
    }

    async clickLoginLink() {
        await this.base.navigateTo(this.headerPageElements.loginLink);
    }

    async clickOnUserMenu() {
        await this.base.waitAndClick(this.headerPageElements.userMenu);
    }

    async clickOnMyOrder() {
        await this.clickOnUserMenu();
        await this.base.waitAndClick(this.headerPageElements.myOrder);
    }

    async logoutUser() {
        await this.clickOnUserMenu();
        await this.base.navigateTo(this.headerPageElements.logoutLink);
    }

    async verifyLoginSuccess() {
        await expect(this.page.locator(this.headerPageElements.userMenu)).toBeVisible();
    }
}

module.exports = HeaderPage;
