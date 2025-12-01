/* internal import */
const contactService = require("../services/contact.service");

/* create new contact message */
exports.createContact = async (req, res, next) => {
  try {
    await contactService.createContact(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all contact messages */
exports.getContacts = async (req, res, next) => {
  try {
    await contactService.getContacts(res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get single contact message */
exports.getContact = async (req, res, next) => {
  try {
    await contactService.getContact(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update contact message */
exports.updateContact = async (req, res, next) => {
  try {
    await contactService.updateContact(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete contact message */
exports.deleteContact = async (req, res, next) => {
  try {
    await contactService.deleteContact(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};