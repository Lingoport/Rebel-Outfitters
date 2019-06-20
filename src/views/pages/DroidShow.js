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
        console.log(json);
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
            <section>
                <h1> Droid: ${droid.title}</h1>
            </section>
        `
    }
    , after_render: async () => {

    }
}

export default DroidShow;