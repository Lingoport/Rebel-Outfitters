import {shoppingCart, showCart} from "../../app.js";

let Checkout = {

    render: async () => {
        //hide cart initially
        var slider = document.querySelector(".cartSlider")
        slider.classList.remove('showCart');
        var content = document.querySelectorAll('.content');
        for (let section of content) {
            section.classList.remove('fade');
        }

        let view = `
        <section>
            <div class="checkoutDetails">
            <h1>Checkout</h1>
            </div>
            <div class="checkoutCart">
            `
            shoppingCart.forEach((value, key) => {
                // html
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
            </div>
        </section>`

        return view;
    }
    , after_render: async () => {

    }
}

export default Checkout;