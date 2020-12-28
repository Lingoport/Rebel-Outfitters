import { locale, updateLocale } from "../../app.js";
import i18n from '../../services/i18n.js';
import Utils from '../../services/Utils.js';

//global dropdown element reference
let drop;

let Hamburger = {

    render: async () => {

        //strings to hold all the text (to be used within the HTML template literal)
        let githubLogoAlt = i18n.getString("Hamburger", "githubLogoAlt");
        let lingoLogoAlt = i18n.getString("Hamburger", "lingoLogoAlt");
        let versionLabel = i18n.getString("Hamburger", "versionLabel");
        let versionBad = i18n.getString("Hamburger", "versionBad");
        let versionGood = i18n.getString("Hamburger", "versionGood");
        let versionIQA = i18n.getString("Hamburger", "versionIQA");
        let localeLabel = i18n.getString("Hamburger", "localeLabel");
        let localeEN = i18n.getString("Hamburger", "localeEN");
        let localeFR = i18n.getString("Hamburger", "localeFR");
        let localeZH = i18n.getString("Hamburger", "localeZH");
        let localeYO = i18n.getString("Hamburger", "localeYO");
        let localeSI = i18n.getString("Hamburger", "localeSI");
        let localeEO = i18n.getString("Hamburger", "localeEO");
        let localeIA = i18n.getString("Hamburger", "localeIA");
        let githubLabel = i18n.getString("Hamburger", "githubLabel");
        let dashLabel = i18n.getString("Hamburger", "dashLabel");
        let contactLabel = i18n.getString("Hamburger", "contactLabel");
        let learnLabel = i18n.getString("Hamburger", "learnLabel");

        //view is solely for HTML markup, contains no static text
        let view = `
            <a target="_blank" rel="noreferrer" href="https://lingoport.com/" class="lingoLogo"><img src="img/lingoport_logo.png" class="lingoLogo" alt="${lingoLogoAlt}"></a>
            <div class="start">
                <label for="version"><h3>${versionLabel}</h3></label>
                <select id="version" class="hamDrop">
                    <option value="good" disabled selected hidden>${versionGood}</option>
                    <option value="IQA">${versionIQA}</option>
                    <option value="bad">${versionBad}</option>
                </select>
            </div>
            <div class="start">
                <label for="locale"><h3>${localeLabel}</h3></label>
                <select id="locale" class="hamDrop">
                    <option value="en-US">${localeEN}</option>
                    <option value="fr-FR">${localeFR}</option>
                    <option value="zh-CN">${localeZH}</option>
                    <option value="eo">${localeEO}</option>
                    <option value="ia">${localeIA}</option>
                </select>
            </div>
            <div class="githubLink outsideLink block">
            <a target="_blank" rel="noreferrer" href="https://github.com/Lingoport/Rebel-Outfitters/tree/i18n">
                    <img src="img/github_logo.png" class="logoThumb" alt="${githubLogoAlt}">
                    ${githubLabel}</a>
                
            </div>
            <div class="dashLink outsideLink block">
            <a target="_blank" href="https://sandbox.lingoport.com/dashboard?id=RebelOutfitters.i18n%3Ascan&did=8" class="inline" rel="noreferrer">
                    <img src="img/lingoport_thumb.png" class="logoThumb" alt="${lingoLogoAlt}">
                    ${dashLabel}</a>
                
            </div>
            <div class="spread">
            <a target="_blank" href="https://lingoport.com/get-a-demo/" rel="noreferrer" class="outsideLink">${contactLabel}</a>
            <a target="_blank" href="https://lingoport.com/i18n-company/" rel="noreferrer" class="outsideLink">${learnLabel}</a>
            </div>
        `;

        return view;
    },
    after_render: async () => {
        var overlayBG = document.querySelector('.bg');
        overlayBG.addEventListener('click', hideHam, false);

        drop = document.querySelector('#locale');
        //show selected locale in dropdown
        drop.value = locale;
        //listen for locale changes
        drop.addEventListener("input", changeLocale, false);

        //add listener from version change
        let versionSelect = document.querySelector('#version');
        versionSelect.addEventListener('change', switchVersion, false);
    }

}

//function to hide hamburger menu (only when it's currently visible)
var hideHam = e => {
    var hamSlider = document.querySelector(".hamSlider")
    var bg = document.querySelector('.bg');

    hamSlider.classList.remove('showHam');
    bg.classList.remove('overlay');
}

//function to change locale and reload page
var changeLocale = (e) => {
    let newLocale = drop.value;
    hideHam();
    updateLocale(newLocale);
}

//change to selected version from dropdown and perserve location
var switchVersion = (e) => {
    let request = Utils.parseRequestURL();
    console.log(request);
    let parsedURL = (request.resource ? '#/' + request.resource : '#/') + (request.id ? '/' + request.id : '') + (request.verb ? './' + request.verb : '');
    console.log(parsedURL);

    let selectedOption = event.target.value;

    if (selectedOption == "IQA") { //$NON-NLS-L$
        window.location.href = `http://rebeloutfitters.lingoport.com/RebelOutfitters.IQA/${parsedURL}`;
    }
    else if (selectedOption == "bad") { //$NON-NLS-L$
        window.location.href = `http://rebeloutfitters.lingoport.com/RebelOutfitters.DarkSide/${parsedURL}`;
    }
}

export { Hamburger };
