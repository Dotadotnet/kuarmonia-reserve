

/* internal imports */
const userService = require("../services/user.service");

exports.signUpWithPhone = async (req, res, next) => {
  try {
    await userService.signUpWithPhone(req, res);
  } catch (error) {
    next(error);
  }
};

exports.verifyPhone = async (req, res, next) => {
  try {
    await userService.verifyPhone(req, res);
  } catch (error) {
    next(error);
  }
};

exports.signUpWithGoogle = async (req, res, next) => {
  try {
    await userService.signUpWithGoogle(req, res);
  } catch (error) {
    next(error);
  }
};


/* login persistance */
exports.persistLogin = async (req, res, next) => {
  try {
    await userService.persistLogin(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all users */
exports.getUsers = async (req, res, next) => {
  try {
    await userService.getUsers(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get single user */
exports.getUser = async (req, res, next) => {
  try {
    await userService.getUser(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update user information */
exports.updateUser = async (req, res, next) => {
  try {
    await userService.updateUser(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update user information */
exports.updateUserInfo = async (req, res, next) => {
  try {
    await userService.updateUserInfo(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete user information */
exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* seller request & approve */
exports.getSellers = async (req, res, next) => {
  try {
    await userService.getSellers(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.reviewSeller = async (req, res, next) => {
  try {
    await userService.reviewSeller(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
