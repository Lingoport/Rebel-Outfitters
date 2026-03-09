import { shoppingCart, saveCart, orderHistory, formatCurrencyWithCommas, router } from "../../app.js";

im
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

//static strings to hold all the text (to be used within the HTML template literal)
let historyTitle = "Order History";
let headings = ["Date", "Order Number", "Total", "Status"];
let symbolAlt = "Imperial Credit Currency symbol";

let OrderHistory = {

    render: async () => {

        //view is solely for HTML markup, contains no static text
        let view = `
        <section class="orderHistory">
            <h1>${historyTitle}</h1>
            <div class="headings">
                <h3>${headings[0]}</h3>
                <h3>${headings[1]}</h3>
                <h3>${headings[2]}</h3>
                <h3>${headings[3]}</h3>
            </div>`;

        orderHistory.forEach((order, key) => {
            view += `
                <article class="orderItem">
                    <div class="grem-container left">
                        <h3>${order.formatDate()}</h3>
                        <img src="img/teal_grem.png" class="gremlin-right gremlin-space small orderHistoryLocaleMethod orderShow${key} hide-gremlin">
                    </div>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice grem-container left">
                        <img src="img/bSymbol.gif" class="symbol" alt="${symbolAlt}">
                        <h3>${formatCurrencyWithCommas(order.total)}</h3>
                        <img src="img/teal_grem.png" class="gremlin-right gremlin-space small orderHistoryFormat orderShow${key} hide-gremlin">
                    </div>
                    <div class="grem-container left">
                        <h3>${order.getOrderStatus()}</h3>
                        <img src="img/orange_grem.png" class="gremlin-right gremlin-space small orderHistoryEmbedded orderShow${key} hide-gremlin">
                    </div>
                </article>`
        });
        view += `
        </section>`;

        return view;
    }
    , after_render: async () => {

        //add gremlin tooltips
        tippy('.orderHistoryLocaleMethod', {
            content: '<div class="gremTitle">DATE/TIME FORMAT</div> The formatting for this date is hard-coded. <a href="https://github.com/Lingoport/Rebel-Outfitters/blob/DarkSide/src/views/classes/Order.js#L18" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Locale_Sensitive_Method_-_e.g._Date.2FTime_Format" target="_blank">View Details</a>',
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.orderHistoryFormat', {
            content: '<div class="gremTitle">CURRENCY FORMAT</div> The formatting for this currency is hard-coded. <a href="https://github.com/Lingoport/Rebel-Outfitters/blob/DarkSide/src/app.js#L143" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Locale_Sensitive_Method_-_e.g._Currency_Format" target="_blank">View Details</a>',
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.orderHistoryEmbedded', {
            content: `<div class="gremTitle">EMBEDDED STRING</div> This string is embedded in the source code. <a href="https://github.com/Lingoport/Rebel-Outfitters/blob/DarkSide/src/views/classes/Order.js#L40" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Embedded_Strings" target="_blank">View Details</a>`,
            theme: 'custom',
            arrow: true,
            interactive: true
        });

    }
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
            content: `<div class="gremTitle">EMBEDDED STRING</div> This string is embedded in the source code. <a href="https://github.com/Lingoport/Rebel-Outfitters/blob/DarkSide/src/views/pages/Checkout.js#L17" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Embedded_Strings" target="_blank">View Details</a>`,
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.checkoutStaticFile', {
            content: '<div class="gremTitle">STATIC FILE</div> This links to a static HTML file. <a href="https://github.com/Lingoport/Rebel-Outfitters/blob/DarkSide/src/views/pages/Checkout.js#L114" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Static_Files" target="_blank">View Details</a>',
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
