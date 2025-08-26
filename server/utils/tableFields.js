const mongoose = require("mongoose");
const fieldType = require("../models/fieldtype.model");
const config = require("../config/config")
var resultVisitFields = null;

function visitFields(data, target) {
    resultVisitFields = null;
    visitFieldsMain(data, target)
    return resultVisitFields;
}

function visitFieldsMain(data, target) {
    if (typeof data == "object" && data[target]) {
        resultVisitFields = data[target];
        return '';
    }
    if (typeof data == "object") {
        for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value) || typeof value == "object") {
                if (value) {
                    if (typeof value == "object" && value[target]) {
                        resultVisitFields = value[target];
                        return '';
                    } else {
                        visitFields(value, target);
                    }
                }
            }
        }
    }
}

module.exports = class autoTranslation {
    translationField = "translations";
    ignoreFields = ['translations', "deletedAt", "updatedAt", "createdAt", "translations"];

    constructor(table) {
        this.table = table;
    }
    typeFieldTranslate = {
        text: ["longTextFields", "stringFields", "lowercaseFields"],
        array: ["arrayObjectFields", "arrayStringFields"]
    }
    getStructureField(table = null) {
        if (!table) {
            return config.structureField[this.table.toLowerCase()]
        }
        return config.structureField[table.toLowerCase()]
    }
    async getFilds() {
        const table = this.table;
        let schema = {};
        if (!Object.keys(schema).length && table == 'database') {
            for (const modelName of mongoose.modelNames()) {
                if (!config.ignoreTables.includes(modelName)) {
                    let type = await fieldType.findOne({ table: 'database', field: modelName, type: "onlyName" })
                    schema[modelName] = {
                        table: 'database',
                        field: modelName,
                        multiple: false,
                        translation: false,
                        type: 'onlyName',
                        data: [],
                        name: type ? type.name : modelName,
                    };
                }
            }
            await fieldType.deleteMany({ table: 'database', type: "onlyName" })
        } else {
            const data_need_translate = this.getStructureField();
            if (data_need_translate) {
                for (const [key, value] of Object.entries(data_need_translate)) {
                    let isMulti = false
                    if (this.typeFieldTranslate.array.includes(key)) {
                        isMulti = true;
                    }
                    for (const field of value) {
                        let type = await fieldType.findOne({ table: table, field: field })
                        schema[field] = {
                            table: table,
                            field: field,
                            type: type ? type.type : 'none',
                            multiple: isMulti,
                            translation: true,
                            data: type ? type.data : [],
                            name: type ? type.name : field
                        };
                    }
                }
            }
            for (const modelName of mongoose.modelNames()) {
                if (table == modelName) {
                    let fields_obj = mongoose.model(modelName).schema.obj;
                    for (const [key, value] of Object.entries(fields_obj)) {
                        let isMulti = false
                        let type = await fieldType.findOne({ table: table, field: key })
                        let data = type ? type.data : [];
                        if (!type) {
                            if (visitFields(value, 'ref')) {
                                type = 'ref'
                                data.push(visitFields(value, 'ref'))
                            } else if (visitFields(value, 'enum')) {
                                type = "option"
                                data = visitFields(value, 'enum')
                            } else if (typeof value['type'] == 'function') {
                                if (value['type'].name == "Number") {
                                    type = "number"
                                    let dataString = {} 
                                    if(value.max){
                                        dataString["max"] = typeof value.max == "object" ? value.max[0] : value.max
                                    }
                                     if(value.min){
                                        dataString["min"] =  typeof value.min == "object" ? value.min[0] : value.min
                                    }
                                    data = dataString ;
                                } else if (value['type'].name == "String") {
                                    type = "text"
                                    let dataString = {}
                                      if(value.maxLength){
                                        dataString["maxLength"] = typeof value.maxLength == "object" ? value.maxLength[0] : value.maxLength
                                    }
                                     if(value.minLength){
                                        dataString["minLength"] =  typeof value.minLength == "object" ? value.minLength[0] : value.minLength
                                    }
                                    data = dataString ;
                                }

                            }



                        }

                        if (Array.isArray(value) || Array.isArray(value.type)) {
                            isMulti = true;
                        }

                        if (!schema[key]) {
                            schema[key] = {
                                table: table,
                                field: key,
                                multiple: isMulti,
                                translation: false,
                                type: typeof type == "string" ? type : type ? type.type : 'none',
                                data: data,
                                name: typeof type == 'object' ? type ? type.name : key : key,
                            };
                        }
                    }
                    let type = await fieldType.findOne({ table: 'database', field: table, type: "onlyName" })
                    await fieldType.deleteMany({ table: 'database', field: table, type: "onlyName" })
                    schema[table] = {
                        table: 'database',
                        field: table,
                        multiple: false,
                        translation: false,
                        type: 'onlyName',
                        data: [],
                        name: type ? type.name : table,
                    };
                }

            }
            await fieldType.deleteMany({ table: table })
        }
        let result = [];
        for (const [key, value] of Object.entries(schema)) {
            if (!((value.type == "number" && key.includes("Id")) || this.ignoreFields.includes(key))) {
                result.push(value)
            }
        }
        await fieldType.insertMany(result)
        return result;
    }





















}
