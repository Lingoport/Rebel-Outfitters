// --------------------------------
//  Define Data Sources
// --------------------------------

let Home = {
    render : async () => {

        let view =  /*html*/`
            <section class="welcome">
                <h1 class="center">Welcome to Rebel Outfitters!</h1>
                <h3 class="center white">We can provide everything you need to take on the Empire (and win).</h3>
            </section>
            <div class="browseGrid">
                <article>
                </article>
                <article>
                </article>
                <article>
                </article>
                <article>
                </article>
            </div>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Home;