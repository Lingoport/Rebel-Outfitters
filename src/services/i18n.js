import { locale } from '../app.js';

var stringsJSON = {};

const i18n = {

    //load resource json based on locale
    loadStringsJSON: async (newLocale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`./content/${newLocale}/strings.json`, options)
            stringsJSON = await response.json();

        } catch (err) {
            console.log('Error getting strings', err)
        }
    },

    //load resource json based on locale
    getString: (view, key) => {
        return stringsJSON[view][key];
    },

    //determine the proper currency formate based on locale and return html string
    formatCurrency: (price, color) => {
        let formatted;

        //format in imperial credit with symbol if locale is YODA or SITH
        if (locale == 'yo' || locale == 'si') {
            let symbolAlt = i18n.getString("Home", "symbolAlt");
            formatted = new Intl.NumberFormat('en-US').format(price); //$NON-NLS-L$ 

            //return the formatted currency within template literal
            return `<img src="img/${color}Symbol.svg" class="symbol" alt="${symbolAlt}">
            <h4>${formatted}</h4>`;
        }
        //psuedo locale
        else if(locale == 'eo' || locale == 'ia') {
            return `<h4>&#8375;${convertCurrency(price)}</h4>`
        }
        //format using actual symbol and conventions if it's a real locale
        else {
            let converted = convertCurrency(price);
            formatted = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyMap[locale] }).format(converted); //$NON-NLS-L$ 
            //return the formatted currency within template literal
            return `<h4>${formatted}</h4>`
        }

    },
    //return the locale based link to html file within the 'static' folder
    getHTML: () => {
        return `${locale}/terms.html`; //$NON-NLS-L$ 
    },
    //format date accoring to locale
    formatDate: (date) => {
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat([locale, 'en-US'], options).format(date); //$NON-NLS-L$
    }
}

//used to determine the correct currency symbol
var currencyMap = {
    'en-US': 'USD',
    'fr-FR': 'EUR',
    'zh-CN': 'CNY',
    'es-SP': 'EUR',
    'de-DE': 'EUR',
    'ja-JP': 'JPY',
    'no-NO': 'NOK'
};

//function to perform rough conversion from galactic credits to real currencies
var convertCurrency = (price) => {
    switch (locale) {
        case 'en-US':
            return price * 0.62;
        case 'fr-FR':
            return price * 0.55;
        case 'zh-CN':
            return price * 4.27;
        default:
            return price;
    }
}

export default i18n;
