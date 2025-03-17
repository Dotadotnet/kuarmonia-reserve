
/* internal import */
const galleryService = require("../services/gallery.service");

/* add new gallery */
exports.addGallery = async (req, res, next) => {
  try {
    await galleryService.addGallery(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all gallerys */
exports.getGalleries = async (req, res, next) => {
  try {
    await galleryService.getGalleries(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a gallery */
exports.getGallery = async (req, res, next) => {
  try {
    await galleryService.getGallery(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a gallery */
exports.getFirstGallery = async (req, res, next) => {
  try {
    await galleryService.getFirstGallery(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update gallery */
exports.updateGallery = async (req, res, next) => {
  try {
    await galleryService.updateGallery(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete gallery */
exports.deleteGallery = async (req, res, next) => {
  try {
    await galleryService.deleteGallery(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
