import {orderHistory} from "../../app.js";
import i18n from "../../services/i18n.js";

//static strings to hold all the text (to be used within the HTML template literal)
let historyTitle = "Order History";
let headings =["Date", "Order Number", "Total", "Status"];
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
                    <h3>${order.formatDate()}</h3>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice">
                        ${i18n.formatCurrency(order.total, "b")}
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