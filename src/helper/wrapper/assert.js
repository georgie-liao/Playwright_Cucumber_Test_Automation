const { expect, Page } = require('@playwright/test');

class Assert {
    constructor(page) {
        this.page = page;
    }

    async assertTitle(title) {
        await expect(this.page).toHaveTitle(title);
    }

    async assertTitleContains(title) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toContain(title);
    }

    async assertURL(url) {
        await expect(this.page).toHaveURL(url);
    }

    async assertURLContains(substring) {
        const pageURL = await this.page.url();
        expect(pageURL).toContain(substring);
    }
}

module.exports = Assert;
