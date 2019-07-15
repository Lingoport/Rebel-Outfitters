let errorMessage = "404 Error: Page not found";

let Error404 = {
    render : async () => {
        let view = `<section class="section">
                        <h1>${errorMessage}</h1>
                    </section>`;
        return view;
    }
    , after_render: async () => {
    }
}
export default Error404;