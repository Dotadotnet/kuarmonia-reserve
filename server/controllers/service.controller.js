
/* internal import */
const serviceService = require("../services/service.service");

/* add new service */
exports.addService= async (req, res, next) => {
  try {
    await serviceService.addService(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all services */
exports.getAllService = async (req, res, next) => {
  try {
    await serviceService.getAllService(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a service */
exports.getService= async (req, res, next) => {
  try {
    await serviceService.getService(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update service */
exports.updateService= async (req, res, next) => {
  try {
    await serviceService.updateVenue(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete service */
exports.deleteService= async (req, res, next) => {
  try {
    await serviceService.deleteService(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
