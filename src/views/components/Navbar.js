import Utils from "../../services/Utils.js";

let Navbar = {
    render: async () => {
        let view =  /*html*/`
        <header>
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
                    <a href="#">PROFILE</a>
                    <a href="#">ORDER HISTORY</a>
                </div>
            </div>
            <img src="img/cart.svg" class="cartIcon">
            <div class="cartSlider">
                <h1>Shopping Cart</h1>
                <img src="img/cart.svg" class="cartIcon">
                <div class="cartContents">
                    <!-- populate contents here -->
                    <div class="cartObject">
                        <h4>${shoppingCart}</h4>
                    </div>
                </div>
                <button class="checkoutButt">CHECKOUT</button>
            </div>
        </section>
    </header>
    <nav>
        <!-- nav links here -->
        <ul>
            <li><a href="/#/" class="navLink" id="">HOME</a></li>
            <li><a href="/#/droids" class="navLink" id="droids">DROIDS</a></li>
            <li><a href="/#/vehicles" class="navLink" id="vehicles">VEHICLES</a></li>
        </ul>
    </nav>
        `
        return view
    },
    after_render: async () => {
        //cart slider functionality
        var cartIcons = document.querySelectorAll(".cartIcon");
        var slider = document.querySelector(".cartSlider")

        for(let icon of cartIcons) {
            icon.addEventListener("click", function() {
                slider.classList.toggle('showCart');
            }, false);
        }

        //underline active link
        let request = Utils.parseRequestURL();
        //figure out what resource path we're at and add the activeLink class so it can be styled in css

        //TODO: need to make sure that active link doesn't get the underline animation...
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