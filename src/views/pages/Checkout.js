import {shoppingCart, orderHistory} from "../../app.js";

//neet to add click listeners for updating qty or deleting items from cart

class Order {
    constructor(total) {
        this.orderDate = new Date();
        this.orderNumber = Math.floor(Math.random() * (99999999 - 10000000) + 10000);
        this.total = total;
        this.status = "Processing";
    }
    formatDate() {
        var dd = String(this.orderDate.getDate()).padStart(2, '0');
        var mm = String(this.orderDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.orderDate.getFullYear();

        let date = mm + '/' + dd + '/' + yyyy;
        return date;
    }

}

var total;

let Checkout = {

    render: async () => {
        total = 0;
        //hide cart initially
        let slider = document.querySelector(".cartSlider")
        slider.classList.remove('showCart');
        let overlayBG = document.querySelector('.bg');
        overlayBG.classList.remove('overlay');

        let view = `
        <section class="checkout">
            
            <div class="checkoutDetails">
                <h1>Checkout</h1>
                <div class="shippingInfo">
                    <h2>Shipping Info</h2>
                    <div class="form">
                        <div class="formInline">
                            <div class="formElement name">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" class="checkoutInput" placeholder="Luke">
                            </div>
                            <div class="formElement name">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" class="checkoutInput" placeholder="Skywalker">
                            </div>
                        </div>

                        <div class="formInline">
                            <div class="formElement">
                                <label for="coordinates">Coordinates</label>
                                <input type="text" id="coordinates" name="coordinates" class="checkoutInput" placeholder="0,0,0">
                            </div>
                            <div class="formElement">
                                <label for="sector">Sector</label>
                                <input type="text" id="sector" name="sector" class="checkoutInput" placeholder="Core">
                            </div>
                        </div>
                        
                        <div class="formElement">
                            <label for="shipMethod">Shipping Method</label>
                            <select id="shipMethod" class="checkoutInput">
                                <option value="lightspeed">Lightspeed</option>
                                <option value="overnight">Overnight</option>
                                <option value="standard">Standard</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="paymentInfo">
                    <h2>Payment</h2>
                    <div class="form">
                        <div class="formElement halfWidth">
                            <label for="cardName">Name on Card</label>
                            <input type="text" id="carName" name="cardName" class="checkoutInput" placeholder="Luke Skywalker">
                        </div>
                        
                        <div class="formInline">
                            <div class="formElement">
                                <label for="account">Imperial Credit Number</label>
                                <input type="text" id="account" name="account" class="checkoutInput" placeholder="1234567-9876-00">
                            </div>
                            <div class="formElement margin">
                                <label for="code">Security Code</label>
                                <input type="text" id="code" name="code" class="checkoutInput" placeholder="1234">
                            </div>
                            <div class="formElement">
                                <label for="expDate">Expiration Date</label>
                                <input type="date" id="expDate" name=expDate" class="checkoutInput">
                            </div>
                        </div>
                    </div>
                </div>
                <button class="orderButt">PLACE ORDER</button>
            </div>
            <div class="checkoutCart">
                <h1>Shopping Cart</h1>
            `
            shoppingCart.forEach((value, key) => {
                // html
                total += value.price * value.qty;
                view += `
                <div class="cartItem">
                    <div class="cartQtyTitle">
                        <input type="number" class="cartQty" name="qty" id="${key}" min="1" max="10" size="0" value="${value.qty}">
                        <h3> x ${value.title}</h3>
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
            <div class="cartTotal">
                    <h3>Total: </h3>
                    <div class="totalPrice">
                        <img src="../../img/wSymbol.svg" class="symbol">
                        <h3>${commas(total)}</h3>
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

var placeOrder = () => {
    let order = new Order(total);
    orderHistory.push(order);
    location.href="/#/history";
}

var commas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Checkout;