const express = require('express');
const router = express.Router();
const Property = require('../../models/property.model');
const { processTranslationsArray } = require('../../utils/translationHelper');

/**
 * @route GET /api/properties
 * @desc Get properties with translations
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const language = req.headers.lang || 'fa';
    const { limit = 10, skip = 0, fields } = req.query;
    
    const selectFields = fields ? fields.split(',').join(' ') : 'title variants citizenshipStatus building address currency type slug _id propertyId thumbnail tradeType summary saleType createDate';
    const limitNum = parseInt(limit);
    const skipNum = parseInt(skip);
    
    const properties = await Property.find()
      .select(selectFields)
      .populate([
        {
          path: 'translations.translation',
          match: { language }
        },
        {
          path: 'building',
          populate: {
            path: 'translations.translation',
            match: { language }
          }
        },
        {
          path: 'tradeType',
          populate: {
            path: 'translations.translation',
            match: { language }
          }
        },
        {
          path: 'saleType',
          populate: {
            path: 'translations.translation',
            match: { language }
          }
        }
      ])
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skipNum)
      .lean();
    
    const processedProperties = processTranslationsArray(properties, language);
    
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "Properties fetched successfully",
      data: processedProperties
    });
  } catch (error) {
    console.error('Error in properties route:', error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت املاک",
      error: error.message
    });
  }
});

module.exports = router;










