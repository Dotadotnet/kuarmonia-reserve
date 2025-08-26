const mongoose = require("mongoose");
const dynamicImportModel = require("../utils/dynamicImportModel")
const Translation = require("../models/translation.model");

module.exports = class autoTranslation {
    targetFild = "translations";
    DatabaseNames = mongoose.modelNames();
    models = {};
    idModels = [];
    dataAllModels = {};
    fieldsSkip = ["targetId"]
    constructor(data, req) {
        this.data = data;
        this.req = req;
        this.lang = this.req.headers.lang ? this.req.headers.lang : "fa";
    }

    getRecordObjectId(id) {
        if (id && this.idModels.includes(id.toString())) {
            return this.dataAllModels[id.toString()];
        } else {
            return null;
        }
    }

    async getRefFields() {
        let result = this.data;
        for (const modelName of this.DatabaseNames) {
            const Model = dynamicImportModel(modelName);
            this.models[modelName] = Model;
            const records = await Model.find().lean()
            records.forEach(record => {
                this.idModels.push(record._id.toString())
                this.dataAllModels[record._id.toString()] = record;
            });
        }
        if (result)
            this.visit(result)
        return result;
    }


    visit(data) {
        if (typeof data == "object") {
            for (const [key, value] of Object.entries(data)) {
                if (key !== this.targetFild && !this.fieldsSkip.includes(key) && key !== "_id" && typeof data[key] == "object") {
                    let record = this.getRecordObjectId(value);
                    if (record) {
                        data[key] = record;
                    } else if (record === undefined) {

                    }
                    if (data[key]) {
                        this.visit(data[key]);
                    }
                }
                if (key == "translations") {
                    let object_translate = {};
                    if (data[this.targetFild] && data[this.targetFild][0]) {
                        for (let i = 0; i < data[this.targetFild].length; i++) {
                            let translated = this.getRecordObjectId(data[this.targetFild][i]["translation"]);
                            
                            object_translate[translated.language] = translated.fields;
                        }
                    }
                    if (Object.keys(object_translate).length) {
                        for (const [key, value] of Object.entries(object_translate[this.lang])) {
                            data[key] = value
                        }
                        data[this.targetFild] = object_translate;
                    }
                }

            }
        }
    }

}
