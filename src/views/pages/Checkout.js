import { shoppingCart, orderHistory } from "../../app.js";

import i18n from '../../services/i18n.js';

import { Order } from "../classes/Order.js";

//TODO: add click listeners for updating qty or deleting items from cart

var total;





let Checkout = {

    render: async () => {
        //static string to hold all the text (to be used within the HTML template literal)
        let checkoutTitle = i18n.getString("Checkout", "checkoutTitle");
        let shipSectionLabel = i18n.getString("Checkout", "shipSectionLabel");
        let firstNameLabel = i18n.getString("Checkout", "firstNameLabel");
        let lastNameLabel = i18n.getString("Checkout", "lastNameLabel");
        let coordinatesLabel = i18n.getString("Checkout", "coordinatesLabel");
        let coordinatesHolder = i18n.getString("Checkout", "coordinatesHolder");
        let sectorLabel = i18n.getString("Checkout", "sectorLabel");
        let methodLabel = i18n.getString("Checkout", "methodLabel");
        let shipLightspeed = i18n.getString("Checkout", "shipLightspeed");
        let shipOvernight = i18n.getString("Checkout", "shipOvernight");
        let shipStandard = i18n.getString("Checkout", "shipStandard");
        let paySectionLabel = i18n.getString("Checkout", "paySectionLabel");
        let payNameLabel = i18n.getString("Checkout", "payNameLabel");
        let payNameHolder = i18n.getString("Checkout", "payNameHolder");
        let accountLabel = i18n.getString("Checkout", "accountLabel");
        let accountHolder = i18n.getString("Checkout", "accountHolder");
        let securityLabel = i18n.getString("Checkout", "securityLabel");
        let securityHolder = i18n.getString("Checkout", "securityHolder");
        let expDateLabel = i18n.getString("Checkout", "expDateLabel");
        let cartTitle = i18n.getString("Checkout", "cartTitle");
        let deleteAlt = i18n.getString("Checkout", "deleteAlt");
        let totalLabel = i18n.getString("Checkout", "totalLabel");
        let orderLabel = i18n.getString("Checkout", "orderLabel");
        let termsStatement = i18n.getString("Checkout", "termsStatement");
        let termsLink = i18n.getString("Checkout", "termsLink");

        total = 0;
        //hide cart initially
        let slider = document.querySelector(".cartSlider")
        slider.classList.remove('showCart');
        let overlayBG = document.querySelector('.bg');
        overlayBG.classList.remove('overlay');

        //view is solely for HTML markup, contains no static text
        let view = `
        <section class="checkout">
            <div class="checkoutDetails">
                <h1>${checkoutTitle}</h1>
                <div class="shippingInfo">
                    <h2>${shipSectionLabel}</h2>
                    <div class="form">
                        <div class="formInline">
                            <div class="formElement name">
                                <label for="firstName">${firstNameLabel}</label>
                                <input type="text" id="firstName" name="firstName" class="checkoutInput" placeholder="${firstNameLabel}">
                            </div>
                            <div class="formElement name">
                                <label for="lastName">${lastNameLabel}</label>
                                <input type="text" id="lastName" name="lastName" class="checkoutInput" placeholder="${lastNameLabel}">
                            </div>
                        </div>

                        <div class="formInline">
                            <div class="formElement">
                                <label for="coordinates">${coordinatesLabel}</label>
                                <input type="text" id="coordinates" name="coordinates" class="checkoutInput" placeholder="${coordinatesHolder}">
                            </div>
                            <div class="formElement">
                                <label for="sector">${sectorLabel}</label>
                                <input type="text" id="sector" name="sector" class="checkoutInput" placeholder="${sectorLabel}">
                            </div>
                        </div>
                        
                        <div class="formElement">
                            <label for="shipMethod">${methodLabel}</label>
                            <select id="shipMethod" class="checkoutInput">
                                <option value="lightspeed">${shipLightspeed}</option>
                                <option value="overnight">${shipOvernight}</option>
                                <option value="standard">${shipStandard}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="paymentInfo">
                    <h2>${paySectionLabel}</h2>
                    <div class="form">
                        <div class="formElement halfWidth">
                            <label for="cardName">${payNameLabel}</label>
                            <input type="text" id="cardName" name="cardName" class="checkoutInput" placeholder="${payNameHolder}">
                        </div>
                        
                        <div class="formInline">
                            <div class="formElement">
                                <label for="account">${accountLabel}</label>
                                <input type="text" id="account" name="account" class="checkoutInput" placeholder="${accountHolder}">
                            </div>
                            <div class="formElement margin">
                                <label for="code">${securityLabel}</label>
                                <input type="text" id="code" name="code" class="checkoutInput" placeholder="${securityHolder}">
                            </div>
                            <div class="formElement">
                                <label for="expDate">${expDateLabel}</label>
                                <input type="date" id="expDate" name=expDate" class="checkoutInput">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="termsCheck">
                    <input type="checkbox" name="terms" value="terms">
                    <h4>${termsStatement}</h4>
                    <a target="_blank" href="./static/${i18n.getHTML()}">${termsLink}</a>
                </div>
                <button class="orderButt">${orderLabel}</button>
            </div>
            <div class="checkoutCart">
                <h1>${cartTitle}</h1>
            `;
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
            <div class="cartTotal">
                    <h3>${totalLabel}</h3>
                    <div class="totalPrice">
                        ${i18n.formatCurrency(total,"w")}
                    </div>
                </div>
            </div>
            
        </section>`

        return view;
    }
    , after_render: async () => {

        var orderButt = document.querySelector('.orderButt');
        orderButt.addEventListener('click', placeOrder, false);

    }
}

//handle order placement
var placeOrder = () => {
    let order = new Order(total, new Date()); //$NON-NLS-L$
    orderHistory.unshift(order);
    //zero out the qty for each item before removing it
    for (let key in shoppingCart) {
        let product = shoppingCart[key];
        product.qty = 0;
        delete shoppingCart[key];
        console.log(shoppingCart);
    }
    //construct success message
    let message = i18n.getString("Checkout", "successMessage");
    window.alert(message);
    location.href = "./#/history";
}
export { Checkout };