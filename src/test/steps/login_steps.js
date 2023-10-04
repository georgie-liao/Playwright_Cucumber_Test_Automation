const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { fixture } = require('../../hooks/pageFixture');
const Assert = require('../../helper/wrapper/assert');
const LogInPage = require('../../pages/login_page');

setDefaultTimeout(60 * 1000 * 2);

let loginPage;
let assert;

Given('User enter the username as {string}', async function (username) {
    loginPage = new LogInPage(fixture.page);
    assert = new Assert(fixture.page);
    await loginPage.enterUserName(username);
});

Given('User enter the password as {string}', async function (password) {
    await loginPage.enterPassword(password)
});

When('User click on the login button', async function () {
    await loginPage.clickLoginButton();
    await fixture.page.waitForLoadState();
    fixture.logger.info('Waiting for 2 seconds');
    await fixture.page.waitForTimeout(2000);
});

Then('Login should be success', async function () {
    await loginPage.verifyLoginSuccesseful ();
});

When('Login should fail', async function () {
    const failureMesssage = fixture.page.locator("mat-error[role='alert']");
    await expect(failureMesssage).toBeVisible();
});
