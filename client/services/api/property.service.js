import Api from '@/utils/api';

/**
 * Property API service
 */
class PropertyApiService {
  /**
   * Get properties
   */
  async getProperties(language = null, options = {}) {
    try {
      const { limit = 10, skip = 0, fields } = options;
      const queryParams = new URLSearchParams();
      
      if (limit) queryParams.append('limit', limit);
      if (skip) queryParams.append('skip', skip);
      if (fields) queryParams.append('fields', fields.join(','));
      
      const queryString = queryParams.toString();
      const url = `/properties${queryString ? `?${queryString}` : ''}`;
      
      return await Api(url, {}, language);
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }

  /**
   * Get properties for homepage
   */
  async getHomepageProperties(language = null) {
    return await this.getProperties(language, {
      limit: 8,
      fields: ['title', 'variants', 'citizenshipStatus', 'building', 'address', 'currency', 'type', 'slug', '_id', 'propertyId', 'thumbnail', 'tradeType', 'summary', 'saleType', 'createDate']
    });
  }
}

export default new PropertyApiService();






