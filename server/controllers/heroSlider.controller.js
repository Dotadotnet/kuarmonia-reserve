/* internal import */
const heroSliderService = require("../services/heroSlider.service");

exports.addHeroSlider = async (req, res, next) => {
  try {
    await heroSliderService.addHeroSlider(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.getHeroSliders = async (req, res, next) => {
  try {
    await heroSliderService.getHeroSliders(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.getHeroSlider = async (req, res, next) => {
  try {
    await heroSliderService.getHeroSlider(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.updateHeroSlider = async (req, res, next) => {
  try {
    await heroSliderService.updateHeroSlider(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.deleteHeroSlider = async (req, res, next) => {
  try {
    await heroSliderService.deleteHeroSlider(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};