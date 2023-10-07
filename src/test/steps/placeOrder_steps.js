const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { fixture } = require('../../hooks/pageFixture');
const LogInPage = require('../../pages/login_page');
const BooksPage = require('../../pages/books_page');
const CartPage = require('../../pages/cart_page')

setDefaultTimeout(60 * 1000 * 2);

let loginPage;
let booksPage;
let cartPage;

Given('User signs in to the portal', async function () {
    loginPage = new LogInPage(fixture.page);
    await loginPage.userLogin();
});

Given('user search for book name {string}', async function (book) {
    fixture.logger.info('Searching for a book: ' + book); 
    booksPage = new BooksPage(fixture.page);
    await booksPage.searchForBook(book);
    
});

When('user add the book to the cart', async function () {
    await booksPage.addBookToCart();
});

Then('user clear the cart', async function () {
    cartPage = new CartPage(fixture.page)
    await  cartPage.clearCart();
});

Then('the cart should be empty', async function () {
    await  cartPage.verifyCartEmpty();
});

