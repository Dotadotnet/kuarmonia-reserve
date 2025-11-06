/* internal imports */
const requestService = require("../services/request.service");

/* create a new request */
exports.createRequest = async (req, res, next) => {
  try {
    await requestService.createRequest(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all requests */
exports.getRequests = async (req, res, next) => {
  try {
    await requestService.getRequests(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get single request */
exports.getRequest = async (req, res, next) => {
  try {
    await requestService.getRequest(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update request status */
exports.updateRequest = async (req, res, next) => {
  try {
    await requestService.updateRequest(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete request */
exports.deleteRequest = async (req, res, next) => {
  try {
    await requestService.deleteRequest(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};