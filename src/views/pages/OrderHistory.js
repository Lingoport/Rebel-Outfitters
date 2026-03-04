import {orderHistory} from "../../app.js";
import i18n from "../../services/i18n.js";

let symbolAlt = "Imperial Credit Currency symbol";

let OrderHistory = {

    render: async () => {
        const historyTitle = await i18n.t('orderHistory.title', 'Order History');
        const headings = [
            await i18n.t('orderHistory.columns.0', 'Date'),
            await i18n.t('orderHistory.columns.1', 'Order Number'),
            await i18n.t('orderHistory.columns.2', 'Total'),
            await i18n.t('orderHistory.columns.3', 'Status'),
        ];

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
                    <h3>${i18n.formatDate(order.orderDate)}</h3>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice">
                        <img src="../../img/bSymbol.svg" class="symbol" alt="${symbolAlt}">
                        <h3>${i18n.formatCurrency(order.total)}</h3>
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
