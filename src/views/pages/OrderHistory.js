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
                    <h3>${order.total}</h3>
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