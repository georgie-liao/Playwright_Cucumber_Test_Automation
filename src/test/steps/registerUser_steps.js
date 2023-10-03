const { Given, When, Then } = require('@cucumber/cucumber');
const  RegisterPage  = require('../../pages/registerUser_page'); // Assuming RegisterPage is exported from registerPage module
const { fixture } = require('../../hooks/pageFixture');
const  Assert  = require('../../helper/wrapper/assert'); // Assuming Assert is exported from assert module
const data = require('../../helper/util/test-data/test_data.json');

let registerPage;
let assert;

Given('I navigate to the register page', async function () {
    registerPage = new RegisterPage(fixture.page);
    assert = new Assert(fixture.page);
    await registerPage.goToRegisterPage();
});

When('I create a new user account', async function () {
    const uniqueUsername = data.registerUser.username + Date.now().toString();
    await registerPage.registerUser(
        data.registerUser.firstName,
        data.registerUser.lastName,
        uniqueUsername,
        data.registerUser.password,
        data.registerUser.confirmPassword,
        'm'
    );
});

Then('I confirm user registration is successful', async function () {
    await assert.assertURL('https://bookcart.azurewebsites.net/login');
});

When('I enter {string} username', async function (userName) {
    await registerPage.enterExistingName(userName);
});

Then('there should be an error username message', async function () {
    await registerPage.getErrorMessage();
});