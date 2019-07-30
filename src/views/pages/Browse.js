import Utils from '../../services/Utils.js'
import {productList, formatCurrencyWithCommas} from "../../app.js";

let type;

//static string to hold all the text (to be used within the HTML template literal)
let title;
let symbolAlt = "Imperial Credit currency symbol";
let gremConcatDashLink;
let gremEmbedDashLink;

let Browse = {
    
    render : async () => {
        let request = Utils.parseRequestURL();
        type = request.resource;

        let productMap = null;

        title = "All";

        if(type == "droids") {
            productMap = productList.get('droids');
            title += " Droids";
            gremConcatDashLink = 'https://sandbox.lingoport.com/issues/search#issues=AWw_A8mdnik4oCHIT0VY';
            gremEmbedDashLink = 'https://sandbox.lingoport.com/issues/search#issues=AWw_A8kInik4oCHIT0UL';
        }
        else if(type == "vehicles") {
            productMap = productList.get('vehicles');
            title += " Vehicles";
            gremConcatDashLink = 'https://sandbox.lingoport.com/issues/search#issues=AWw_A8mdnik4oCHIT0VZ';
            gremEmbedDashLink = 'https://sandbox.lingoport.com/issues/search#issues=AWw_A8kKnik4oCHIT0US';
        }

        //view is solely for HTML markup, contains no static text
        let view = `<section class="browsePage">
                        <div class="grem-container left">
                            <h1>${title}</h1>
                            <img src="img/red_grem.png" class="gremlin-right gremlin-space browseConcat">
                        </div>
                        <div class="browseGrid">`;

        productMap.forEach((product, key) => {
            //create box for each product
            view += `<article id="${key}">
                        <img src="${product.imageURL}" class="gridImage" alt="${product.title}">
                        <div class="gridDes">
                            <div class="grem-container">
                                <h3>${product.title}</h3>
                                <img src="img/orange_grem.png" class="gremLink gremlin-right small browseEmbedded show${key} hide-gremlin">
                            </div>
                            <div class="gridPrice grem-container">
                                <img src="img/bSymbol.gif" class="symbol" alt="${symbolAlt}">
                                <h4>${formatCurrencyWithCommas(product.price)}</h4>
                                <img src="img/purple_grem.png" class="gremLink gremlin-right small browseFormat show${key} hide-gremlin">
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
            curProduct.addEventListener("click", viewProduct.bind(null, type, curProduct.id), false);
            curProduct.classList.add("zoom");
        }

        //add tooltips to gremlins
        tippy('.browseConcat', {
            content: `<div class="gremTitle">CONCATENATION</div> This content was created using Javascript string concatenation. <a href="${gremConcatDashLink}" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Concatenations" target="_blank">View Details</a>`,
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.browseEmbedded', {
            content: `<div class="gremTitle">EMBEDDED STRING</div> This string is embedded in the source code. <a href="${gremEmbedDashLink}" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Embedded_Strings" target="_blank">View Details</a>`,
            theme: 'custom',
            arrow: true,
            interactive: true
        });

        tippy('.browseFormat', {
            content: '<div class="gremTitle">CURRENCY FORMAT</div> The formatting for this currency is hard-coded. <a href="https://sandbox.lingoport.com/issues/search#issues=AWw_A8jrnik4oCHIT0UH" target="_blank">View Source</a> <a href="https://wiki.lingoport.com/Gremlins#Currency_Format" target="_blank">View Details</a>',
            theme: 'custom',
            arrow: true,
            interactive: true
        });
    } 
}

//function to show product clickedby user (unless they clicked the gremlin link)
var viewProduct = (type, id, e) => {
    //console.log(e);
    if(e.srcElement.classList[0] != "gremLink") {
        location.href=`./#/${type}/` + id;
    }
}

export { Browse };