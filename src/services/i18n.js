var stringsJSON = {};

const i18n = {

    //load resource json based on locale
    loadStringsJSON : async(locale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`../content/${locale}/strings.json`, options)
            stringsJSON = await response.json();
     
        } catch (err) {
            console.log('Error getting strings', err)
        }
    },

    //load resource json based on locale
    getString : (view, key) => {
        return stringsJSON[view][key];
    }

}

export default i18n;