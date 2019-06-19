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
                </div>
                <button class="checkoutButt">CHECKOUT</button>
            </div>
        </section>
    </header>
    <nav>
        <!-- nav links here -->
        <ul>
            <li><a href="/#/">HOME</a></li>
            <li><a href="/#/droids">DROIDS</a></li>
            <li><a href="/#/vehicles">VEHICLES</a></li>
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
                if (slider.classList.contains('showCart')) {
                    slider.classList.remove('showCart');
                } else {
                    slider.classList.add('showCart');
                }
            }, false);
        }
    }
}

export default Navbar;