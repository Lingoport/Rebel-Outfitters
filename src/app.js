"use strict";

let Browse = "Browse.js";//$NON-NLS-L$
let Error404 = "Error404.js";//$NON-NLS-L$
let Home = "Home.js";//$NON-NLS-L$
let ProductShow = "ProductShow.js";//$NON-NLS-L$
let Checkout = "Checkout.js";//$NON-NLS-L$
let OrderHistory = "OrderHistory.js";//$NON-NLS-L$

import Navbar from './views/components/Navbar.js';
import Bottombar from './views/components/Bottombar.js';
import Cart from './views/components/Cart.js';
import { Hamburger } from './views/components/Hamburger.js';

import { Order } from './views/classes/Order.js';

import Utils from './services/Utils.js';

import Products from './content/products.js';

//global variables//

var shoppingCart = {};

var orderHistory = [];
//adds some dummy orders to the history on startup
let dummyOrders = () => {
    let now = new Date();
    var twoDays = now - 1000 * 60 * 60 * 24 * 2;
    var fiveDays = now - 1000 * 60 * 60 * 24 * 5;
    let order2 = new Order(900, new Date(fiveDays));
    let order1 = new Order(68500, new Date(twoDays));
    orderHistory.push(order1);
    orderHistory.push(order2);
}

//load
if (localStorage.getItem("orderHistory") !== null) {
    //first add a couple dummies
    dummyOrders();
    //get and parse the stringified array
    let orders = JSON.parse(localStorage.getItem('orderHistory'));
    //construct the objects and put into object array
    for (let order of orders) {
        let orderObj = new Order(parseInt(order[2]), new Date(order[0]), parseInt(order[1])); //$NON-NLS-L$
        console.log(orderObj);
        orderHistory.unshift(orderObj);
    }
}

//map of maps to hold both vehicles and droids
var productList = new Map();
productList.set("droids", new Map());
productList.set("vehicles", new Map());

//functions to get products and push to map
let getProductsList = async () => {
    let droidMap = productList.get("droids");
    let vehicleMap = productList.get("vehicles");
    for (let item of Products) {
        //loop through parsed json and add to either droid Map or vehicle Map
        if (item.type == "droid") {
            droidMap.set(item.productID, item);
        }
        else if (item.type == "vehicle") {
            vehicleMap.set(item.productID, item);
        }
    }
    readCart();

}

//load cart contents fromlocalStorage if available
var readCart = () => {
    if (localStorage.getItem("cart") !== null) {
        console.log("found cart in storage, reconstructing...");

        let droidMap = productList.get("droids");
        let vehicleMap = productList.get("vehicles");

        let cartIdString = localStorage.getItem("cart");
        let cartIds = JSON.parse(cartIdString);

        for (let productAr of cartIds) {
            if (productAr[1] == 'droid') {
                let product = droidMap.get(parseInt(productAr[0]));
                product.qty = parseInt(productAr[2]);
                shoppingCart[productAr[0]] = product;
            }
            else {
                let product = vehicleMap.get(parseInt(productAr[0]));
                product.qty = parseInt(productAr[2]);
                shoppingCart[productAr[0]] = product;
            }
        }
        console.log(shoppingCart);

    }
}



//function for anytime an object is added to cart
var addToCart = async (item) => {
    const cart = null || document.querySelector('.cartSlider');
    //if cart is empty then set the value of the first key (0) to our new item
    if (!shoppingCart.hasOwnProperty(item.productID)) {
        shoppingCart[item.productID] = item;
    }

    //re-render the cart and navbar (for click listener)
    cart.innerHTML = await Cart.render();
    await Cart.after_render();
    await Navbar.after_render();
    //display cart
    showCart();
    //save new cart to local storage
    saveCart();
}
//stringify the cart and persist
var saveCart = () => {
    let cartIds = [];

    for (let key in shoppingCart) {
        cartIds.push([key, shoppingCart[key].type, shoppingCart[key].qty]);
    }
    localStorage.setItem("cart", JSON.stringify(cartIds));
}

//show the cart and fade the other elements
var showCart = () => {
    var slider = document.querySelector(".cartSlider")
    var overlayBG = document.querySelector('.bg');
    overlayBG.classList.toggle('overlay');
    slider.classList.toggle('showCart');
}



//takes a number and adds commas to it every 3 digits
//VERY BAD i18n
let formatCurrencyWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let featuredProducts = [];

let getFeaturedProducts = async () => {
    featuredProducts = [];

    let vehicleMap = productList.get('vehicles');
    let droidMap = productList.get('droids');

    featuredProducts.push(vehicleMap.get(5));
    featuredProducts.push(droidMap.get(1));
    featuredProducts.push(vehicleMap.get(8));
    featuredProducts.push(droidMap.get(2));
}

export { shoppingCart, addToCart, showCart, saveCart, router, productList, orderHistory, formatCurrencyWithCommas, featuredProducts };

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home,
    '/droids': Browse,
    '/droids/:id': ProductShow,
    '/vehicles': Browse,
    '/vehicles/:id': ProductShow,
    '/history': OrderHistory,
    '/checkout': Checkout
};

//load background
particlesJS.load('particles-js', './plugins/assets/particlesjs-config.json', function () {
    //callback
});

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    const cart = null || document.querySelector('.cartSlider');
    const ham = null || document.querySelector('.hamSlider');

    //grab products from JSON file
    if (productList.get("droids").size == 0 && productList.get("vehicles").size == 0) {
        await getProductsList();
    }
    //render cart
    cart.innerHTML = await Cart.render();
    await Cart.after_render();
    // Render the Header, footer, hamburger menu
    ham.innerHTML = await Hamburger.render();
    await Hamburger.after_render();
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();



    

    //add some dummy orders if there's nothing there
    if (orderHistory.length == 0) {
        dummyOrders();
    }

    //create featured products array
    if (featuredProducts.length == 0) {
        await getFeaturedProducts();
    }

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404

    //lazy load and then render the correct page
    let loadPage = await import(`./views/pages/${page}`);
    content.innerHTML = await loadPage.default.render();
    await loadPage.default.after_render();

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
document.addEventListener('DOMContentLoaded', router);