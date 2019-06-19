let Bottombar = {
    render: async () => {
        let view =  /*html*/`
            <div>
                <img src="../../img/github_logo.png" class="logo">
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