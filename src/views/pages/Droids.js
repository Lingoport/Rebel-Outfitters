let getDroidsList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`../../content/droids.json`, options)
       const json = await response.json();
       //console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

var droidList;
let curEl;

let Droids = {
    render : async () => {
        droidList = await getDroidsList();
        let view =  /*html*/`
            <section class="browsePage" id="droidBrowse">
                <h1>All Droids</h1>
                <div class="browseGrid" id="droidGrid">
                ${droidList.map(droid => 
                    /*html*/
                    `<article id="${droid.id}">
                        <img src="${droid.imageURL}" class="gridImage">
                        <div class="gridDes">
                            <h3>${droid.title}</h3>
                            <div class="gridPrice">
                                <img src="../../img/bSymbol.svg" class="symbol">
                                <h4>${droid.price}</h4>
                            </div>
                        </div>
                    </article>
                    `
                    ).join('\n ')
                }
                </div>
            </section>
            `   
        return view
    },
    after_render: async () => {

        let grid = document.querySelector("#droidGrid");

        let articles = grid.querySelectorAll("article");

        for(let cur of articles) {
            //console.log(cur);
            cur.addEventListener("click", function() {
                location.href="/#/droids/" + cur.id;
            }, false);
            cur.classList.add("zoom");
        }
    }
        
}

export default Droids;