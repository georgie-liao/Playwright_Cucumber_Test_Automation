const { Given, When, Then } = require('@cucumber/cucumber');
const RegisterPage = require('../../pages/registerPage');
const { fixture } = require('../../hooks/pageFixture');
const Assert = require('../../helper/wrapper/assert');
const data = require('../../helper/util/test-data/registerUser.json');

let registerPage;
let assert;

Given('I navigate to the register page', async function () {
    registerPage = new RegisterPage(fixture.page);
    assert = new Assert(fixture.page);
    await registerPage.navigateToRegisterPage();
});

When('I created a new user', async function () {
    const username = data.userName + Date.now().toString();
    await registerPage.registerUser(data.firstName, data.lastName,
        username, data.password, data.confirmPassword, 'm');
});

Then('I confirm user registration is success', async function () {
    await assert.assertURL('https://bookcart.azurewebsites.net/login');
});
