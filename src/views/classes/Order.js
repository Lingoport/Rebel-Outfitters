class Order {
    constructor(total, newDate, number) {
        if(newDate == null) {
            this.orderDate = new Date();
        }else {
            this.orderDate = newDate;
        }
        if(number == null) {
            this.orderNumber = Math.floor(Math.random() * (99999999 - 10000000) + 10000);
        }
        else {
            this.orderNumber = number;
        }
        
        this.total = total;
    }
    formatDate() {
        var dd = String(this.orderDate.getDate()).padStart(2, '0');
        var mm = String(this.orderDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.orderDate.getFullYear();

        let date = mm + '/' + dd + '/' + yyyy;
        return date;
    }

    //create a dummy "order status" string
    getOrderStatus() {
        //calculate diff
        let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        let now = new Date();
        var diffDays = Math.floor(Math.abs((this.orderDate.getTime() - now.getTime())/(oneDay)));

        if(diffDays < 2) {
            return "Processing";
        }
        if(diffDays < 4) {
            return "Shipped"
        }
        else{
            return "Delivered";
        }
    }

}

export {Order};