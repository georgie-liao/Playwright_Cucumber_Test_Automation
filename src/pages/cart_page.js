const { expect, page } = require('@playwright/test');
const HeaderPage = require('./header_age');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');

class CartPage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderPage(page);
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            _badge: "#mat-badge-content-0",
            _cartIcon: "button[class='mat-focus-indicator mat-icon-button mat-button-base'] mat-icon[role='img']",
            _clearCartBtn: "button[class='mat-focus-indicator mat-elevation-z4 mat-raised-button mat-button-base'] span[class='mat-button-wrapper']",
            _cartContent:".mat-card-title",
            _snackBar: "//simple-snack-bar/span[1]",
        };
    }

    async clearCart() {
        //click on the cart icon to open cart page
        await this.page.locator(this.Elements._cartIcon).click();

        //clear the cart if there are any items, else, continue
        const badgeCount = await this.page.locator(this.Elements._badge).textContent();
        if (badgeCount === 0){
            console.log('No items in the cart');
        }
        else {
            await this.page.locator(this.Elements._clearCartBtn).click();
            //assert the booked to cart confirmation toast message
            const toast = this.page.locator(this.Elements._snackBar);
            await expect(toast).toBeVisible();
            await expect(toast).toHaveText('Cart cleared!!!');
        }
    }

    async verifyCartEmpty(){
        const cartEmptyMessage = this.page.locator(this.Elements._cartContent);
        await expect(cartEmptyMessage).toHaveText(" Shopping cart is empty ");
    }

    
}

module.exports = CartPage;
