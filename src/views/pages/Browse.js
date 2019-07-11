import Utils from '../../services/Utils.js'
import {productList, formatCurrencyWithCommas} from "../../app.js";

let type;
let title;

let Browse = {
    
    render : async () => {
        let request = Utils.parseRequestURL();
        type = request.resource;

        let productMap = null;

        if(type == "droids") {
            productMap = productList.get('droids');
            title = "Droids";
        }
        else if(type == "vehicles") {
            productMap = productList.get('vehicles');
            title = "Vehicles";
        }

        let view =  /*html*/`
            <section class="browsePage">
                <h1>All ${title}</h1>
                <div class="browseGrid">`;
                productMap.forEach((product, key) => {
                    /*html*/
                    view += `<article id="${key}">
                        <img src="${product.imageURL}" class="gridImage">
                        <div class="gridDes">
                            <h3>${product.title}</h3>
                            <div class="gridPrice">
                                <img src="../../img/bSymbol.svg" class="symbol">
                                <h4>${formatCurrencyWithCommas(product.price)}</h4>
                            </div>
                        </div>
                    </article>
                    `;
                    
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