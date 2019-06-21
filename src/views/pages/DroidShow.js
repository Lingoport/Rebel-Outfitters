import Utils        from '../../services/Utils.js'

let getDroid = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`../../content/droids.json`, options)
        const json = await response.json();
        //console.log(json);
        return json[id];
    } catch (err) {
        console.log('Error getting documents', err);
    }
}



let DroidShow = {

    render : async () => {
        let request = Utils.parseRequestURL();
        let droid = await getDroid(request.id);

        return /*html*/`
            <section class="productShow">
                <article class="leftDetailPane">
                    <img src="${droid.imageURL}" class="detailImage">
                </article>
                <article class="detailContent">
                    <h1>${droid.title}</h1>
                    <div class="gridPrice">
                        <img src="../../img/bSymbol.svg" class="symbol">
                        <h4>${droid.price}</h4>
                    </div>
                    <div class="qty">
                        <h3>Qty:</h3>
                        <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <button class="addToCart">ADD TO CART</button>
                    <h3>Class: ${droid.class}</h3>
                    <p>${droid.desc}</p>
                </article>
            </section>
        `
    }
    , after_render: async () => {

    }
}

export default DroidShow;