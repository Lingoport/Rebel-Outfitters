import {productList, formatCurrencyWithCommas} from "../../app.js";

let featuredProducts = [];

let getFeaturedProducts = async () => {
    featuredProducts = [];

    let vehicleMap = productList.get('vehicles');
    let droidMap = productList.get('droids');
   
    featuredProducts.push(vehicleMap.get(0));
    featuredProducts.push(droidMap.get(1));
    featuredProducts.push(vehicleMap.get(2));
    featuredProducts.push(droidMap.get(3));
}

let Home = {
    render : async () => {

        await getFeaturedProducts();

        //html markup for welcome messages
        let view = `
                    <section class="welcome">
                        <h1 class="center">Welcome to Rebel Outfitters!</h1>
                        <h3 class="center white">We provide everything you need to take on the Empire (and win).</h3>
                    </section>
                    <div class="browseGrid homeGrid">`;

        //create a box to display each of the 4 featured products
        featuredProducts.forEach((product, key) => {
            view += `
                    <article id="${key}" class="${product.type}">
                        <img src="${product.imageURL}" class="gridImage">
                        <div class="gridDes">
                            <h3>${product.title}</h3>
                            <div class="gridPrice">
                                <img src="../../img/bSymbol.svg" class="symbol">
                                <h4>${formatCurrencyWithCommas(product.price)}</h4>
                            </div>
                        </div>
                    </article>`;
        });
            
        view += "</div>";

        //return generated markup
        return view
    }
    , after_render: async () => {
        let articles = document.querySelectorAll("article");

        //click listener to redirect on product click
        for(let curProduct of articles) {
            curProduct.addEventListener("click", function() {
                location.href=`/#/${curProduct.classList[0]}s/` + curProduct.id;
            }, false);
            curProduct.classList.add("zoom");
        }

    }

}

export default Home;