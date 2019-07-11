import Utils from "../../services/Utils.js";
import { showCart} from "../../app.js";

//strings to hold all text used within HTML template literal
let searchPlaceholder = "What are you looking for?";
let searchButtonLabel = "search products";
let logoAlt = "Rebel Outfitters Logo";
let searchIconAlt = "search icon";
let greetingText = "Hi, Han";
let historyLink = "ORDER HISTORY";
let arrowAlt = "Drop Down Arrow";
let cartAlt = "Show cart";
let navLinksText = ["HOME", "DROIDS", "VEHICLES"];

let Navbar = {
    render: async () => {

        //view is solely for HTML markup, contains no static text
        let view =
        `<header>
        <!-- logo, search bar, local, profile drop down -->
        <section>
            <img src="img/logo.svg" id="logo" alt="${logoAlt}">
        </section>
        <section id="search">
            <div id="bar">
                <input type="text" class="searchTerm" placeholder="${searchPlaceholder}" aria-label="${searchButtonLabel}">
                <button type="submit" class="searchButton" aria-label="${searchButtonLabel}">
                    <img src="img/search.svg" id="searchIcon" alt="${searchIconAlt}">
                </button>
             </div>
        </section>
        <section id="headOptions">
            <div class="dropdown">
                <div class="dropbtn">
                    <h2 id="greetingText">${greetingText}</h2>
                    <img src="img/arrow-down.svg" id="downArrow" alt="${arrowAlt}">
                </div>
                <div class="dropdown-content">
                    <a href="/#/history" class=".historyButt">${historyLink}</a>
                </div>
            </div>
            <img src="img/cart.svg" class="cartIcon" alt="${cartAlt}">
        </section>
    </header>
    <nav>
        <!-- nav links here -->
        <ul>
            <li><a href="/#/" class="navLink" id="">${navLinksText[0]}</a></li>
            <li><a href="/#/droids" class="navLink" id="droids">${navLinksText[1]}</a></li>
            <li><a href="/#/vehicles" class="navLink" id="vehicles">${navLinksText[2]}</a></li>
        </ul>
    </nav>
    `;
        return view
    },
    after_render: async () => {

        //cart slider functionality
        var cartIcons = document.querySelectorAll(".cartIcon");
        //show/hide the cart when cart icon is clicked
        for(let icon of cartIcons) {
            icon.addEventListener("click", showCart, false);
        }

        //add click listener to clse cart when user clicks anywhere else on page
        var overlayBG = document.querySelector('.bg');
        overlayBG.addEventListener('click', hideCart, false);

        var logo = document.querySelector("#logo");
        //redirect to home on logo click
        logo.addEventListener("click", function() {
            location.href="/";
        }, false);


        

        //underline active link
        //figure out what resource path we're at and add the activeLink class so it can be styled in css
        let request = Utils.parseRequestURL();
        //link animation stuff
        let navLinks = document.querySelectorAll(".navLink");
        for(let cur of navLinks) {
            cur.classList.remove("activeLink");
            cur.classList.remove("inactiveLink");
            if(cur.id == request.resource) {
                cur.classList.add("activeLink");
            }
            else {
                cur.classList.add("inactiveLink");
            }
        }
    }
}

//function to hide cart (only when it's currently visible)
var hideCart = e => {
    console.log('click to hide triggered');
    var slider = document.querySelector(".cartSlider")
    var bg = document.querySelector('.bg');

    slider.classList.remove('showCart');
    bg.classList.remove('overlay');
}



export default Navbar;