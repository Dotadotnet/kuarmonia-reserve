const Product = require("../models/product.model");
const remove = require("../utils/remove.util");
const dynamicImportModel = require("../utils/dynamicImportModel")
const autoTranslation = require("../utils/autoTranslation");
const { translate } = require("google-translate-api-x");


function paginateArray(array, pageNumber, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
}


function pointText(wordsOrString, text, point) {
  let pointResult = 0;
  const words = Array.isArray(wordsOrString) ? wordsOrString : wordsOrString.split(" ");
  words.forEach(word => {
    if (word) {
      if (text.trim().toLowerCase().includes(word.trim().toLowerCase())) {
        pointResult += point;
      }
    }
  });
  return pointResult;
}

async function replaceDataDynamic(data, req) {
  const replaceRefClass = new replaceRef(data, req, { pagination: false });
  const replaceRefData = await replaceRefClass.getRefFields()
  return replaceRefData;
}

exports.textSearch = async (req, res) => {
  // summary
  const lang = req.headers.lang ? req.headers.lang : "fa";
  const input = req.params.text;
  const fieldPoint = { title: 4, description: 2, tag: 2, category: 3 };
  const minPoint = 4;
  const modelsNames = [ "visa" , "service", "property", "rent", "opportunity", "news", "blog"]


  let items = [];

  for (let i = 0; i < modelsNames.length; i++) {
    const modelsName = modelsNames[i];
    const Model = dynamicImportModel(modelsName);
    const FieldsModel = await Model.find().select().lean();
    FieldsModel.forEach(FieldModel => {
      items.push(FieldModel)
    });
  }


  let itemsExchanged = await replaceDataDynamic(items, req)
  let itemsByPoint = [];
  let points = [];
  itemsExchanged.forEach(item => {

    let point = 0;

    let caption = item.summary ? item.summary : item.description;

    if (caption) {
      point += pointText(input, caption, fieldPoint.description)
    }

    if (item.category) {
      point += pointText(input, item.category.title, fieldPoint.category)
    }

    point += pointText(input, item.title, fieldPoint.title)

    let tags = typeof item.tags == "object" ? Array.isArray(item.tags) ? item.tags : [item.tags] : [];

    tags.forEach(tag => {
      if (tag.title)
        point += pointText(input, tag.title, fieldPoint.tag)
    });



    if (point > minPoint) {
      let customItem = item;
      delete customItem["content"];
      delete customItem["faqs"];
      delete customItem["roadmap"];
      itemsByPoint.push({ data: customItem, point: point });
      if (!points.includes(point)) {
        points.push(point)
      }
    }

  });

  let poinsSorted = points.sort(function (a, b) { return b - a });

  let result = [];
  poinsSorted.forEach(point => {
    itemsByPoint.forEach(item => {
      if (item.point == point) {
        result.push(item.data)
      }
    });
  });

  let page = req.query.page ? req.query.page : 1;
  var similer = '';
  if (!result.length) {
    try {
      const similerToEnglish = await translate(input.trim(), { to: lang == "en" ? "fa" : "en", autoCorrect: true });
      similer = await translate(similerToEnglish.text.trim(), { from: lang == "en" ? "fa" : "en", to: lang, autoCorrect: true });
      if (similer.text) {
        similer = similer.text
      }
    } catch (error) {

    }
  }



  res.status(200).json({
    acknowledgement: true,
    message: "Ok",
    description: "Data fetched successfully",
    data: {
      data: result.length ? paginateArray(result, page, 10) : similer,
      total: result.length
    }
  });
};
