"use strict";

import Home         from './views/pages/Home.js';
import {Browse}        from './views/pages/Browse.js';
import Error404     from './views/pages/Error404.js';
import ProductShow     from './views/pages/ProductShow.js';
import {Checkout}     from './views/pages/Checkout.js';
import OrderHistory     from './views/pages/OrderHistory.js';


import Navbar       from './views/components/Navbar.js';
import Bottombar    from './views/components/Bottombar.js';
import Cart from    './views/components/Cart.js';
import {Hamburger} from './views/components/Hamburger.js';

import {Order} from './views/classes/Order.js';

import Utils        from './services/Utils.js';

import products from './content/products.js';

//global variables//

//schema: id (int), item (object)
var shoppingCart = new Map();

var orderHistory = [];

//map of maps to hold both vehicles and droids
var productList = new Map();
productList.set("droids", new Map());
productList.set("vehicles", new Map());

//functions to get products and push to map
let getProductsList = async() => {
    let droidMap = productList.get("droids");
    let vehicleMap = productList.get("vehicles");
    for(let item of products) {
        //loop through parsed json and add to either droid Map or vehicle Map
        if(item.type == "droid") {
            droidMap.set(droidMap.size, item);
        }
        else if(item.type == "vehicle") {
            vehicleMap.set(vehicleMap.size, item);
        }
    }
}


//function for anytime an object is added to cart
var addToCart = async (item) =>  {
    const cart = null || document.querySelector('.cartSlider');
    //if cart is empty then set the value of the first key (0) to our new item
    if(!shoppingCart.has(item.title)) {
        shoppingCart.set(item.title, item);
    }

    //re-render the cart and navbar (for click listener)
    cart.innerHTML = await Cart.render();
    await Cart.after_render();
    await Navbar.after_render();
    //display cart
    showCart();
}

//show the cart and fade the other elements
var showCart = () => {
    var slider = document.querySelector(".cartSlider")
    var overlayBG = document.querySelector('.bg');
    overlayBG.classList.toggle('overlay');
    slider.classList.toggle('showCart');
}

//adds some dummy orders to the history on startup
let dummyOrders = () => {
    let order1 = new Order(new Date('May 13, 2019 03:24:00'), 68500, "Delivered");
    let order2 = new Order(new Date('July 1, 2019 03:24:00'), 900, "Shipped");
    orderHistory.push(order2);
    orderHistory.push(order1);
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
   
    featuredProducts.push(vehicleMap.get(0));
    featuredProducts.push(droidMap.get(1));
    featuredProducts.push(vehicleMap.get(2));
    featuredProducts.push(droidMap.get(3));
}

export { shoppingCart, addToCart, showCart, router, productList, orderHistory, formatCurrencyWithCommas, featuredProducts };

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/' : Home, 
    '/droids' : Browse,
    '/droids/:id' : ProductShow,
    '/vehicles' : Browse,
    '/vehicles/:id' : ProductShow,
    '/history' : OrderHistory,
    '/checkout' : Checkout
};

//load background
particlesJS.load('particles-js', 'config/particlesjs-config.json', function() {
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
    
    // Render the Header, footer, and empty cart of the page
    cart.innerHTML = await Cart.render();
    await Cart.after_render();
    ham.innerHTML = await Hamburger.render();
    await Hamburger.after_render();
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();

    //grab products from JSON file
    if(productList.get("droids").size == 0 && productList.get("vehicles").size == 0) {
        await getProductsList();
    }

    //add some dummy orders if there's nothing there
    if(orderHistory.length == 0) {
        dummyOrders();
    }

    //create featured products array
    if(featuredProducts.length == 0) {
        await getFeaturedProducts();
    }

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

    addTooltipsToGremlins();

}

var addTooltipsToGremlins = () => {
        //add tooltips for the gremlins
        tippy('.embedded', {
            content: '<div class="gremTitle">EMBEDDED STRING</div> This string is embedded in the source code. Click for more info.',
            theme: 'custom',
            arrow: true,
          });
    
        tippy('.format', {
            content: '<div class="gremTitle">CURRENCY FORMAT</div> The formatting for this currency is hard-coded. Click for more info.',
            theme: 'custom',
            arrow: true,
        });
    
        tippy('.localeMethod', {
            content: '<div class="gremTitle">DATE/TIME FORMAT</div> The formatting for this date is hard-coded. Click for more info.',
            theme: 'custom',
            arrow: true,
        });
    
        tippy('.concat', {
            content: '<div class="gremTitle">CONCATENATION</div> This content was created using Javascript string concatenation. Click for more info.',
            theme: 'custom',
            arrow: true,
        });
    
        tippy('.staticFile', {
            content: '<div class="gremTitle">STATIC FILE</div> This links to a static file. Click for more info.',
            theme: 'custom',
            arrow: true,
        });
}


// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
document.addEventListener('DOMContentLoaded', router);