import Api from '@/utils/api';

/**
 * Opportunity API service
 */
class OpportunityApiService {
  /**
   * Get opportunities
   */
  async getOpportunities(language = null, options = {}) {
    try {
      const { limit = 10, skip = 0, fields } = options;
      const queryParams = new URLSearchParams();
      
      if (limit) queryParams.append('limit', limit);
      if (skip) queryParams.append('skip', skip);
      if (fields) queryParams.append('fields', fields.join(','));
      
      const queryString = queryParams.toString();
      const url = `/opportunities${queryString ? `?${queryString}` : ''}`;
      
      return await Api(url, {}, language);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      throw error;
    }
  }

  /**
   * Get single opportunity by ID
   */
  async getOpportunityById(id, language = null) {
    try {
      return await Api(`/opportunities/${id}`, {}, language);
    } catch (error) {
      console.error('Error fetching opportunity by ID:', error);
      throw error;
    }
  }

  /**
   * Get opportunities for homepage
   */
  async getHomepageOpportunities(language = null) {
    return await this.getOpportunities(language, {
      limit: 8,
      fields: ['title', 'slug', '_id', 'city', 'opportunityId', 'citizenshipOutcome', 'endDate', 'startDate', 'thumbnail', 'summary', 'skills', 'refId']
    });
  }
}

export default new OpportunityApiService();










