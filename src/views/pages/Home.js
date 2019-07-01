import {productList} from "../../app.js";

let featuredProducts = [];

let getFeaturedProducts = async () => {
    featuredProducts = [];
    let vehicleMap = productList.get('vehicles');
    let randVehicle =  Math.floor(Math.random() * (vehicleMap.size - 1));

    let droidMap = productList.get('droids');
    let randDroid =  Math.floor(Math.random() * (droidMap.size - 1));

    featuredProducts.push(vehicleMap.get(randVehicle));
    featuredProducts.push(droidMap.get(randDroid));
    featuredProducts.push(vehicleMap.get(randVehicle + 1));
    featuredProducts.push(droidMap.get(randDroid + 1));

    console.log(randVehicle, randDroid);

    console.log(featuredProducts);
}

let Home = {
    render : async () => {

        await getFeaturedProducts();

        let view =  /*html*/`
            <section class="welcome">
                <h1 class="center">Welcome to Rebel Outfitters!</h1>
                <h3 class="center white">We provide everything you need to take on the Empire (and win).</h3>
            </section>
            <div class="browseGrid homeGrid">`;
            featuredProducts.forEach((product, key) => {
                view += `<article id="${key}" class="${product.type}">
                <img src="${product.imageURL}" class="gridImage">
                <div class="gridDes">
                    <h3>${product.title}</h3>
                    <div class="gridPrice">
                        <img src="../../img/bSymbol.svg" class="symbol">
                        <h4>${numberWithCommas(product.price)}</h4>
                    </div>
                </div>
            </article>
            `;
            });
            
            view += `
            </div>
        `;
        return view
    }
    , after_render: async () => {
        let articles = document.querySelectorAll("article");

        //click listener to redirect on product click
        for(let curProduct of articles) {
            //console.log(cur);
            curProduct.addEventListener("click", function() {
                location.href=`/#/${curProduct.classList[0]}s/` + curProduct.id;
            }, false);
            curProduct.classList.add("zoom");
        }

    }

}

var numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Home;