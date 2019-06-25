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
                if(shoppingCart[0] == "Empty Cart") {
                    view += `<h3>No Items in Cart.</h3>`
                }else  {
                    view += `<div class="cartContents">
                    ${shoppingCart.map(item =>
                        // html
                        `<div class="cartItem">
                            <div class="cartQtyTitle">
                                <input type="number" class="cartQty" name="qty" min="1" max="10" size="0" value="${item.qty}">
                                <h3> x ${item.title}</h3>
                            </div>
                        </div>
                        `
                        ).join('\n ')}
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