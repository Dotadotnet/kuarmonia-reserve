const Opportunity = require('../../models/opportunity.model');
const { processTranslationsArray } = require('../../utils/translationHelper');

/**
 * Opportunity API service
 */
class OpportunityApiService {
  /**
   * Get opportunities with translations
   */
  async getOpportunities(language = 'fa', options = {}) {
    const {
      limit = 10,
      skip = 0,
      fields = ['title', 'slug', '_id', 'city', 'opportunityId', 'citizenshipOutcome', 'endDate', 'startDate', 'thumbnail', 'summary', 'skills', 'refId'],
      sort = { createdAt: -1 }
    } = options;

    try {
      const opportunities = await Opportunity.find()
        .select(fields.join(' '))
        .populate([
          {
            path: 'translations.translation',
            match: { language }
          },
          {
            path: 'city',
            populate: {
              path: 'translations.translation',
              match: { language }
            }
          },
          {
            path: 'citizenshipOutcome',
            populate: {
              path: 'translations.translation',
              match: { language }
            }
          }
        ])
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .lean();

      return processTranslationsArray(opportunities, language);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      throw error;
    }
  }

  /**
   * Get single opportunity by ID
   */
  async getOpportunityById(id, language = 'fa') {
    try {
      const opportunity = await Opportunity.findById(id)
        .populate([
          {
            path: 'translations.translation',
            match: { language }
          },
          {
            path: 'city',
            populate: {
              path: 'translations.translation',
              match: { language }
            }
          },
          {
            path: 'citizenshipOutcome',
            populate: {
              path: 'translations.translation',
              match: { language }
            }
          }
        ])
        .lean();

      if (!opportunity) return null;

      return processTranslationsArray([opportunity], language)[0];
    } catch (error) {
      console.error('Error fetching opportunity by ID:', error);
      throw error;
    }
  }
}

module.exports = new OpportunityApiService();

