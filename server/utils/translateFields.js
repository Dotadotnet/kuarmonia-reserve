const { translate } = require("google-translate-api-x");

const translateFields = async (data, fieldsToTranslate = [], languages = ["en", "tr"]) => {
  const translations = {};

  for (const lang of languages) {
    translations[lang] = { fields: {} };

    for (const field of fieldsToTranslate) {
      try {
        const result = await translate(data[field], { to: lang });
        console.log(`Translated "${field}" to ${lang}:`, result.text);
        translations[lang].fields[field] = result.text;
      } catch (err) {
        throw new Error(`خطا در ترجمه فیلد "${field}" به زبان ${lang}: ${err.message}`);
      }
    }
  }

  return translations;
};

module.exports = translateFields;
