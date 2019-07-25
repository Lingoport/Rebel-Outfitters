import i18n from "../../services/i18n.js";


class Order {
    constructor(newDate, total) {
        if(newDate == null) {
            this.orderDate = new Date();
        }else {
            this.orderDate = newDate;
        }
        this.orderNumber = Math.floor(Math.random() * (99999999 - 10000000) + 10000);
        this.total = total;
    }

    getDate() {
        return i18n.formatDate(this.orderDate);
    }

}

export {Order};