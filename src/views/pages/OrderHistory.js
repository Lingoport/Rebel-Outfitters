import {shoppingCart, orderHistory, formatCurrencyWithCommas} from "../../app.js";

let OrderHistory = {

    render: async () => {

        let view = `
        <section class="orderHistory">
            <h1>Order History</h1>
            <div class="headings">
                <h3>Date</h3>
                <h3>Order Number</h3>
                <h3>Total</h3>
                <h3>Status</h3>
            </div>`;
            
            orderHistory.forEach((order, key) => {
                view += `
                <article class="orderItem">
                    <h3>${order.formatDate()}</h3>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice">
                        <img src="../../img/bSymbol.svg" class="symbol">
                        <h3>${formatCurrencyWithCommas(order.total)}</h3>
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

export default OrderHistory;