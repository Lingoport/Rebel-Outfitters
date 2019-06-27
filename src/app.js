"use strict";

import Home         from './views/pages/Home.js';
import {Browse}        from './views/pages/Droids.js';
import Error404     from './views/pages/Error404.js';
import ProductShow     from './views/pages/DroidShow.js';
import Vehicles     from './views/pages/Vehicles.js';
import Profile     from './views/pages/Profile.js';
import Checkout     from './views/pages/Checkout.js';


import Navbar       from './views/components/Navbar.js';
import Bottombar    from './views/components/Bottombar.js';
import Cart from    './views/components/Cart.js';

import Utils        from './services/Utils.js';

//global variables//

//schema: id (int), item (object)
var shoppingCart = new Map();
//used to store info about selected locale
var locale = "EN";
var updateLocale = (newLocale) => {
    locale = newLocale;
    router();
}

//map of maps to hold both vehicles and droids
var productList = new Map();
productList.set("droids", new Map());
productList.set("vehicles", new Map());

//function to get droids and push to map
let getDroidsList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch('content/products.json', options)
       const json = await response.json();

       let droidMap = productList.get("droids");
        let vehicleMap = productList.get("vehicles");
       for(let item of json) {
           //loop through parsed json and add to either droid Map or vehicle Map
           if(item.type == "droid") {
                droidMap.set(droidMap.size, item);
           }
           else if(item.type == "vehicle") {
                vehicleMap.set(vehicleMap.size, item);
           }
       }
       
       //THIS IS JUSt FOr DEV
       //addToCart(droidMap.get(0));

       console.log(productList);

   } catch (err) {
       console.log('Error getting products', err)
   }
}

//function for anytime an object is added to cart
var addToCart = async (item) =>  {
    const cart = null || document.querySelector('.cartSlider');
    console.log(item);
    //if cart is empty then set the value of the first key (0) to our new item
    if(!shoppingCart.has(item.title)) {
        shoppingCart.set(item.title, item);
    }

    console.log(shoppingCart);
    //re-render the cart and navbar (for click listener)
    cart.innerHTML = await Cart.render();
    await Cart.after_render();
    await Navbar.after_render();
    //display cart
    showCart();
}

//show the cart and fade the other elements
var showCart = async () => {
    var slider = document.querySelector(".cartSlider")
    var content = document.querySelectorAll('.content');

    console.log("show cart toggled");
    slider.classList.toggle('showCart');
    for (let section of content) {
        section.classList.toggle('fade');
    }
}

export { shoppingCart, addToCart, showCart, router, locale, productList, updateLocale };

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/' : Home, 
    '/droids' : Browse,
    '/droids/:id' : ProductShow,
    '/vehicles' : Browse,
    '/vehicles/:id' : ProductShow,
    '/profile' :  Profile,
    '/checkout' : Checkout
};

//load background
particlesJS.load('particles-js', 'config/particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
});

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    const cart = null || document.querySelector('.cartSlider')
    
    // Render the Header, footer, and empty cart of the page
    cart.innerHTML = await Cart.render();
    await Cart.after_render();
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();

    //fetch the products if we don't already have them 
    if(productList.get("droids").size == 0 && productList.get("vehicles").size == 0) {
        await getDroidsList();
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
}


// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
