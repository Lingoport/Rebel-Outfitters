import {shoppingCart, router} from "../../app.js";

let Cart = {
    render: async () => {
        let total = 0;
        let view =  /*html*/
        `
                <div class="cartHead">
                    <h1>Shopping Cart</h1>
                    <img src="img/close.svg" class="cartIcon">
                </div>
                `;
                //show cart contents or display message if no contents
                if(shoppingCart.size == 0) {
                    view += `<h3>No Items in Cart.</h3>`;
                }else  {
                    view += `<div class="cartContents">`;
                    shoppingCart.forEach((value, key) => {
                        // html
                        total += value.price * value.qty;
                        view += `
                        <div class="cartItem">
                            <div class="cartQtyTitle">
                                <input type="number" class="cartQty" name="qty" id="${key}" min="1" max="10" size="0" value="${value.qty}">
                                <h4> x ${value.title}</h4>
                            </div>
                            <div class="cartPrice">
                                <div class="gridPrice">
                                    <img src="../../img/wSymbol.svg" class="symbol">
                                    <h4>${commas(value.price * value.qty)}</h4>
                                </div>
                                <img src="img/delete.svg" class="delete" id="${key}">
                            </div>
                        </div>`
                    });
                    view += `
                </div>
                <div class="cartTotal">
                    <h3>Total: </h3>
                    <div class="totalPrice">
                        <img src="../../img/wSymbol.svg" class="symbol">
                        <h3>${commas(total)}</h3>
                    </div>
                </div>
                <a class="checkoutButt" href="/#/checkout">CHECKOUT</a>
                `
                }
        return view
    },
    after_render: async () => {

        var qtyInputs = document.querySelectorAll(".cartQty");
        var deleteIcons = document.querySelectorAll(".delete");

        for(let input of qtyInputs) {
            input.addEventListener('input', updateQty, false);
        }
        for(let icon of deleteIcons) {
            icon.addEventListener('click', deleteItem, false);
        }
        
    }
}

var updateQty = (e) => {
    if(e.srcElement.value != "") {
        let changedQtyKey = e.srcElement.id;
        let newQty = parseInt(e.srcElement.value);
        console.log(newQty);
        let product = shoppingCart.get(changedQtyKey);
        product.qty = newQty;
        if(product.qty < 1) {
            product.qty = 0;
            shoppingCart.delete(changedQtyKey);
        }
        router();
    }
}

var deleteItem = (e) => {
    console.log(e);
    var deleteKey = e.srcElement.id;
    console.log(deleteKey);
    shoppingCart.get(deleteKey).qty = 0;
    shoppingCart.delete(deleteKey);
    router();
}

var commas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Cart;