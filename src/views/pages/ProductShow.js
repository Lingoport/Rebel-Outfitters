import Utils        from '../../services/Utils.js';
import {productList, addToCart} from '../../app.js';

let product;
let productID;
let type;

let ProductShow = {

    render : async () => {
        //get the id
        let request = Utils.parseRequestURL();
        productID = parseInt(request.id);
        type = request.resource;
        //get a reference to the correct porduct Map based on type
        let productMap = productList.get(type);
        //get the correct product from the product Map based on ID and type
        product = productMap.get(productID);
        console.log(product);
        //droid = droidView;
        return /*html*/`
            <section class="productShow">
                <article class="leftDetailPane">
                    <img src="${product.imageURL}" class="detailImage">
                </article>
                <article class="detailContent">
                    <h1>${product.title}</h1>
                    <div class="gridPrice">
                        <img src="../../img/bSymbol.svg" class="symbol">
                        <h4>${commas(product.price)}</h4>
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
                    <p>${product.desc}</p>
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
     product.qty += qty;
     console.log(`adding product with droid.qty: ${product.qty} and qty: ${qty}`);
     //pass item to cart
     addToCart(product);

}

var commas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default ProductShow;