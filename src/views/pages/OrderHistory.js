import {orderHistory, formatCurrencyWithCommas} from "../../app.js";

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
                    <div class="grem-container left">
                        <h3>${order.formatDate()}</h3>
                        <a href="https://lingoport.com/webinar-common-i18n-gremlins-and-how-to-squash-them/" target="_blank"><img src="../../img/blue_grem.png" class="gremlin-right gremlin-space small localeMethod show${key} hide-gremlin"></a>
                    </div>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice grem-container left">
                        <img src="../../img/bSymbol.gif" class="symbol" alt="${symbolAlt}">
                        <h3>${formatCurrencyWithCommas(order.total)}</h3>
                        <a href="https://lingoport.com/webinar-common-i18n-gremlins-and-how-to-squash-them/" target="_blank"><img src="../../img/purple_grem.png" class="gremlin-right gremlin-space small format show${key} hide-gremlin"></a>
                    </div>
                    <div class="grem-container left">
                        <h3>${order.status}</h3>
                        <a href="https://lingoport.com/webinar-common-i18n-gremlins-and-how-to-squash-them/" target="_blank"><img src="../../img/orange_grem.png" class="gremlin-right gremlin-space small embedded show${key} hide-gremlin"></a>
                    </div>
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