"use strict";

import Home         from './views/pages/Home.js';
import {Droids}        from './views/pages/Droids.js';
import Error404     from './views/pages/Error404.js';
import DroidShow     from './views/pages/DroidShow.js';
import Vehicles     from './views/pages/Vehicles.js';
import Profile     from './views/pages/Profile.js';
import Checkout     from './views/pages/Checkout.js';


import Navbar       from './views/components/Navbar.js';
import Bottombar    from './views/components/Bottombar.js';
import Cart from    './views/components/Cart.js';

import Utils        from './services/Utils.js';

//global variables
var currentProduct = {};
var shoppingCart = ["Empty Cart"];
var addToCart = async item =>  {
    const cart = null || document.querySelector('.cartSlider');
    console.log(item);
    if(shoppingCart[0] == "Empty Cart") {
        shoppingCart[0] = item;
    }
    else {
        let duplicate = false;
        for(let i = 0; i < shoppingCart.length && duplicate == false ; i++) {
            if(shoppingCart[i].title == item.title) {
                console.log("duplicate item!");
                shoppingCart[i].qty += item.qty;
                duplicate = true;
            }
            else if(i == shoppingCart.length - 1) {
                console.log('new item!');
                shoppingCart.push(item);
            }
        }
        
    }
    console.log(shoppingCart);
    //re-render the cart
    cart.innerHTML = await Cart.render();
    //display cart
    //TODO: cart won't collapsed after this is called
    showCart();
}

//TODO: there's something buggy going on - try adding item to cart, closing cart, then opening cart again
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

export { shoppingCart, addToCart, showCart };

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/' : Home, 
    '/droids' : Droids,
    '/droids/:id' : DroidShow,
    '/vehicles' : Vehicles,
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
    
    // Render the Header and footer of the page
    cart.innerHTML = await Cart.render();
    await Cart.after_render();
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();

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
