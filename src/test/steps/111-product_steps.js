const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const { pageFixture } = require('../../hooks/pageFixture')

setDefaultTimeout(50 * 1000);

Then('Jobs page should be open', async function () {
    const PagePanelTitle = "Jobs";
    await pageFixture.page.locator("div[class='md-menu-bar__left'] ng-container[id='menu-item-jobs'] a[class='md-menu__title ng-binding ng-scope']").click();
    await expect(pageFixture.page.locator(".panel-block__title")).toHaveText(PagePanelTitle);
    pageFixture.logger.info("Page Panel Title: " + PagePanelTitle);
  });