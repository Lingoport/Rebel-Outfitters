import {formatCurrencyWithCommas, featuredProducts} from "../../app.js";



//static strings to hold all the text (to be used within the HTML template literal)
let welcomeMessage = "Welcome to Rebel Outfitters!";
let welcomeSubtitle = "We provide everything you need to take on the Empire (and win)."
let symbolAlt = "Imperial Credit currency symbol";

let Home = {
    render : async () => {

        //view is solely for HTML markup, contains no static text
        let view = `
                    <section class="welcome grem-container">
                        <h1 class="center">${welcomeMessage}</h1>
                        <h3 class="center white">${welcomeSubtitle}</h3>
                        <a href="https://wiki.lingoport.com/Gremlins#Embedded_Strings" target="_blank"><img src="img/orange_grem.png" class="gremlin-right embedded"></a>
                    </section>
                    <div class="browseGrid homeGrid">`;

        //create a box to display each of the 4 featured products
        featuredProducts.forEach((product, key) => {

            //string to give image an alt tag for accessibility
            let imageAlt = product.title + " image";

            view += `
                    <article id="${key}" class="${product.type}">
                        <img src="${product.imageURL}" class="gridImage" alt="${imageAlt}">
                        <div class="gridDes">
                            <h3>${product.title}</h3>
                            <div class="gridPrice grem-container">
                                <img src="img/bSymbol.gif" class="symbol" alt="${symbolAlt}">
                                <h4>${formatCurrencyWithCommas(product.price)}</h4>
                                <a href="https://wiki.lingoport.com/Gremlins#Currency_Format" target="_blank"><img src="img/purple_grem.png" class="gremLink gremlin-right small format show${key} hide-gremlin"></a>
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
            curProduct.addEventListener("click", viewProduct.bind(null, curProduct.classList[0], curProduct.id), false);
        }
    }
}

//function to show product clickedby user (unless they clicked the gremlin link)
var viewProduct = (type, id, e) => {
    //console.log(e);
    if(e.srcElement.classList[0] != "gremLink") {
        location.href=`./#/${type}s/` + id;
    }
}


export default Home;