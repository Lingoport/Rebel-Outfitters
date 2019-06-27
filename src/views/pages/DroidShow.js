import Utils        from '../../services/Utils.js';
import {productList, addToCart} from '../../app.js';

let droid;
let droidID;

let ProductShow = {

    render : async () => {
        //get the id
        let request = Utils.parseRequestURL();
        droidID = parseInt(request.id);
        //get a reference to the droids Map
        let droidMap = productList.get('droids');
        //get the droid from the droid Map based on ID
        droid = droidMap.get(droidID);
        console.log(droid);
        //droid = droidView;
        return /*html*/`
            <section class="productShow">
                <article class="leftDetailPane">
                    <img src="${droid.imageURL}" class="detailImage">
                </article>
                <article class="detailContent">
                    <h1>${droid.title}</h1>
                    <div class="gridPrice">
                        <img src="../../img/bSymbol.svg" class="symbol">
                        <h4>${droid.price}</h4>
                    </div>
                    <div class="qty">
                        <h3>Qty:</h3>
                        <select class="qtyDrop checkoutInput">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <button class="addToCart">ADD TO CART</button>
                    <p>${droid.desc}</p>
                </article>
            </section>
        `
    }
    , after_render: async () => {
        const addButt = document.querySelector(".addToCart");

        //there's a bug where adding same item with different
        addButt.addEventListener("click", getQtyandAddToCart, false); //add callback for success message or something?s
    }
}

var getQtyandAddToCart = () => {
     //get the qty and modify selected item
     let qtySel = document.querySelector(".qtyDrop");
     let qty = parseInt(qtySel.options[qtySel.selectedIndex].value)
     droid.qty += qty;
     console.log(`adding droid with droid.qty: ${droid.qty} and qty: ${qty}`);
     //pass item to cart
     addToCart(droid);

}


export default ProductShow;