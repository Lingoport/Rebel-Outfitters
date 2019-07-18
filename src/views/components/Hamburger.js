//TODO: add event listeners for i18n dropdown changes
import { locale, updateLocale } from "../../app.js";

//global dropdown element reference
let drop;

//static strings to hold all the text (to be used within the HTML template literal)
let githubLogoAlt = "GitHub Logo";
let lingoLogoAlt = "Lingoport Logo";
let versionLabel = "Version: ";
let versionOptions = ["Non-i18n Compliant", "I18n Compliant"];
let localeLabel = "Locale: ";
let localeOptions = ["English - United States", "French - France", "Chinese - China", "Yoda", "Sith"];
let githubLabel = "View Source";
let dashLabel = "View Lingoport Dashboard";
let contactLabel = "Contact Us";
let learnLabel = "Learn More";

let Hamburger = {

    render : async () => {

        //view is solely for HTML markup, contains no static text
        let view = `
            <a target="_blank" rel="noreferrer" href="https://lingoport.com/" class="lingoLogo"><img src="../../img/lingoport_logo.png" class="lingoLogo" alt="${lingoLogoAlt}"></a>
            <div class="start">
                <label for="version"><h3>${versionLabel}</h3></label>
                <select id="version" class="hamDrop">
                    <option value="good">${versionOptions[1]}</option>
                    <option value="bad">${versionOptions[0]}</option>
                </select>
            </div>
            <div class="start">
                <label for="locale"><h3>${localeLabel}</h3></label>
                <select id="locale" class="hamDrop">
                    <option value="en-US">${localeOptions[0]}</option>
                    <option value="fr-FR">${localeOptions[1]}</option>
                    <option value="zh-CN">${localeOptions[2]}</option>
                    <option value="yo">${localeOptions[3]}</option>
                    <option value="si">${localeOptions[4]}</option>
                </select>
            </div>
            <div class="githubLink outsideLink block">
            <a target="_blank" rel="noreferrer" href="https://github.com/Lingoport/demo-app-spa">
                    <img src="../../img/github_logo.png" class="logoThumb" alt="${githubLogoAlt}">
                    ${githubLabel}</a>
                
            </div>
            <div class="dashLink outsideLink block">
            <a target="_blank" href="" class="inline" rel="noreferrer">
                    <img src="../../img/lingoport_thumb.png" class="logoThumb" alt="${lingoLogoAlt}">
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

export {Hamburger};