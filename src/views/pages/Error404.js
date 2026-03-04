import i18n from "../../services/i18n.js";

let Error404 = {
    render : async () => {
        const errorMessage = await i18n.t('error404.message', '404 Error: Page not found');
        let view = `<div>
                        <h1>${errorMessage}</h1>
                    </div>`;
        return view;
    }
    , after_render: async () => {
    }
}
export default Error404;
