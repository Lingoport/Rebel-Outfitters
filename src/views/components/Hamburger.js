//TODO: add event listeners for i18n dropdown changes
import { locale, updateLocale } from "../../app.js";

//global dropdown element reference
let drop;

let Hamburger = {

    render : async () => {
        let view = `
        
            <a target="_blank" href="https://lingoport.com/" class="lingoLogo"><img src="../../img/lingoport_logo.png" class="lingoLogo"></a>
            <div class="start">
                <h3>Version: </h3>
                <select id="version" class="hamDrop">
                    <option value="bad">Non-i18n Compliant</option>
                    <option value="good">I18n Compliant</option>
                </select>
            </div>
            <div class="start">
                <h3>Locale: </h3>
                <select id="locale" class="hamDrop">
                    <option value="en-us">English - United States</option>
                    <option value="fr-fr">French - France</option>
                    <option value="zh-cn">Chinese - China</option>
                    <option value="yo">Yoda</option>
                    <option value="si">Sith</option>
                </select>
            </div>
            <div class="githubLink outsideLink block">
            <a target="_blank" href="https://github.com/Lingoport/demo-app-spa">
                    <img src="../../img/github_logo.png" class="logoThumb">
                    View Source</a>
                
            </div>
            <div class="dashLink outsideLink block">
            <a target="_blank" href="" class="inline">
                    <img src="../../img/lingoport_thumb.png" class="logoThumb">
                    View Lingoport Dashboard</a>
                
            </div>
            <div class="spread">
            <a target="_blank" href="https://lingoport.com/get-a-demo/" class="outsideLink">Contact Us</a>
            <a target="_blank" href="https://lingoport.com/i18n-company/" class="outsideLink">Learn More</a>
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