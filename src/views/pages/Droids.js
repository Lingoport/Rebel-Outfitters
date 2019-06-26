import {productList} from "../../app.js";

let Droids = {
    render : async () => {
        let droidMap = productList.get('droids');

        let view =  /*html*/`
            <section class="browsePage" id="droidBrowse">
                <h1>All Droids</h1>
                <div class="browseGrid" id="droidGrid">`;
                droidMap.forEach((droid, key) => {
                    /*html*/
                    view += `<article id="${key}">
                        <img src="${droid.imageURL}" class="gridImage">
                        <div class="gridDes">
                            <h3>${droid.title}</h3>
                            <div class="gridPrice">
                                <img src="../../img/bSymbol.svg" class="symbol">
                                <h4>${droid.price}</h4>
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

        let grid = document.querySelector("#droidGrid");

        let articles = grid.querySelectorAll("article");

        for(let curDroid of articles) {
            //console.log(cur);
            curDroid.addEventListener("click", function() {
                location.href="/#/droids/" + curDroid.id;
            }, false);
            curDroid.classList.add("zoom");
        }
    }
        
}

export { Droids };