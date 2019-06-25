import Utils from "../../services/Utils.js";
import { showCart, locale } from "../../app.js";

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
                    <a href="/#/profile" class=".historyButt">ORDER HISTORY</a>
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
            <li>
                <div class="dropdown">
                    <div class="dropbtn">
                        <h3>Lang: ${locale}</h3>
                        <img src="img/globe.svg" id="downArrow">
                    </div>
                    <div class="dropdown-content">
                        <h3 class="localOption">En</h3>
                        <h3 class="localOption">Sith</h3>
                        <h3 class="localOption">Other</h3>
                    </div>
                </div>
            </li>
        </ul>
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
        
        var logo = document.querySelector("#logo");

        //redirect to home on logo click
        logo.addEventListener("click", function() {
            location.href="/";
        }, false);

        

        //underline active lin
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

export default Navbar;