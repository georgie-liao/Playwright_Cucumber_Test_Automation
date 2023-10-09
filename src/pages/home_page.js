const { expect } = require('@playwright/test');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');
const data = require('../helper/util/test-data/test_data.json');

class HomePage {
    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            _loginLink: '//span[text()="Login"]'
        };
    }

    async navigateToHomePage() {
        await this.base.goto(data.homePageULR);
        await expect(this.page).toHaveTitle('BookCart');
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements._loginLink);
    }

}

module.exports = HomePage;
