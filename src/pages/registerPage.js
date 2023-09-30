const { expect } = require('@playwright/test');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');

class RegisterPage {
    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            fName: "input[formcontrolname='firstname']",
            lname: "input[formcontrolname='lastname']",
            userName: "input[formcontrolname='username']",
            password: "input[formcontrolname='password']",
            confirmPassword: "input[formcontrolname='confirmPassword']",
            maleInput: "input[value='Male']",
            femaleInput: "input[value='Female']",
            maleRadioBtn: "//span[contains(text(),'Male')]",
            femaleRadioBtn: "//span[contains(text(),'Female')]",
            regBtn: "button[color='primary']"
        };
    }

    async navigateToRegisterPage() {
        await this.base.goto("https://bookcart.azurewebsites.net/register");
    }

    async registerUser(firstname, lastname, userName, password, confirmPassword, gender) {
        await this.page.fill(this.Elements.fName, firstname);
        await this.page.fill(this.Elements.lname, lastname);
        await this.enterUsername(userName);
        await this.page.fill(this.Elements.password, password);
        await this.page.fill(this.Elements.confirmPassword, confirmPassword);

        if (gender === "m") {
            await this.page.click(this.Elements.maleRadioBtn);
            await expect(this.page.locator(this.Elements.maleInput)).toBeChecked();
        } else {
            await this.page.click(this.Elements.femaleRadioBtn);
            await expect(this.page.locator(this.Elements.femaleInput)).toBeChecked();
        }

        const regBtn = this.page.locator(this.Elements.regBtn);
        await regBtn.click();
    }

    async enterUsername(userName) {
        await this.page.fill(this.Elements.userName, userName);
        await this.page.waitForResponse(response => {
            return response.status() === 200 &&
                response.url() === `https://bookcart.azurewebsites.net/api/user/validateUserName/${userName}`;
        });
    }
}

module.exports = RegisterPage;
