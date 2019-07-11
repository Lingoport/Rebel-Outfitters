import {shoppingCart, router, formatCurrencyWithCommas} from "../../app.js";

//strings to hold all the text (to be used within the HTML template literal)
let noItemMsg = "No Items in Cart.";
let symbolAlt = "Imperial Credit currency symbol";
let deleteAlt = "Delete item from cart";
let totalTitle = "Total: ";
let checkoutLabel = "CHECKOUT";

let Cart = {
    render: async () => {
        let total = 0;

        let view = `
                <div class="cartHead">
                    <h1>Shopping Cart</h1>
                    <img src="img/close.svg" class="cartIcon">
                </div>
                `;

                //show cart contents or display message if no contents
                if(shoppingCart.size == 0) {
                    view += `<h3>${noItemMsg}</h3>`;
                }
                else {
                    view += `<div class="cartContents">`;
                    //create row for each item in title and addup the total
                    shoppingCart.forEach((value, key) => {
                        
                        total += value.price * value.qty;
                        view += `
                        <div class="cartItem">
                            <div class="cartQtyTitle">
                                <input type="number" class="cartQty" name="qty" id="${key}" min="1" max="10" size="0" value="${value.qty}">
                                <h4>${value.title}</h4>
                            </div>
                            <div class="cartPrice">
                                <div class="gridPrice">
                                    <img src="../../img/wSymbol.svg" class="symbol" alt="${symbolAlt}">
                                    <h4>${formatCurrencyWithCommas(value.price * value.qty)}</h4>
                                </div>
                                <img src="img/delete.svg" class="delete" id="${key}" alt="${deleteAlt}">
                            </div>
                        </div>`
                    });
                    view += `
                </div>
                <div class="cartTotal">
                    <h3>${totalTitle}</h3>
                    <div class="totalPrice">
                        <img src="../../img/wSymbol.svg" class="symbol" alt="${symbolAlt}">
                        <h3>${formatCurrencyWithCommas(total)}</h3>
                    </div>
                </div>
                <a class="checkoutButt" href="/#/checkout">${checkoutLabel}</a>
                `;
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

//handle changes in qty text input
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

//remove a single item by clicking on trash can icon
var deleteItem = (e) => {
    console.log(e);
    var deleteKey = e.srcElement.id;
    console.log(deleteKey);
    shoppingCart.get(deleteKey).qty = 0;
    shoppingCart.delete(deleteKey);
    router();
}

export default Cart;