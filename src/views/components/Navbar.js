import Utils from "../../services/Utils.js";
import { showCart, locale, updateLocale } from "../../app.js";

let Navbar = {
    render: async () => {
        let view =  /*html*/
        `<header>
        <!-- logo, search bar, local, profile drop down -->
        <section>
            <img src="img/logo.svg" id="logo">
        </section>
        <section id="search">
            <div id="bar">
                <input type="text" class="searchTerm" placeholder="What are you looking for?">
                <button type="submit" class="searchButton">
                    <img src="img/search.svg" id="searchIcon">
                </button>
             </div>
        </section>
        <section id="headOptions">
            <div class="dropdown">
                <div class="dropbtn">
                    <h2 id="greetingText">Hi, Han</h2>
                    <img src="img/arrow-down.svg" id="downArrow">
                </div>
                <div class="dropdown-content">
                    <a href="/#/profile" class=".profileButt">PROFILE</a>
                    <a href="/#/history" class=".historyButt">ORDER HISTORY</a>
                </div>
            </div>
            <img src="img/cart.svg" class="cartIcon">
        </section>
    </header>
    <nav>
        <!-- nav links here -->
        <ul>
            <li><a href="/#/" class="navLink" id="">HOME</a></li>
            <li><a href="/#/droids" class="navLink" id="droids">DROIDS</a></li>
            <li><a href="/#/vehicles" class="navLink" id="vehicles">VEHICLES</a></li>
        </ul>
        <div class="right">
            <div class="locale-dropdown">
                <div class="locale-dropbtn">
                    <h3>${locale}</h3>
                    <img src="img/globe.svg" class="globe">
                </div>
                <div class="locale-dropdown-content">
                    <h3 class="localeOption">EN</h3>
                    <h3 class="localeOption">SITH</h3>
                    <h3 class="localeOption">YODA</h3>
                    <h3 class="localeOption">GUNGAN</h3>
                </div>
            </div>
        </div>
    </nav>
    `
        return view
    },
    after_render: async () => {

        //cart slider functionality
        var cartIcons = document.querySelectorAll(".cartIcon");
        //show/hide the cart when cart icon is clicked
        for(let icon of cartIcons) {
            icon.addEventListener("click", showCart, false);
        }

        var overlayBG = document.querySelector('.bg');
        overlayBG.addEventListener('click', hideCart, false);


        var logo = document.querySelector("#logo");
        //redirect to home on logo click
        logo.addEventListener("click", function() {
            location.href="/";
        }, false);

        //change locale
        var localeOptions = document.querySelectorAll(".localeOption");
        for(let option of localeOptions) {
            option.addEventListener('click', changeLocale, false);
        }
        

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

//function to change locale and reload page
var changeLocale = (e) => {
    let newLocale = e.srcElement.innerText;
    updateLocale(newLocale);
}

export default Navbar;