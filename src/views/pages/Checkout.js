import { shoppingCart, saveCart, orderHistory, formatCurrencyWithCommas, router } from "../../app.js";

import { Order } from "../classes/Order.js";

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
let termsStatement = "I have read and agree to the ";
let termsLink = "Terms and Conditions";
let orderButton = "PLACE ORDER"
let noItemMessage = "Add items to cart to proceed.";


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
            <div class="checkoutDetails grem-container">
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
                    <div class="grem-container left">
                        <h2>${paySectionLabel}</h2>
                        <img src="img/orange_grem.png" class="gremlin-right checkoutEmbedded">
                    </div>
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
                <div class="termsCheck grem-container left">
                    <input type="checkbox" name="terms" value="terms">
                    <h4>${termsStatement}<a target="_blank" href="static/terms.html">${termsLink}</a></h4>
                    <img src="img/green_grem.png" class="gremlin-right small checkoutStaticFile">
                </div>
                <button class="orderButt">${orderButton}</button>
            </div>
            <div class="checkoutCart">
                <h1>${cartTitle}</h1>
            `;
        if (Object.keys(shoppingCart).length === 0 && shoppingCart.constructor === Object) {
            view += `<h3 class="noItemsMsg">${noItemMessage}</h3>`;
        }
        else {
            for (let key in shoppingCart) {
                let value = shoppingCart[key];
                total += value.price * value.qty;
                view += `
                <div class="cartItem">
                    <div class="cartQtyTitle">
                        <input type="number" class="cartQty" name="qty" id="${key}" min="1" max="10" size="0" value="${value.qty}">
                        <h3>${value.title}</h3>
                    </div>
                    <div class="cartPrice">
                        <div class="gridPrice">
                            <img src="img/wSymbol.gif" class="symbol" alt="${symbolAlt}">
                            <h4>${formatCurrencyWithCommas(value.price * value.qty)}</h4>
                        </div>
                        <img src="img/delete.svg" class="delete" id="${key}" alt="${deleteAlt}">
                    </div>
                </div>`
            }
            view += `
            <div class="cartTotal">
                    <h3>${totalLabel}</h3>
                    <div class="totalPrice">
                        <img src="img/wSymbol.gif" class="symbol" alt="${symbolAlt}">
                        <h3>${formatCurrencyWithCommas(total)}</h3>
                    </div>
                </div>
            </div>
            
        </section>`;
        }

        return view;
    }
    , after_render: async () => {

        var orderButt = document.querySelector('.orderButt');
        if (Object.keys(shoppingCart).length === 0 && shoppingCart.constructor === Object) {
            var checkoutSection = document.querySelector('.checkoutDetails');
            checkoutSection.classList.add('noItems');
        }
        else {
            orderButt.addEventListener('click', placeOrder, false);
        }

         //cart manipulation
         var qtyInputs = document.querySelectorAll(".cartQty");
         var deleteIcons = document.querySelectorAll(".delete");
 
         for (let input of qtyInputs) {
             input.addEventListener('input', updateQty, false);
         }
         for (let icon of deleteIcons) {
             icon.addEventListener('click', deleteItem, false);
         }

        //add tooltips to gremlins
        tippy('.checkoutEmbedded', {
            content: `<div class="gremTitle">EMBEDDED STRING</div> This string is embedded in the source code. <a href="https://sandbox.lingoport.com/issues/search#issues=AWw_A8mlnik4oCHIT0Vl" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Embedded_Strings" target="_blank">View Details</a>`,
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.checkoutStaticFile', {
            content: '<div class="gremTitle">STATIC FILE</div> This links to a static HTML file. <a href="https://sandbox.lingoport.com/issues/search#issues=AWw_A8mqnik4oCHIT0V1" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Static_Files" target="_blank">View Details</a>',
            theme: 'custom',
            arrow: true,
            interactive: true
        });

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

//handle order placement
var placeOrder = () => {
    let order = new Order(total, new Date());
    saveOrder(order);
    orderHistory.unshift(order);
    //zero out the qty for each item before removing it
    for (let key in shoppingCart) {
        let product = shoppingCart[key];
        product.qty = 0;
        delete shoppingCart[key];
        console.log(shoppingCart);
    }
    saveCart();
    //construct success message
    let message = "Order #" + order.orderNumber + " placed successfully!";
    window.alert(message);
    location.href = "./#/history";
}

let saveOrder = (newOrder) => {
    let orders = [];
    let orderString = [newOrder.orderDate.toString(), newOrder.orderNumber.toString(), newOrder.total.toString()]; //$NON-NLS-L$
    if (localStorage.getItem('orderHistory') === null) {
        //no saved orders
        orders.unshift(orderString);
        console.log(orders);
        localStorage.setItem('orderHistory', JSON.stringify(orders));
    }
    else {
        //save orders, just push the new one and save again
        orders = JSON.parse(localStorage.getItem('orderHistory'));
        orders.unshift(orderString);
        console.log(orders);
        localStorage.setItem('orderHistory', JSON.stringify(orders));
    }
    console.log(orderString);
}
export default Checkout;