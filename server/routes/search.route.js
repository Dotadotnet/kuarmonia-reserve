const express = require("express");

const upload = require("../middleware/upload.middleware");
const searchController = require("../controllers/search.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

const router = express.Router();

router.get("/text/:text", searchController.textSearch);

module.exports = router;

// , verify, authorize("superAdmin", "admin"),