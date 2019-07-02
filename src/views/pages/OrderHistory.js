import {shoppingCart, orderHistory} from "../../app.js";

let OrderHistory = {

    render: async () => {

        let view = `
        <section class="orderHistory">
            <h1>Order History</h1>`;
            orderHistory.forEach((order, key) => {
                view += `
                <article class="orderItem">
                    <h3>${order.formatDate()}</h3>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice">
                        <img src="../../img/bSymbol.svg" class="symbol">
                        <h3>${numberWithCommas(order.total)}</h3>
                    </div>
                    <h3>${order.status}</h3>
                </article>`
            });
            view += `
        </section>`;

        return view;
    }
    , after_render: async () => {

    }
}

var numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default OrderHistory;