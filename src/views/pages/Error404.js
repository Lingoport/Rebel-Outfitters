let errorMessage = "404 Error: Page not found";

let Error404 = {
    render : async () => {
        let view = `<div>
                        <h1>${errorMessage}</h1>
                    </div>`;
        return view;
    }
    , after_render: async () => {
    }
}
export default Error404;