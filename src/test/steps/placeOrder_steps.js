const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { fixture } = require('../../hooks/pageFixture');
const LogInPage = require('../../pages/login_page');
const BooksPage = require('../../pages/books_page');
const CartPage = require('../../pages/cart_page');
const OrderHistoryPage = require('../../pages/orderHistory_page');
const data = require('../../helper/util/test-data/test_data.json');

setDefaultTimeout(60 * 1000 * 2);

let loginPage;
let booksPage;
let cartPage;
let orderHistoryPage;

Given('User signs in to the portal', async function () {
    loginPage = new LogInPage(fixture.page);
    await loginPage.userLogin();
});

Given('user search for book {string}', async function (book) {
    fixture.logger.info('Searching for a book: ' + book); 
    booksPage = new BooksPage(fixture.page);
    await booksPage.searchForBook(book);
    
});

When('user add the book to the cart', async function () {
    await booksPage.addBookToCart();
});

Then('there should be a pop up message {string}', async function (message) {
   await booksPage.verifyMessage(message);
});

Then('the cart badge should display a number {string}', async function (number) {
    await booksPage.verifyCartBadge(number);
 });

 When('user open the cart', async function () {
    cartPage = new CartPage(fixture.page);
    await  cartPage.openCart();
});

When('the cart should display the correct book information', async function () {
    await cartPage.verifyCartItems(
        data.book_theMartian.title,
        data.book_theMartian.price,
        data.book_theMartian.quantity,
        data.book_theMartian.totalPrice,
        data.book_theMartian.cartTotal
    );
});

When('user click on Checkout', async function () {
    await cartPage.checkout();
});

When('user enter shipping address', async function () {
    await cartPage.enterAddress(
        data.shippingAddress.name,
        data.shippingAddress.address1,
        data.shippingAddress.address2,
        data.shippingAddress.postCode,
        data.shippingAddress.state
    );
});
 
When('the Order Summary should display correct information', async function () {
    await cartPage.verifyOrderSummary(
        data.book_theMartian.title,
        data.book_theMartian.price,
        data.book_theMartian.quantity,
        data.book_theMartian.totalPrice,
        data.book_theMartian.cartTotal
    );
});


When('user click on Place Order', async function () {
    await cartPage.placeOrder();
});

When('order should be placed successfuly', async function () {
    await cartPage.getConfirmationMessage();
});

When('order history details are shown correctly ', async function () {
    orderHistoryPage = new OrderHistoryPage(fixture.page);
    await orderHistoryPage.verifyOrderSummary(
        data.book_theMartian.title,
        data.book_theMartian.quantity,
        data.book_theMartian.cartTotal
    );
});

Then('user clear the cart', async function () {
    cartPage = new CartPage(fixture.page)
    await  cartPage.clearCart();
});

Then('the cart should be empty', async function () {
    await  cartPage.verifyCartEmpty();
});

