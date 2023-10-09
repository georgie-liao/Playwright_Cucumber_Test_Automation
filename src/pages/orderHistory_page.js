const { expect, page } = require('@playwright/test');
const HeaderPage = require('./header_age');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');

class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderPage(page);
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            _orderId: "(xpath=//tr[@role='row'])[2]/td[1]",
            _orderedDate: "(xpath=///tr[@role='row'])[2]/td[2]",
            _orderTotal: "(xpath=///tr[@role='row'])[2]/td[3]",
            _orderedBookTitle: "tbody tr td td:nth-child(1)",
            _orderedQuantity: "tbody tr td td:nth-child(2)",
            _amountPaid: "tbody tr td td:nth-child(3)"
        };
    }

    async openCart(){
        //click on the order ID to view order history content
        await this.page.locator(this.Elements._orderId).click();
    }

    async verifyOrderHistory(title, quantity, total){
        //verify order ID is visible in the order history
       await expect(this.page.locator(this.Elements._orderId)).toBeVisible();

       //verify order date is visible in the order history
       await expect(this.page.locator(this.Elements._orderedDate)).toBeVisible();
     
       //verify book title in the order history
       const orderedBookTitle = await this.page.locator(this.Elements._orderedBookTitle).textContent();
       await expect(orderedBookTitle).toEqual(title);

       //verify quantity of book in the order history
       const orderedQuantity = await this.page.locator(this.Elements._summaryMRP).textContent();
       await expect(orderedQuantity).toEqual(quantity);

       //verify paid total amount in the order history
       const paidTotal = await this.page.locator(this.Elements._orderTotal).textContent();
       await expect(paidTotal).toEqual(total);
    }

}

module.exports = OrderHistoryPage;
