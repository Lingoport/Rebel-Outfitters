import {shoppingCart, orderHistory, i18nMode} from "../../app.js";
import {Order} from "../classes/Order.js";
import i18n from "../../services/i18n.js";

//TODO: add click listeners for updating qty or deleting items from cart

var total;

let Checkout = {

    render: async () => {
        total = 0;
        //hide cart initially
        let slider = document.querySelector(".cartSlider")
        slider.classList.remove('showCart');
        let overlayBG = document.querySelector('.bg');
        overlayBG.classList.remove('overlay');

        const checkoutTitle     = await i18n.t('checkout.title', 'Checkout');
        const shipSectionLabel  = await i18n.t('checkout.shippingInfo', 'Shipping Info');
        const firstNameLabel    = await i18n.t('checkout.firstName', 'First Name');
        const lastNameLabel     = await i18n.t('checkout.lastName', 'Last Name');
        const coordinatesLabel  = await i18n.t('checkout.coordinates', 'Coordinates');
        const sectorLabel       = await i18n.t('checkout.sector', 'Sector');
        const methodLabel       = await i18n.t('checkout.shippingMethod', 'Shipping Method');
        const paySectionLabel   = await i18n.t('checkout.payment', 'Payment');
        const payNameLabel      = await i18n.t('checkout.nameOnCard', 'Name on Card');
        const accountLabel      = await i18n.t('checkout.creditNumber', 'Imperial Credit Number');
        const securityLabel     = await i18n.t('checkout.securityCode', 'Security Code');
        const expDateLabel      = await i18n.t('checkout.expirationDate', 'Expiration Date');
        const cartTitle         = await i18n.t('checkout.cart', 'Shopping Cart');
        const totalLabel        = await i18n.t('checkout.total', 'Total: ');

        // Shipping options (array key)
        const shippingOpts = i18nMode === 'i18n'
            ? (await i18n.t('checkout.shippingOptions', null) || ["Lightspeed", "Overnight", "Standard"])
            : ["Lightspeed", "Overnight", "Standard"];

        let coordinatesHolder = "0,0,0";
        let payNameHolder = "First Last";
        let accountHolder = "1234567-9876-00";
        let securityHolder = "123456";
        let symbolAlt = "Imperial Credit currency symbol";
        let deleteAlt = "remove item from cart";

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
                                <option value="lightspeed">${shippingOpts[0]}</option>
                                <option value="overnight">${shippingOpts[1]}</option>
                                <option value="standard">${shippingOpts[2]}</option>
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
            shoppingCart.forEach((value, key) => {
                // html
                total += value.price * value.qty;
                view += `
                <div class="cartItem">
                    <div class="cartQtyTitle">
                        <input type="number" class="cartQty" name="qty" id="${key}" min="1" max="10" size="0" value="${value.qty}">
                        <h3>${value.title}</h3>
                    </div>
                    <div class="cartPrice">
                        <div class="gridPrice">
                            <img src="../../img/wSymbol.svg" class="symbol" alt="${symbolAlt}">
                            <h4>${i18n.formatCurrency(value.price * value.qty)}</h4>
                        </div>
                        <img src="img/delete.svg" class="delete" id="${key}" alt="${deleteAlt}">
                    </div>
                </div>`
            });
            view += `
            <div class="cartTotal">
                    <h3>${totalLabel}</h3>
                    <div class="totalPrice">
                        <img src="../../img/wSymbol.svg" class="symbol" alt="${symbolAlt}">
                        <h3>${i18n.formatCurrency(total)}</h3>
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
var placeOrder = async () => {
    let order = new Order(new Date(), total, "Processing");
    orderHistory.unshift(order);
    //zero out the qty for each item before removing it
    shoppingCart.forEach((product, key) => {
        product.qty = 0;
    });
    shoppingCart.clear();
    //construct success message
    const successTemplate = await i18n.t('checkout.orderSuccess', 'Order #{number} placed successfully!');
    let message = successTemplate.replace('{number}', order.orderNumber);
    window.alert(message);
    location.href="/#/history";
}
export { Checkout };
