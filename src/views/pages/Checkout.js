import {shoppingCart, orderHistory, formatCurrency} from "../../app.js";

import {Order} from "../classes/Order.js";

//TODO: add click listeners for updating qty or deleting items from cart

var total;

//static string to hold all the text (to be used within the HTML template literal)
let checkoutTitle = "Checkout";
let shipSectionLabel = "Shipping Info";
let firstNameLabel = "First Name";
let lastNameLabel = "Last Name";
let coordinatesLabel = "Coordinates";
let coordinatesHolder = "0,0,0";
let sectorLabel = "Sector";
let methodLabel = "Shipping Method";
let methodOptions = ["Lightspeed", "Overnight", "Standard"];
let paySectionLabel = "Payment";
let payNameLabel = "Name on Card";
let payNameHolder = "First Last";
let accountLabel = "Imperial Credit Number";
let accountHolder = "1234567-9876-00";
let securityLabel = "Security Code";
let securityHolder = "123456";
let expDateLabel = "Expiration Date";
let cartTitle = "Shopping Cart";
let symbolAlt = "Imperial Credit currency symbol";
let deleteAlt = "remove item from cart";
let totalLabel = "Total: ";



let Checkout = {

    render: async () => {
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
                                <option value="lightspeed">${methodOptions[0]}</option>
                                <option value="overnight">${methodOptions[1]}</option>
                                <option value="standard">${methodOptions[2]}</option>
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
                    <h4>I have read and agree to the <a target="_blank" href="../../static/terms.html">Terms and Conditions</a></h4>
                </div>
                <button class="orderButt">PLACE ORDER</button>
            </div>
            <div class="checkoutCart">
                <h1>${cartTitle}</h1>
            `;
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
                                    ${formatCurrency(value.price * value.qty)}
                                </div>
                                <img src="img/delete.svg" class="delete" id="${value.productID}" alt="${deleteAlt}">
                            </div>
                        </div>`;
            }
            view += `
            <div class="cartTotal">
                    <h3>${totalLabel}</h3>
                    <div class="totalPrice">
                        ${formatCurrency(total)}
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
//NEED TO CLEAR ALL THE QUANTITIES
var placeOrder = () => {
    let order = new Order(new Date(), total, "Processing");
    orderHistory.unshift(order);
    //zero out the qty for each item before removing it
    shoppingCart.forEach((product, key) => {
        product.qty = 0;
    });
    shoppingCart.clear();
    //construct success message
    let message = "Order #" + order.orderNumber + " placed successfully!";
    window.alert(message);
    location.href="/#/history";
}
export { Checkout };