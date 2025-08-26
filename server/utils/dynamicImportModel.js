const { log } = require('console');
const fs = require('fs');



module.exports =  function dynamicImportModel(model) {
    const testFolder = './models/';
    const files =  fs.readdirSync(testFolder);
    var result = null
    files.forEach(file => {
        let name = file.replace([".js", ".model.js"], ["", ""]).trim().toLocaleLowerCase()
        let data = { name: name, file: file, width: name.length }
        
        if (name.includes(model.toLocaleLowerCase())) {
            if (result) {
                if (result.width > name.length) {
                    result = data
                }
            } else {
                result = data
            }
        }
    })
    if(result){
        const file = result.file ;
        return require(`../models/${file}`)
    }
}