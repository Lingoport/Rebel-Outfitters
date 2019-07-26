import i18n from '../../services/i18n.js';



let Bottombar = {
    render: async () => {
        let menuAlt = i18n.getString("Bottombar", "menuAlt");

        let view =  /*html*/`
            <img src="img/ham.svg" class="hamTrigger" alt="${menuAlt}">
        `
        return view
    },
    after_render: async () => {
        let hamTrigger = document.querySelector('.hamTrigger');
        hamTrigger.addEventListener('click', showHam, false);
    }

}

var showHam = () => {
    let hamSlider = document.querySelector(".hamSlider")
    let overlayBG = document.querySelector('.bg');
    overlayBG.classList.toggle('overlay');
    hamSlider.classList.toggle('showHam');
}

export default Bottombar;