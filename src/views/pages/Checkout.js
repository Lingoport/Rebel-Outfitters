import {shoppingCart, showCart} from "../../app.js";

let Checkout = {

    render: async () => {
        //hide the cart initially
        showCart();
        return /*html*/ `
            <section>
                <h1>Checkout</h1>
            </section>
        `
    }
    , after_render: async () => {

    }
}

export default Checkout;