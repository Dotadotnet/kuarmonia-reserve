
/* internal import */
const pageService = require("../services/page.service");

/* add new blog */
exports.home = async (req, res, next) => {
  try {
    await pageService.home(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};