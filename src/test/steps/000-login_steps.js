const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const { pageFixture } = require('../../hooks/pageFixture')

setDefaultTimeout(50 * 1000);

Given('user navigates to the application', async function () {
  await pageFixture.page.goto("https://bbhubstaging.internal.buddybid.com/");
  pageFixture.logger.info("Navigated to the application");
});

Given('user click on the Sign In button', async function () {
  await pageFixture.page.locator("div[class='header hide-sm hide-xs ng-scope'] a:nth-child(2)").click();
});


Given('sign in to BBHub with {string} and {string}', async function (username, password) {
    await pageFixture.page.locator("#username").fill(username)
    await pageFixture.page.locator("#password").fill(password);
    await pageFixture.page.locator("button[type='submit']").click();
    // await pageFixture.page.waitForLoadState('networkidle');
  });

  Then('user should sign in successfully', async function () {
    await expect(pageFixture.page.locator("button[aria-owns='menu_container_0']")).toContainText("George");
  });

  Then('there should be an error message', async function () {
    await expect(pageFixture.page.locator(".ng-binding.ng-scope")).toHaveText("Invalid username or password");
  });