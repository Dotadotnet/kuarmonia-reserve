/**
 * Helper functions for translation management
 */

/**
 * Flatten translation fields into main object
 * @param {Object} item - Main item with translations array
 * @param {String} language - Target language
 * @returns {Object} - Flattened object with translation fields
 */
function flattenTranslations(item, language = 'fa') {
  if (!item || !item.translations) return item;
  
  const translation = item.translations.find(t => t.language === language);
  if (!translation || !translation.translation) return item;
  
  const fields = translation.translation.fields || {};
  
  // Create a copy of the item without translations
  const { translations, ...itemWithoutTranslations } = item;
  
  // Merge translation fields
  return {
    ...itemWithoutTranslations,
    ...fields
  };
}

/**
 * Process array of items with translations
 * @param {Array} items - Array of items with translations
 * @param {String} language - Target language
 * @returns {Array} - Processed array
 */
function processTranslationsArray(items, language = 'fa') {
  if (!Array.isArray(items)) return items;
  
  return items.map(item => flattenTranslations(item, language));
}

/**
 * Get translation field value
 * @param {Object} item - Item with translations
 * @param {String} fieldName - Field name to get
 * @param {String} language - Target language
 * @returns {String|null} - Translation value or null
 */
function getTranslationField(item, fieldName, language = 'fa') {
  if (!item || !item.translations) return null;
  
  const translation = item.translations.find(t => t.language === language);
  if (!translation || !translation.translation) return null;
  
  return translation.translation.fields?.[fieldName] || null;
}

module.exports = {
  flattenTranslations,
  processTranslationsArray,
  getTranslationField
};

