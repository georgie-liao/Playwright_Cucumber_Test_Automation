const { expect } = require('@playwright/test');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');
const data = require('../helper/util/test-data/test_data.json');

class RegisterPage {
    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            _fName: "input[formcontrolname='firstname']",
            _lname: "input[formcontrolname='lastname']",
            _userName: "input[formcontrolname='username']",
            _password: "input[formcontrolname='password']",
            _confirmPassword: "input[formcontrolname='confirmPassword']",
            _maleInput: "input[value='Male']",
            _femaleInput: "input[value='Female']",
            _maleRadioBtn: "//span[contains(text(),'Male')]",
            _femaleRadioBtn: "//span[contains(text(),'Female')]",
            _registerBtn: "button[color='primary']",
            _errorUserNameMessage:"#mat-error-14"
        };
    }

    async goToRegisterPage() {
        await this.base.goto(data.registerPageURL);
    }

    async registerUser(firstname, lastname, userName, password, confirmPassword, gender) {
        await this.page.fill(this.Elements._fName, firstname);
        await this.page.fill(this.Elements._lname, lastname);
        await this.enterUsername(userName); //username has to be unique
        await this.page.fill(this.Elements._password, password);
        await this.page.fill(this.Elements._confirmPassword, confirmPassword);

        if (gender === "m") {
            await this.page.click(this.Elements._maleRadioBtn);
            await expect(this.page.locator(this.Elements._maleInput)).toBeChecked();
        } else {
            await this.page.click(this.Elements._femaleRadioBtn);
            await expect(this.page.locator(this.Elements._femaleInput)).toBeChecked();
        }

        await this.page.locator(this.Elements._registerBtn).click();
    }

    async enterUsername(userName) {
        await this.page.fill(this.Elements._userName, userName);
        const [response] = await Promise.all([
            this.page.waitForResponse(res => {
                return res.status() === 200 &&
                    res.url() === `https://bookcart.azurewebsites.net/api/user/validateUserName/${userName}`;
            })
        ]);
        await response.finished();
    }

    async getErrorMessage() {
        await expect(this.page.locator(this.Elements._errorUserNameMessage)).toHaveText("User Name is not available");
    }
}

module.exports = RegisterPage;
