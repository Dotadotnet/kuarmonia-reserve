

/* internal import */
const socialLinkService = require("../services/socialLink.service");

/* add new socialLink */
exports.addSocialLink = async (req, res, next) => {
  try {
    await socialLinkService.addSocialLink(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all socialLinks */
exports.getCategories = async (req, res, next) => {
  try {
    await socialLinkService.getCategories(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get socialLinks with products */
exports.getProductCategories = async (req, res, next) => {
  try {
    await socialLinkService.getProductCategories(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* get a socialLink */
exports.getSocialLink = async (req, res, next) => {
  try {
    await socialLinkService.getSocialLink(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update socialLink */
exports.updateSocialLink = async (req, res, next) => {
  try {
    await socialLinkService.updateSocialLink(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete socialLink */
exports.deleteSocialLink = async (req, res, next) => {
  try {

    await socialLinkService.deleteSocialLink(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
