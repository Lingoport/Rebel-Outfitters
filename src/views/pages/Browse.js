import Utils from '../../services/Utils.js'
import {productList, formatCurrencyWithCommas} from "../../app.js";

let type;

//static string to hold all the text (to be used within the HTML template literal)
let title = "All";
let symbolAlt = "Imperial Credit currency symbol";

let Browse = {
    
    render : async () => {
        let request = Utils.parseRequestURL();
        type = request.resource;

        let productMap = null;

        title = "All";

        if(type == "droids") {
            productMap = productList.get('droids');
            title += " Droids";
        }
        else if(type == "vehicles") {
            productMap = productList.get('vehicles');
            title += " Vehicles";
        }

        //view is solely for HTML markup, contains no static text
        let view = `<section class="browsePage">
                        <div class="grem-container left">
                            <h1>${title}</h1>
                            <img src="../../img/red_grem.png" class="gremlin-right gremlin-space concat">
                        </div>
                        <div class="browseGrid">`;

        productMap.forEach((product, key) => {
            //create box for each product
            view += `<article id="${key}">
                        <img src="${product.imageURL}" class="gridImage" alt="${product.title}">
                        <div class="gridDes">
                            <div class="grem-container">
                                <h3>${product.title}</h3>
                                <img src="../../img/orange_grem.png" class="gremlin-right small embedded show${key} hide-gremlin">
                            </div>
                            <div class="gridPrice grem-container">
                                <img src="../../img/bSymbol.svg" class="symbol" alt="${symbolAlt}">
                                <h4>${formatCurrencyWithCommas(product.price)}</h4>
                                <img src="../../img/purple_grem.png" class="gremlin-right small format show${key} hide-gremlin">
                            </div>
                        </div>
                    </article>`;
        });
                view += `
                </div>
            </section>
            `;   
        return view;
    },
    after_render: async () => {

        let grid = document.querySelector(".browseGrid");

        let articles = grid.querySelectorAll("article");

        //click listener to redirect on product click
        for(let curProduct of articles) {
            curProduct.addEventListener("click", function() {
                location.href=`/#/${type}/` + curProduct.id;
            }, false);
            curProduct.classList.add("zoom");
        }
    } 
}

export { Browse };