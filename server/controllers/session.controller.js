const sessionService = require("../services/session.service");

// init session
exports.initSession = async (req, res, next) => {
  try {
    await sessionService.initSession(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

// get session
exports.getSession = async (req, res, next) => {
  try {
    await sessionService.getSession(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

// clear session
exports.clearSession = async (req, res, next) => {
  try {
    await sessionService.deleteSession(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
