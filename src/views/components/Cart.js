import { shoppingCart, router, saveCart } from "../../app.js";
import i18n from '../../services/i18n.js';

let Cart = {
    render: async () => {
        let total = 0;

        //strings to hold all the text (to be used within the HTML template literal)
        let cartTitle = i18n.getString("Cart", "cartTitle");
        let noItemMsg = i18n.getString("Cart", "noItemMsg");
        let deleteAlt = i18n.getString("Cart", "deleteAlt");
        let totalTitle = i18n.getString("Cart", "totalTitle");
        let checkoutLabel = i18n.getString("Cart", "checkoutLabel");
        let closeAlt = i18n.getString("Cart", "closeAlt");

        //view is solely for HTML markup, contains no static text
        let view = `
                <div class="cartHead">
                    <h1>${cartTitle}</h1>
                    <img src="img/close.svg" class="cartIcon" alt="${closeAlt}">
                </div>
                `;

        //show cart contents or display message if no contents
        if (Object.keys(shoppingCart).length === 0 && shoppingCart.constructor === Object) {
            view += `<h3>${noItemMsg}</h3>`;
        }
        else {
            view += `<div class="cartContents">`;
            //create row for each item in title and addup the total
            for (let key in shoppingCart) {
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
                                            ${i18n.formatCurrency(value.price * value.qty, "w")}
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
                                    ${i18n.formatCurrency(total, "w")}
                                </div>
                            </div>
                            <a class="checkoutButt" href="./#/checkout">${checkoutLabel}</a>
                            `;
        }
        return view
    },
    after_render: async () => {

        var qtyInputs = document.querySelectorAll(".cartQty");
        var deleteIcons = document.querySelectorAll(".delete");

        for (let input of qtyInputs) {
            input.addEventListener('input', updateQty, false);
        }
        for (let icon of deleteIcons) {
            icon.addEventListener('click', deleteItem, false);
        }

    }
}

//handle changes in qty text input
var updateQty = (e) => {
    if (e.srcElement.value != "") {
        let changedQtyKey = e.srcElement.id;
        let newQty = parseInt(e.srcElement.value);
        let product = shoppingCart[changedQtyKey];
        product.qty = newQty;
        if (product.qty < 1) {
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