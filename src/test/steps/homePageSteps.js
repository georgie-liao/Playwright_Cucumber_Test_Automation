const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { fixture } = require('../../hooks/pageFixture');
const Assert = require('../../helper/wrapper/assert');
const HomePage = require('../../pages/homePage');


setDefaultTimeout(60 * 1000 * 2);

let homePage;
let assert;

Given('User navigates to the application', async function () {
    homePage = new HomePage(fixture.page);
    assert = new Assert(fixture.page);
    await homePage.navigateToHomePage();
});

Given('User click on the login link', async function () {
    //homePage = new HomePage(fixture.page);
    await homePage.clickLoginButton();
});
