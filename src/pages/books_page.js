const { expect, page } = require('@playwright/test');
const HeaderPage = require('./header_age');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');

class BooksPage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderPage(page);
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            _categories: 'app-book-filter a',
            _title: 'div.card-title',
            _price: 'div.card-title + p',
            _addToCartBtn: "//button[@color='primary']",
            _bookCard: 'mat-card',
            _snackBar: "//simple-snack-bar/span[1]",
            _searchInput:"input[type='search']",
            _searchResultDropdown: 'div#mat-autocomplete-0>mat-option>span',
            _bookTile:"div[class='card-title'] a strong",
            _badge: "#mat-badge-content-0"
        };
    }

    async verifyAllCategories(categories) {
        //verify the book categories 
        const bookCategories = await this.page.locator(this.Elements._categories).innerTexts();
        expect(bookCategories).toEqual(categories);
    }

    async searchForBook(book) {
        //enter book name in the search input
        await this.page.locator(this.Elements._searchInput).fill(book);

        //wait for search result
        await this.page.waitForTimeout(2000);

        //assert book name is displaying in the search result
        await expect(this.page.locator(this.Elements._searchResultDropdown)).toHaveText(book);

        //click on the search result
        await this.page.locator(this.Elements._searchResultDropdown).click();

        //assert the book title
        await expect(this.page.locator(this.Elements._bookTile)).toHaveText(book);    
    }


    async addBookToCart() {
        //add the book to cart
        await this.page.click(this.Elements._addToCartBtn);
    }

    async verifyMessage(message) {
        //assert the booked to cart confirmation toast message
        const toast = this.page.locator(this.Elements._snackBar);
        await expect(toast).toBeVisible();
        await expect(toast).toHaveText(message);
    }

    async verifyCartBadge(number) {
        //Verify the number shown on the cart badge i
        const badgeCount = await this.page.locator(this.Elements._badge).textContent();
        await expect(badgeCount).toEqual(number);
    }
}

module.exports = BooksPage;
