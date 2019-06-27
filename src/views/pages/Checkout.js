import {shoppingCart, showCart} from "../../app.js";

let Checkout = {

    render: async () => {
        let total = 0;
        //hide cart initially
        var slider = document.querySelector(".cartSlider")
        slider.classList.remove('showCart');
        var content = document.querySelectorAll('.content');
        for (let section of content) {
            section.classList.remove('fade');
        }

        let view = `
        <section class="checkout">
            
            <div class="checkoutDetails">
                <h1>Checkout</h1>
                <div class="shippingInfo">
                    <h2>Shipping Info</h2>
                    <div class="form">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="name">
                        <label for="coordinates">Coordinates</label>
                        <input type="text" id="coordinates" name="coordinates">
                        <label for="sector">Sector</label>
                        <input type="text" id="sector" name="sector">
                    </div>
                </div>
                <div class="paymentInfo">
                    <h2>Payment</h2>
                </div>
                <button class="orderButt">CONFIRM ORDER</button>
            </div>
            <div class="checkoutCart">
                <h1>Shopping Cart</h1>
            `
            shoppingCart.forEach((value, key) => {
                // html
                total += value.price * value.qty;
                view += `
                <div class="cartItem">
                    <div class="cartQtyTitle">
                        <input type="number" class="cartQty" name="qty" id="${key}" min="1" max="10" size="0" value="${value.qty}">
                        <h3> x ${value.title}</h3>
                    </div>
                    <div class="cartPrice">
                        <div class="gridPrice">
                            <img src="../../img/wSymbol.svg" class="symbol">
                            <h4>${value.price * value.qty}</h4>
                        </div>
                        <img src="img/delete.svg" class="delete" id="${key}">
                    </div>
                </div>`
            });
            view += `
            <div class="cartTotal">
                    <h3>Total: </h3>
                    <div class="totalPrice">
                        <img src="../../img/wSymbol.svg" class="symbol">
                        <h3>${total}</h3>
                    </div>
                </div>
            </div>
            
        </section>`

        return view;
    }
    , after_render: async () => {

    }
}

export default Checkout;