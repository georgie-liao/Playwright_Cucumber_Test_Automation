const { page } = require('@playwright/test');



class PlaywrightWrapper {
    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded'
        });
    }

    async waitToBeVisible(locator) {
        const element = await this.page.locator(locator);
        await element.waitFor({
            state: 'visible'
        });
    }

    async waitAndClick(locator) {
        const element = await this.page.locator(locator);
        await element.waitFor({
            state: 'visible'
        });
        await element.click();
    }

    async navigateTo(link) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ]);
    }
}

module.exports = PlaywrightWrapper;
