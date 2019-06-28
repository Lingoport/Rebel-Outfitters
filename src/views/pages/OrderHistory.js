import {shoppingCart, orderHistory} from "../../app.js";

let OrderHistory = {

    render: async () => {

        let view = `
        <section class="orderHistory">
            <h1>Order History</h1>
        </section>`

        return view;
    }
    , after_render: async () => {

    }
}

export default OrderHistory;