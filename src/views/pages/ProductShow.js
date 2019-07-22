import Utils        from '../../services/Utils.js';
import {productList, addToCart, formatCurrencyWithCommas} from '../../app.js';

let product;
let productID;
let type;

//static strings to hold all the text (to be used within the HTML template literal)
let qtyLabel = "Qty:";
let qtyOptions = [1, 2, 3, 4];
let symbolAlt = "Imperial Credit Currency symbol";
let addToCartLabel = "ADD TO CART";

let ProductShow = {

    render : async () => {

        //get the id
        let request = Utils.parseRequestURL();
        productID = parseInt(request.id);
        type = request.resource;
        //get a reference to the correct product Map based on type
        let productMap = productList.get(type);
        //get the correct product from the product Map based on ID and type
        product = productMap.get(productID);

        //return HTML markup
        return `
            <section class="productShow">
                <article class="leftDetailPane">
                    <img src="${product.imageURL}" class="detailImage">
                </article>
                <article class="detailContent">
                    <div class="grem-container left">
                        <h1>${product.title}</h1>
                        <a href="https://lingoport.com/webinar-common-i18n-gremlins-and-how-to-squash-them/" target="_blank"><img src="../../img/orange_grem.png" class="gremlin-right embedded gremlin-space"></a>
                    </div>
                    <div class="gridPrice grem-container left">
                        <img src="../../img/bSymbol.svg" class="symbol" alt="${symbolAlt}">
                        <h4>${formatCurrencyWithCommas(product.price)}</h4>
                        <a href="https://lingoport.com/webinar-common-i18n-gremlins-and-how-to-squash-them/" target="_blank"><img src="../../img/purple_grem.png" class="gremlin-right small format gremlin space"></a>
                    </div>
                    <div class="qty">
                        <h3>${qtyLabel}</h3>
                        <select class="qtyDrop checkoutInput">
                            <option value="${qtyOptions[0]}">${qtyOptions[0]}</option>
                            <option value="${qtyOptions[1]}">${qtyOptions[1]}</option>
                            <option value="${qtyOptions[2]}">${qtyOptions[2]}</option>
                            <option value="${qtyOptions[3]}">${qtyOptions[3]}</option>
                        </select>
                    </div>
                    <button class="addToCart">${addToCartLabel}</button>
                    <p>${product.desc}</p>
                </article>
            </section>
        `
    }
    , after_render: async () => {
        const addButt = document.querySelector(".addToCart");

        //there's a bug where adding same item with different
        addButt.addEventListener("click", getQtyandAddToCart, false);
    }
}

var getQtyandAddToCart = () => {
     //get the qty and modify selected item
     let qtySel = document.querySelector(".qtyDrop");
     let qty = parseInt(qtySel.options[qtySel.selectedIndex].value)
     product.qty += qty;
     //pass item to cart
     addToCart(product);

}

export default ProductShow;