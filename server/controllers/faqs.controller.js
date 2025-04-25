

/* internal import */
const faqsService = require("../services/faqs.service");

/* add new faqs */
exports.addFaqs = async (req, res, next) => {
  try {
    await faqsService.addFaq(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all categories */
exports.getFaqs = async (req, res, next) => {
  try {
    await faqsService.getFaqs(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};




/* get a faqs */
exports.getFaq = async (req, res, next) => {
  try {
    await faqsService.getFaq(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update faqs */
exports.updateFaqs = async (req, res, next) => {
  try {
    await faqsService.updateFaqs(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete faqs */
exports.deleteFaqs = async (req, res, next) => {
  try {

    await faqsService.deleteFaqs(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
