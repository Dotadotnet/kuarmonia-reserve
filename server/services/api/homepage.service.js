const { processTranslationsArray } = require('../../utils/translationHelper');
const dynamicImportModel = require('../../utils/dynamicImportModel');
const replaceRef = require('../../utils/replaceRef');

/**
 * Homepage service with optimized data fetching
 */
class HomepageService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60 * 60 * 1000; // 1 hour
  }

  /**
   * Get cached data or fetch from database
   */
  async getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  /**
   * Set cache data
   */
  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Fetch data for specific model
   */
  async fetchModelData(modelName, fields, language) {
    const Model = dynamicImportModel(modelName);
    const data = await Model.find().lean();
    
    const req = {
      headers: { lang: language },
      query: { fields: fields.join(',') }
    };
    
    const replaceRefClass = new replaceRef(data, req);
    return await replaceRefClass.getRefFields();
  }

  /**
   * Get homepage data with caching
   */
  async getHomepageData(language = 'fa') {
    const cacheKey = `homepage_${language}`;
    
    // Check cache first
    const cached = await this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const dataConfig = {
        service: { 
          fields: ['title', 'slug', 'serviceId', 'icon'],
          model: 'Service'
        },
        news: { 
          fields: ['title', 'slug', '_id', 'newsId', 'thumbnail', 'summary', 'categories', 'publishDate'],
          model: 'News'
        },
        blog: { 
          fields: ['title', 'slug', '_id', 'blogId', 'thumbnail', 'description', 'reviews', 'creator', 'publishDate'],
          model: 'Blog'
        },
        property: { 
          fields: ['title', 'variants', 'citizenshipStatus', 'building', 'address', 'currency', 'type', 'slug', '_id', 'propertyId', 'thumbnail', 'tradeType', 'summary', 'saleType', 'createDate'],
          model: 'Property'
        },
        opportunity: { 
          fields: ['title', 'slug', '_id', 'city', 'opportunityId', 'citizenshipOutcome', 'endDate', 'startDate', 'thumbnail', 'summary', 'skills', 'refId'],
          model: 'Opportunity'
        },
        rent: { 
          fields: ['title', 'status', 'reviews', 'gallery', 'price', 'members', 'location', 'address', 'slug', '_id', 'rentId', 'thumbnail', 'summary'],
          model: 'Rent'
        }
      };

      const result = {};
      
      // Fetch data for each model in parallel
      const promises = Object.entries(dataConfig).map(async ([key, config]) => {
        const data = await this.fetchModelData(config.model, config.fields, language);
        result[key] = data;
      });

      await Promise.all(promises);

      // Cache the result
      this.setCachedData(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      throw error;
    }
  }

  /**
   * Clear cache for specific language
   */
  clearCache(language = null) {
    if (language) {
      this.cache.delete(`homepage_${language}`);
    } else {
      this.cache.clear();
    }
  }
}

module.exports = new HomepageService();

