

export default class language {
    info = [
        { name: 'Persian', lang: 'fa', loc: 'IR', dir: "rtl" , img :  "/countries/" + "IR.png"  } ,
        { name: 'Arabic', lang: 'ar', loc: 'SA', dir: "ltr" , img :  "/countries/" + "SA.png"  },
        { name: 'English', lang: 'en', loc: 'US', dir: "ltr" , img :  "/countries/" + "GB.png" },
        { name: 'Turkish', lang: 'tr', loc: 'TR', dir: "rtl" , img :  "/countries/" + "TR.png"  },
    ];
    def = 'fa';
    selected = null 
    constructor(lang) {
        this.info.forEach(item => {
            if (item.lang == lang) {
                this.selected = item;
            }
        })
        if(!this.selected){
            this.info.forEach(item => {
                if (item.lang == this.def) {
                    this.selected = item;
                }
            })
        }
    }
    getInfo(){
        return this.selected
    }
}