

/* internal import */
const favoriteService = require("../services/favorite.service");

/* add to favorite */
exports.addToFavorite = async (req, res,next) => {
  try {
    await favoriteService.addToFavorite(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get favorites */
exports.getFavorites = async (req, res,next) => {
  try {
    await favoriteService.getFavorites(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete favorite */
exports.deleteFromFavorite = async (req, res,next) => {
  try {
    await favoriteService.deleteFromFavorite(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
