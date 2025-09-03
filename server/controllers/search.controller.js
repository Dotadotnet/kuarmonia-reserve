
/* internal import */
const searchService = require("../services/search.service");

exports.textSearch = async (req, res, next) => {
  try {
    await searchService.textSearch(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
