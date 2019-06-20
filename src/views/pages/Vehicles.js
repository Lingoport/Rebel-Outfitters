let Register = {

    render: async () => {
        return /*html*/ `
            <section>
                <h1>All Vehicles</h1>
            </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {

    }
}

export default Register;