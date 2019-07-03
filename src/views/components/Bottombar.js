let Bottombar = {
    render: async () => {
        let view =  /*html*/`
            <div>
            <a href="https://github.com/Lingoport/demo-app-spa" target="_blank"><img src="../../img/github_logo.png" class="logo"></a>
            </div>
            <div>
                <img src="../../img/lingoport_logo.png" class="logo">
            </div>
        `
        return view
    },
    after_render: async () => { }

}

export default Bottombar;