import i18n from '../../services/i18n.js';

let Error404 = {
    render : async () => {
        let errorMessage = i18n.getString("Error404", "errorMessage");
        let view = `<div>
                        <h1>${errorMessage}</h1>
                    </div>`;
        return view;
    }
    , after_render: async () => {
    }
}
export default Error404;