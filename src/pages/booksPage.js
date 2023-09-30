const { expect } = require('@playwright/test');
const HeaderPage = require('./headerPage');

class BooksPage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderPage(page);
        this.Elements = {
            categories: 'app-book-filter a',
            title: 'div.card-title',
            price: 'div.card-title + p',
            addToCartBtn: "//button[@color='primary']",
            bookCard: 'mat-card',
            snackBar: "//simple-snack-bar/span[1]"
        };
    }

    async verifyAllCategories(categories) {
        const bookCategories = await this.page.locator(this.Elements.categories).innerTexts();
        expect(bookCategories).toEqual(categories);
    }

    async addBookToCart(book) {
        await this.header.enterBookName(book);
        const bookTitle = await this.page.locator(this.Elements.title).textContent();
        expect(bookTitle.toLowerCase()).toContain(book.toLowerCase());
        await this.page.click(this.Elements.addToCartBtn);
        const toast = this.page.locator(this.Elements.snackBar);
        await expect(toast).toBeVisible();
        await expect(toast).toHaveText('One Item added to cart');
    }
}

module.exports = BooksPage;
