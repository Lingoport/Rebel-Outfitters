import Utils from '../../services/Utils.js'
import {productList, formatCurrencyWithCommas} from "../../app.js";

let type;

//static string to hold all the text (to be used within the HTML template literal)

let symbolAlt = "Imperial Credit currency symbol";

let Browse = {
    
    render : async () => {
        let request = Utils.parseRequestURL();
        type = request.resource;

        let productMap = null;
        let title = "All";

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
                        <h1>${title}</h1>
                        <div class="browseGrid">`;

        productMap.forEach((product, key) => {
            //create box for each product
            view += `<article id="${key}">
                        <img src="${product.imageURL}" class="gridImage" alt="${product.title}">
                        <div class="gridDes">
                            <h3>${product.title}</h3>
                            <div class="gridPrice">
                                <img src="../../img/bSymbol.svg" class="symbol" alt="${symbolAlt}">
                                <h4>${formatCurrencyWithCommas(product.price)}</h4>
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