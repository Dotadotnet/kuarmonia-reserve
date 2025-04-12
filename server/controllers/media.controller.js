
/* internal import */
const mediaService = require("../services/media.service");

/* add new media */
exports.addMedia = async (req, res, next) => {
  try {
    await mediaService.addMedia(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all medias */
exports.getMedias = async (req, res, next) => {
  try {
    await mediaService.getMedias(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a media */
exports.getMedia = async (req, res, next) => {
  try {
    await mediaService.getMedia(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.getMediaById = async (req, res, next) => {
  try {
    await mediaService.getMediaById(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update media */
exports.updateMedia = async (req, res, next) => {
  try {
    await mediaService.updateMedia(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete media */
exports.deleteMedia = async (req, res, next) => {
  try {
    await mediaService.deleteMedia(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
