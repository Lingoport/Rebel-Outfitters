//TODO: add click listeners for dropdown changes, style liinks, 


let Hamburger = {

    render : async () => {
        let view = `
        
            <a target="_blank" href="https://lingoport.com/" class="lingoLogo"><img src="../../img/lingoport_logo.png" class="lingoLogo"></a>
            <div>
                <h3>Demo Version:</h3>
                <select id="version">
                    <option value="bad">Non-i18n Compliant</option>
                    <option value="good">I18n Compliant</option>
                </select>
            </div>
            <div>
                <h3>Locale:</h3>
                <select id="locale">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ma">Mandarin</option>
                    <option value="yo">Yoda</option>
                    <option value="si">Sith</option>
                </select>
            </div
            <div class="githubLink outsideLink">
                <a target="_blank" href="https://github.com/Lingoport/demo-app-spa">
                    <img src="../../img/github_logo.png" class="logoThumb">
                    View Source
                </a>
            </div>
            <div class="dashLink outsideLink">
                <a target="_blank" href="">
                    <img src="../../img/lingoport_thumb.png" class="logoThumb">
                    View Lingoport Dashboard
                </a>
            </div>
            <a target="_blank" href="https://lingoport.com/get-a-demo/">Contact Us</a>
            <a target="_blank" href="https://lingoport.com/i18n-company/">Learn More</a>
        `;
        
        return view;
    },
    after_render: async () => {
        var overlayBG = document.querySelector('.bg');
        overlayBG.addEventListener('click', hideHam, false);
    }

}

//function to hide hamburger menu (only when it's currently visible)
var hideHam = e => {
    console.log('click to hide triggered');
    var hamSlider = document.querySelector(".hamSlider")
    var bg = document.querySelector('.bg');

    hamSlider.classList.remove('showHam');
    bg.classList.remove('overlay');
}

export {Hamburger};