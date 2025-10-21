/**
 * Flattens translation data to the top level of an object
 * @param {Array} translations - Array of translation objects
 * @param {string} locale - Current locale/language
 * @returns {Object} Flattened fields from translation
 */
const flattenTranslations = (translations, locale) => {
  // Find the translation that matches both the language and has a valid translation object
  const translationObj = translations?.find(
    t => t.language === locale && t.translation
  );

  // Extract fields from translation
  let fields = translationObj?.translation?.fields || {};

  // Handle the case where fields might be empty but $__parent contains the data
  // This is a workaround for Mongoose populate issues with Map types
  if (Object.keys(fields).length === 0 && translationObj?.translation?.$__parent?.fields) {
    fields = translationObj.translation.$__parent.fields;
  }

  return fields;
};

/**
 * Flattens translation data for a document with proper error handling
 * @param {Object} document - Mongoose document with translations
 * @param {string} locale - Current locale/language
 * @returns {Object} Document with flattened translation fields
 */
const flattenDocumentTranslations = (document, locale) => {
  try {
    if (!document || !document.translations) {
      return document || {};
    }

    // Extract fields from translation
    const fields = flattenTranslations(document.translations, locale);

    // Return document with flattened fields
    return {
      ...document.toObject ? document.toObject() : document,
      ...fields
    };
  } catch (error) {
    console.error('Error flattening document translations:', error);
    return document || {};
  }
};

/**
 * Flattens translation data for an array of documents
 * @param {Array} documents - Array of Mongoose documents with translations
 * @param {string} locale - Current locale/language
 * @returns {Array} Array of documents with flattened translation fields
 */
const flattenDocumentsTranslations = (documents, locale) => {
  if (!Array.isArray(documents)) {
    return [];
  }

  return documents.map(doc => flattenDocumentTranslations(doc, locale));
};

module.exports = {
  flattenTranslations,
  flattenDocumentTranslations,
  flattenDocumentsTranslations
};