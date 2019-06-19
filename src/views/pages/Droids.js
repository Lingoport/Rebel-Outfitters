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
       console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let About = {
    render : async () => {
        let droids = await getDroidsList();
        let view =  /*html*/`
            <section class="browsePage" id="droidBrowse">
                <h1>All Droids</h1>
                <div class="browseGrid" id="droidGrid">
                ${droids.map(droid => 
                    /*html*/
                    `<article>
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
    after_render: async () => {}
        
}

export default About;