class Order {
    constructor(newDate, total) {
        this.orderDate = newDate;
        this.orderNumber = Math.floor(Math.random() * (99999999 - 10000000) + 10000);
        this.total = total;
    }
    formatDate(dateLocale) {
        //this needs to be re-worked for i18n
        var dd = String(this.orderDate.getDate()).padStart(2, '0');
        var mm = String(this.orderDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.orderDate.getFullYear();

        let date = mm + '/' + dd + '/' + yyyy;
        return date;
    }
    calcStatus(statusLocale) {
        //this function needs to be used to get return order status
    }

}

export {Order};