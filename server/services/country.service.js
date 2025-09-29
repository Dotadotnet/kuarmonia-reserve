const Country = require("../models/country.model");
const Admin = require("../models/admin.model");
const Translation = require("../models/translation.model");
const translateFields = require("../utils/translateFields");
const { generateSlug } = require("../utils/seoUtils");

exports.addCountry = async (req, res) => {
  try {
    const { name, icon,code } = req.body;
    const country = new Country({
      name, icon, code, creator: req.admin._id,
    });
    const result = await country.save();

    const slug = await generateSlug(name);
    const translations = await translateFields(
      { title: name, slug },
      { stringFields: ["title", "slug"] }
    );
    const translationDocs = Object.entries(translations).map(([language, { fields }]) => ({
      language,
      refModel: "Country",
      refId: result._id,
      fields
    }));
    const savedTranslations = await Translation.insertMany(translationDocs);
    const translationInfos = savedTranslations.map((t) => ({ translation: t._id, language: t.language }));
    await Country.findByIdAndUpdate(result._id, { $set: { translations: translationInfos } });

    res.status(201).json({ acknowledgement: true, message: "Created", description: "کشور ثبت شد", data: result });
  } catch (error) {
    res.status(500).json({ acknowledgement: false, message: "Error", description: error.message, error: error.message });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find().populate({ path: "translations.translation", match: { language: req.locale } });
    res.status(200).json({ acknowledgement: true, message: "Ok", data: countries });
  } catch (error) {
    res.status(500).json({ acknowledgement: false, message: "Error", description: error.message, error: error.message });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ acknowledgement: false, message: "Not Found" });
    res.status(200).json({ acknowledgement: true, message: "Ok", data: country });
  } catch (error) {
    res.status(500).json({ acknowledgement: false, message: "Error", description: error.message, error: error.message });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const slug = await generateSlug(name);
      await Translation.updateMany({ refModel: "Country", refId: req.params.id }, { $set: { "fields.slug": slug } });
    }
    const result = await Country.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.status(200).json({ acknowledgement: true, message: "Ok", description: "کشور بروزرسانی شد", data: result });
  } catch (error) {
    res.status(500).json({ acknowledgement: false, message: "Error", description: error.message, error: error.message });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);
    await Translation.deleteMany({ refModel: "Country", refId: req.params.id });
    res.status(200).json({ acknowledgement: true, message: "Ok", description: "کشور حذف شد" });
  } catch (error) {
    res.status(500).json({ acknowledgement: false, message: "Error", description: error.message, error: error.message });
  }
};







