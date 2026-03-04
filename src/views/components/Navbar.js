import Utils from "../../services/Utils.js";
import { showCart} from "../../app.js";
import i18n from "../../services/i18n.js";

let Navbar = {
    render: async () => {
        const home       = await i18n.t('navbar.home', 'HOME');
        const droids     = await i18n.t('navbar.droids', 'DROIDS');
        const vehicles   = await i18n.t('navbar.vehicles', 'VEHICLES');
        const history    = await i18n.t('navbar.orderHistory', 'ORDER HISTORY');
        const greeting   = await i18n.t('navbar.greeting', 'Hi, Han');
        const searchPlaceholder = await i18n.t('navbar.searchPlaceholder', 'What are you looking for?');
        const searchAriaLabel   = await i18n.t('navbar.searchAriaLabel', 'search products');

        //static alt text (not translatable in this pass)
        let logoAlt = "Rebel Outfitters Logo";
        let searchIconAlt = "search icon";
        let arrowAlt = "Drop Down Arrow";
        let cartAlt = "Show cart";

        //view is solely for HTML markup, contains no static text
        let view =
        `<header>
        <!-- logo, search bar, local, profile drop down -->
        <section>
            <img src="img/logo.svg" id="logo" alt="${logoAlt}">
        </section>
        <section id="search">
            <div id="bar">
                <input type="text" class="searchTerm" placeholder="${searchPlaceholder}" aria-label="${searchAriaLabel}">
                <button type="submit" class="searchButton" aria-label="${searchAriaLabel}">
                    <img src="img/search.svg" id="searchIcon" alt="${searchIconAlt}">
                </button>
             </div>
        </section>
        <section id="headOptions">
            <div class="dropdown">
                <div class="dropbtn">
                    <h2 id="greetingText">${greeting}</h2>
                    <img src="img/arrow-down.svg" id="downArrow" alt="${arrowAlt}">
                </div>
                <div class="dropdown-content">
                    <a href="/#/history" class=".historyButt">${history}</a>
                </div>
            </div>
            <img src="img/cart.svg" class="cartIcon" alt="${cartAlt}">
        </section>
    </header>
    <nav>
        <!-- nav links here -->
        <ul>
            <li><a href="/#/" class="navLink" id="">${home}</a></li>
            <li><a href="/#/droids" class="navLink" id="droids">${droids}</a></li>
            <li><a href="/#/vehicles" class="navLink" id="vehicles">${vehicles}</a></li>
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
