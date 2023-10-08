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
            _cartLink: "button[class='mat-focus-indicator mat-icon-button mat-button-base'] mat-icon[role='img']",
            _clearCartBtn: "button[class='mat-focus-indicator mat-elevation-z4 mat-raised-button mat-button-base'] span[class='mat-button-wrapper']",
            _cartContent:".mat-card-title",
            _image: "tbody td:nth-child(1)",
            _title: "tbody td:nth-child(2)",
            _mrp: "tbody td:nth-child(3)",
            _quantity: ".div-quantity",
            _total: "tbody td:nth-child(5)",
            _cartTotal: "tr mat-card-content th:nth-child(5)",
            _checkoutBtn: "tr mat-card-content th:nth-child(6)",
            _nameInput: "#mat-input-0",
            _addresInput1: "#mat-input-1",
            _addresInput2: "#mat-input-2",
            _postCodeInput: "#mat-input-3",
            _stateInput: "#mat-input-4",
            _sumamaryTitle: "table[class='table'] td:nth-child(1)",
            _summaryQuantity: "table[class='table'] td:nth-child(2)",
            _summaryMRP: "table[class='table'] td:nth-child(3)",
            _summaryTotal: "table[class='table'] td:nth-child(4)",
            _grandTotal: "tfoot[class='table'] th:nth-child(1)",
            _placeOrderBtn: "button[type='submit'] span[class='mat-button-wrapper']"
        };
    }

    async openCart(){
        //click on the cart icon to open cart page
        await this.page.locator(this.Elements._cartLink).click();
    }

    async verifyCartItems(title, price, quantity, total, cartTotal) {
        //verify book information in the cart
        const bookTitle = await this.page.locator(this.Elements._title).textContent();
        const bookPrice = await this.page.locator(this.Elements._mrp).textContent();
        const bookQuantity = await this.page.locator(this.Elements._quantity).textContent();
        const totalBookPrice = await this.page.locator(this.Elements._total).textContent();
        const cartTotalPrice = await this.page.locator(this.Elements._cartTotal).textContent();
 
        await expect(bookTitle).toEqual(title);
        await expect(bookPrice).toEqual(price);
        await expect(bookQuantity).toEqual(quantity)
        await expect(totalBookPrice).toEqual(total);
        await expect(cartTotalPrice).toEqual(cartTotal)
     }

     async checkout(){
        //click on the CheckOut button
        await this.page.locator(this.Elements._checkoutBtn).click();
    }

    async enterAddress(name, address1, addres2, postCode, state){
        await this.page.locator(this.Elements._nameInput).fill(name);
        await this.page.locator(this.Elements._addresInput1).fill(address1);
        await this.page.locator(this.Elements._addresInput2).fill(addres2);
        await this.page.locator(this.Elements._postCodeInput).fill(postCode);
        await this.page.locator(this.Elements._stateInput).fill(state);
    }

    async verifyOrderSummary(title, price, quantity, total, grandTotal) {
        //verify book information in the cart
        const bookTitle = await this.page.locator(this.Elements._sumamaryTitle).textContent();
        const bookPrice = await this.page.locator(this.Elements._summaryQuantity).textContent();
        const bookQuantity = await this.page.locator(this.Elements._summaryMRP).textContent();
        const totalBookPrice = await this.page.locator(this.Elements._summaryTotal).textContent();
        const cartTotalPrice = await this.page.locator(this.Elements._grandTotal).textContent();
 
        await expect(bookTitle).toEqual(title);
        await expect(bookPrice).toEqual(price);
        await expect(bookQuantity).toEqual(quantity)
        await expect(totalBookPrice).toEqual(total);
        await expect(cartTotalPrice).toEqual(grandTotal)
     }

     async placeOrder(){
        //click on the CheckOut button
        await this.page.locator(this.Elements._placeOrderBtn).click();
    }

    async clearCart() {
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
