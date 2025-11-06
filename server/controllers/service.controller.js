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

/* get all services with pagination */
exports.getServices = async (req, res, next) => {
  try {
    await serviceService.getServices(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};



/* get all services without pagination (for dashboard) */
exports.getAllServices = async (req, res, next) => {
  try {
    await serviceService.getAllServices(req, res);
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

exports.getServiceById= async (req, res, next) => {
  try {
    await serviceService.getServiceById(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};


/* update service */
exports.updateService= async (req, res, next) => {
  try {
    await serviceService.updateService(req, res);
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