

/* internal import */
const promoBannerService = require("../services/promoBanner.service");

exports.addBannerSlider = async (req, res, next) => {
  try {
    await promoBannerService.addBannerSlider(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* add new promoBanner */
exports.addPromoBanner = async (req, res, next) => {
  try {
    await promoBannerService.addPromoBanner(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all categories */
exports.getbanners = async (req, res, next) => {
  try {
    await promoBannerService.getbanners(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get a promoBanner */
exports.getPromoBanner = async (req, res, next) => {
  try {
    await promoBannerService.getPromoBanner(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update promoBanner */
exports.updatePromoBanner = async (req, res, next) => {
  try {
    await promoBannerService.updatePromoBanner(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete promoBanner */
exports.deletePromoBanner = async (req, res, next) => {
  try {

    await promoBannerService.deletePromoBanner(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
