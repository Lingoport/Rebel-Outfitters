import { orderHistory, formatCurrencyWithCommas } from "../../app.js";

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
                        <img src="img/blue_grem.png" class="gremlin-right gremlin-space small orderHistoryLocaleMethod orderShow${key} hide-gremlin">
                    </div>
                    <h3>${order.orderNumber}</h3>
                    <div class="gridPrice grem-container left">
                        <img src="img/bSymbol.gif" class="symbol" alt="${symbolAlt}">
                        <h3>${formatCurrencyWithCommas(order.total)}</h3>
                        <img src="img/purple_grem.png" class="gremlin-right gremlin-space small orderHistoryFormat orderShow${key} hide-gremlin">
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
            content: '<div class="gremTitle">DATE/TIME FORMAT</div> The formatting for this date is hard-coded. <a href="https://sandbox.lingoport.com/issues/search#issues=AWw_A8lWnik4oCHIT0Uy" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Date.2FTime_Format" target="_blank">View Details</a>',
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.orderHistoryFormat', {
            content: '<div class="gremTitle">CURRENCY FORMAT</div> The formatting for this currency is hard-coded. <a href="https://sandbox.lingoport.com/issues/search#issues=AWw_A8jrnik4oCHIT0UH" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Currency_Format" target="_blank">View Details</a>',
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.orderHistoryEmbedded', {
            content: `<div class="gremTitle">EMBEDDED STRING</div> This string is embedded in the source code. <a href="https://sandbox.lingoport.com/issues/search#issues=AWw_A8jnnik4oCHIT0T8" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Embedded_Strings" target="_blank">View Details</a>`,
            theme: 'custom',
            arrow: true,
            interactive: true
        });

    }
}

export default OrderHistory;