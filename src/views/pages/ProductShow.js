import Utils        from '../../services/Utils.js';
import {productList, addToCart, formatCurrencyWithCommas} from '../../app.js';




var getQtyandAddToCart = () => {
     //get the qty and modify selected item
     let qtySel = document.querySelector(".qtyDrop");
     let qty = parseInt(qtySel.options[qtySel.selectedIndex].value)
     product.qty += qty;
     //pass item to cart
     addToCart(product);

}

export default ProductShow;
