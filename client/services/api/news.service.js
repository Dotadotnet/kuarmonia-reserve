import Api from '@/utils/api';

/**
 * News API service
 */
class NewsApiService {
  /**
   * Get news
   */
  async getNews(language = null, options = {}) {
    try {
      const { limit = 10, skip = 0, fields } = options;
      const queryParams = new URLSearchParams();
      
      if (limit) queryParams.append('limit', limit);
      if (skip) queryParams.append('skip', skip);
      if (fields) queryParams.append('fields', fields.join(','));
      
      const queryString = queryParams.toString();
      const url = `/news${queryString ? `?${queryString}` : ''}`;
      
      return await Api(url, {}, language);
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  /**
   * Get news for homepage
   */
  async getHomepageNews(language = null) {
    return await this.getNews(language, {
      limit: 8,
      fields: ['title', 'slug', '_id', 'newsId', 'thumbnail', 'summary', 'categories', 'publishDate']
    });
  }
}

export default new NewsApiService();






