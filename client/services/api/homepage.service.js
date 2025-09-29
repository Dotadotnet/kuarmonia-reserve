import Api from '@/utils/api';

/**
 * Homepage API service
 */
class HomepageApiService {
  /**
   * Get homepage data
   */
  async getHomepageData(language = null) {
    try {
      return await Api('/page/home', {}, language);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      throw error;
    }
  }

  /**
   * Get specific section data
   */
  async getSectionData(section, language = null) {
    try {
      const data = await this.getHomepageData(language);
      return data[section] || [];
    } catch (error) {
      console.error(`Error fetching ${section} data:`, error);
      throw error;
    }
  }

  /**
   * Get opportunities
   */
  async getOpportunities(language = null) {
    return await this.getSectionData('opportunity', language);
  }

  /**
   * Get news
   */
  async getNews(language = null) {
    return await this.getSectionData('news', language);
  }

  /**
   * Get properties
   */
  async getProperties(language = null) {
    return await this.getSectionData('property', language);
  }

  /**
   * Get rent items
   */
  async getRentItems(language = null) {
    return await this.getSectionData('rent', language);
  }

  /**
   * Get services
   */
  async getServices(language = null) {
    return await this.getSectionData('service', language);
  }

  /**
   * Get blogs
   */
  async getBlogs(language = null) {
    return await this.getSectionData('blog', language);
  }
}

export default new HomepageApiService();

