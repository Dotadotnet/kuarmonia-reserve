
/* internal import */
const newsService = require("../services/news.service");

/* add new news */
exports.addNews= async (req, res, next) => {
  try {
    await newsService.addNews(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all newss */
exports.getAllNews = async (req, res, next) => {
  try {
    await newsService.getAllNews(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a news */
exports.getNews= async (req, res, next) => {
  try {
    await newsService.getNews(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update news */
exports.updateNews= async (req, res, next) => {
  try {
    await newsService.updateVenue(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete news */
exports.deleteNews= async (req, res, next) => {
  try {
    await newsService.deleteNews(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
