const Translation = require("../models/translation.model");
require("dotenv").config();


module.exports = class autoTranslation {
    targetFild = "translations";
    constructor(OrginalResponse, req) {
        this.data = OrginalResponse;
        this.req = req;        
        this.lang = this.req.headers.lang ? this.req.headers.lang : "fa";
    }

    async getResult() {
        let result = this.data;
        if (typeof result == "string") {
            // اگه استرینگ بود خودش رو برمیگردونه            
            try {
                let result = JSON.parse(this.data);
            } catch (error) {
                return this.data;
            }
            // اگه استرینگ بود خودش رو برمیگردونه
        }


        await this.visit([result])

        
        return result;
    }

    async visit(data) {
        if (typeof data == "object") {
            for (const [key, value] of Object.entries(data)) {
                if (Array.isArray(value) || typeof value == "object") {
                    if (value) {
                        if (typeof value == "object" && value[this.targetFild]) {
                            try {
                                await this.treanslateObjectModel(data[key])
                            } catch {
                                if (Array.isArray(data)) {
                                    data.splice(key, 1);
                                } else {

                                    delete data[key]
                                }
                            }
                        }
                        if (key !== this.targetFild && key !== "_id" && typeof value == "object") {
                            await this.visit(data[key]);
                        }
                    }
                }
            }
        }
    }

    async treanslateObjectModel(modelObject) {
        let object_translate = {};
        if (modelObject[this.targetFild] && modelObject[this.targetFild][0]["translation"]) {
            for (let i = 0; i < modelObject[this.targetFild].length; i++) {
                let translated = await Translation.findById(modelObject[this.targetFild][i]["translation"]);
                object_translate[translated.language] = Object.fromEntries(translated.fields);
            }
        }
        for (const [key, value] of Object.entries(object_translate[this.lang])) {
            modelObject[key] = value
        }
        modelObject[this.targetFild] = object_translate;
    }





}
