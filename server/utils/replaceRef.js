const mongoose = require("mongoose");
const dynamicImportModel = require("../utils/dynamicImportModel")
const Translation = require("../models/translation.model");

function paginateArray(array, pageNumber, itemsPerPage) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
}

module.exports = class replaceRef {
    targetFild = "translations";
    DatabaseNames = mongoose.modelNames();
    models = {};
    idModels = [];
    dataAllModels = {};
    fieldsSkip = ["targetId"]
    constructor(data, req, setting = {}) {
        this.setting = setting;
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
        let page = this.req.query.page;
        let scope = this.req.query.scope ? this.req.query.scope : 10;
        this.fields = this.req.query.fields ? [...this.req.query.fields.split(",")] : null;
        if (this.setting.pagination !== false) {
            // آیا پیجینیشن از ریکویست خوانده شود یا نه ؟
            if (this.req.query.page == "last") {
                let count_last_page = result.length % scope ? result.length % scope : scope;
                page = (result.length - count_last_page) / scope;
            }
            if (page && Array.isArray(result)) {
                result = paginateArray(result, page, scope)
            }
        }
        for (const modelName of this.DatabaseNames) {
            const Model = dynamicImportModel(modelName);
            this.models[modelName] = Model;
            const records = await Model.find().lean()
            records.forEach(record => {
                this.idModels.push(record._id.toString())
                this.dataAllModels[record._id.toString()] = record;
            });
        }
        if (result) {
            this.visit(result)
        }
        // برسی فیلد های لازم
        let resultIsArray = Array.isArray(result);
        let resultToArray = resultIsArray ? result : [result];
        if (this.fields) {
            resultToArray.forEach(item => {
                for (const [key, value] of Object.entries(item)) {
                    if (this.fields.includes(key)) {
                        if (this.targetFild == key) {
                            Object.values(item[key]).forEach(fieldsTrans => {
                                for (const [fieldTransKey, fieldTransValue] of Object.entries(fieldsTrans)) {
                                    if (!this.fields.includes(fieldTransKey)) {
                                        delete fieldsTrans[fieldTransKey]
                                    }
                                }
                            });
                        }
                    } else {
                        delete item[key];
                    }
                }
            });
        }
        // برسی فیلد های لازم
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
                            if (translated.language)
                                object_translate[translated.language] = translated.fields;
                        }
                    }
                    if (Object.keys(object_translate).length) {
                        for (const [key, value] of Object.entries(object_translate[this.lang])) {
                            if (key == "slug") {
                                data["slug"] = object_translate.en.slug
                            } else {
                                data[key] = value
                            }
                        }
                        data[this.targetFild] = object_translate;
                    }
                }
            }
        }
    }

}
