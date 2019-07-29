import i18n from "../../services/i18n.js";


class Order {
    constructor(total, newDate) {
        if(newDate == null) {
            this.orderDate = new Date(); //$NON-NLS-L$
        }else {
            this.orderDate = newDate;
        }
        this.orderNumber = Math.floor(Math.random() * (99999999 - 10000000) + 10000);
        this.total = total;
    }

    getOrderDate() {
        return i18n.formatDate(this.orderDate);
    }

    //create a dummy "order status" string
    getOrderStatus() {
        //calculate diff
        let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        let now = new Date();
        var diffDays = Math.floor(Math.abs((this.orderDate.getTime() - now.getTime())/(oneDay)));

        console.log(diffDays);

        if(diffDays < 2) {
            return i18n.getString('Order', 'statusProcessing');
        }
        if(diffDays < 4) {
            return i18n.getString('Order', 'statusShipped');
        }
        else{
            return i18n.getString('Order', 'statusDelivered');
        }
    }

}

export {Order};