const express = require('express');
const router = express.Router();
const News = require('../../models/news.model');
const { processTranslationsArray } = require('../../utils/translationHelper');

/**
 * @route GET /api/news
 * @desc Get news with translations
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const language = req.headers.lang || 'fa';
    const { limit = 10, skip = 0, fields } = req.query;
    
    const selectFields = fields ? fields.split(',').join(' ') : 'title slug _id newsId thumbnail summary categories publishDate';
    const limitNum = parseInt(limit);
    const skipNum = parseInt(skip);
    
    const news = await News.find()
      .select(selectFields)
      .populate([
        {
          path: 'translations.translation',
          match: { language }
        },
        {
          path: 'categories',
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
    
    const processedNews = processTranslationsArray(news, language);
    
    res.status(200).json({
      acknowledgement: true,
      message: "Ok",
      description: "News fetched successfully",
      data: processedNews
    });
  } catch (error) {
    console.error('Error in news route:', error);
    res.status(500).json({
      acknowledgement: false,
      message: "Error",
      description: "خطا در دریافت اخبار",
      error: error.message
    });
  }
});

module.exports = router;










