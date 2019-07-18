import {shoppingCart, router, formatCurrencyWithCommas, saveCart} from "../../app.js";

//static strings to hold all the text (to be used within the HTML template literal)
let noItemMsg = "No Items in Cart.";
let symbolAlt = "Imperial Credit currency symbol";
let deleteAlt = "Delete item from cart";
let totalTitle = "Total: ";
let checkoutLabel = "CHECKOUT";
let closeAlt = "Close cart";

let Cart = {
    render: async () => {
        let total = 0;

        //view is solely for HTML markup, contains no static text
        let view = `
                <div class="cartHead">
                    <h1>Shopping Cart</h1>
                    <img src="img/close.svg" class="cartIcon" alt="${closeAlt}">
                </div>
                `;

                //show cart contents or display message if no contents
                if(Object.keys(shoppingCart).length === 0 && shoppingCart.constructor === Object) {
                    view += `<h3>${noItemMsg}</h3>`;
                }
                else {
                    view += `<div class="cartContents">`;
                    //create row for each item in title and addup the total
                    for(let key in shoppingCart) {
                        let value = shoppingCart[key];
                        total += value.price * value.qty;
                        view += `
                                <div class="cartItem">
                                    <div class="cartQtyTitle">
                                        <input type="number" class="cartQty" name="qty" id="${value.productID}" min="1" max="10" size="0" value="${value.qty}">
                                        <h4>${value.title}</h4>
                                    </div>
                                    <div class="cartPrice">
                                        <div class="gridPrice">
                                            <img src="../../img/wSymbol.svg" class="symbol" alt="${symbolAlt}">
                                            <h4>${formatCurrencyWithCommas(value.price * value.qty)}</h4>
                                        </div>
                                        <img src="img/delete.svg" class="delete" id="${value.productID}" alt="${deleteAlt}">
                                    </div>
                                </div>`;
                    }
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
        let product = shoppingCart[changedQtyKey];
        product.qty = newQty;
        if(product.qty < 1) {
            product.qty = 0;
            delete shoppingCart[changedQtyKey];
        }
        //save changes
        saveCart();
        //re-render
        router();
    }
}

//remove a single item by clicking on trash can icon
var deleteItem = (e) => {
    var deleteKey = e.srcElement.id;
    console.log(deleteKey);
    shoppingCart[deleteKey].qty = 0;
    delete shoppingCart[deleteKey];
    //save changes
    saveCart();
    //re-render
    router();
}

export default Cart;