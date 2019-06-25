import {shoppingCart} from "../../app.js";

let Cart = {
    render: async () => {
        let view =  /*html*/
        `
                <div class="cartHead">
                    <h1>Shopping Cart</h1>
                    <img src="img/close.svg" class="cartIcon">
                </div>
                `
                //show cart contents or display message if no contents
                if(shoppingCart.length == 0) {
                    view += `<h3>No Items in Cart.</h3>`
                }else  {
                    view += `<div class="cartContents">`;
                    shoppingCart.forEach((value, key) => {
                        // html
                        view += `
                        <div class="cartItem">
                            <div class="cartQtyTitle">
                                <input type="number" class="cartQty" name="qty" min="1" max="10" size="0" value="${value.qty}">
                                <h3> x ${value.title}</h3>
                            </div>
                            <div class="cartPrice">
                                <div class="gridPrice">
                                    <img src="../../img/wSymbol.svg" class="symbol">
                                    <h4>${value.price}</h4>
                                </div>
                                <img src="img/delete.svg" class="delete ${key}">
                            </div>
                        </div>`
                    });
                    view += `
                </div>
                <a class="checkoutButt" href="/#/checkout">CHECKOUT</a>
                `
                }
        return view
    },
    after_render: async () => {

    }
}

export default Cart;