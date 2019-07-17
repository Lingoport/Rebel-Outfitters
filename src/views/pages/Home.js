import {formatCurrencyWithCommas, featuredProducts} from "../../app.js";
import i18n from "../../services/i18n.js";

let Home = {
    render : async () => {
        //fetch locale-sensitive strings via i18n method
        let welcomeMessage = i18n.getString("Home", "welcomeMessage");
        let welcomeSubtitle = i18n.getString("Home", "welcomeSubtitle");
        let symbolAlt = i18n.getString("Home", "symbolAlt");

        //view is solely for HTML markup, contains no static text
        let view = `
                    <section class="welcome">
                        <h1 class="center">${welcomeMessage}</h1>
                        <h3 class="center white">${welcomeSubtitle}</h3>
                    </section>
                    <div class="browseGrid homeGrid">`;

        //create a box to display each of the 4 featured products
        featuredProducts.forEach((product, key) => {

            //string to give image an alt tag for accessibility
            let imageAlt = product.title + "image";

            view += `
                    <article id="${key}" class="${product.type}">
                        <img src="${product.imageURL}" class="gridImage" alt="${imageAlt}">
                        <div class="gridDes">
                            <h3>${product.title}</h3>
                            <div class="gridPrice">
                                <img src="../../img/bSymbol.svg" class="symbol" alt="${symbolAlt}">
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