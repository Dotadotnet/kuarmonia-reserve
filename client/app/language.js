

export default class language {
    info = [
        { name: 'فارسی', lang: 'fa', loc: 'IR', dir: "rtl" , img :  "/countries/" + "IR.png"  } ,
        { name: 'العربی', lang: 'ar', loc: 'PS', dir: "rtl" , img :  "/countries/" + "PS.png"  },
        { name: 'English', lang: 'en', loc: 'US', dir: "ltr" , img :  "/countries/" + "GB.png" },
        { name: 'Turkish', lang: 'tr', loc: 'TR', dir: "ltr" , img :  "/countries/" + "TR.png"  },
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