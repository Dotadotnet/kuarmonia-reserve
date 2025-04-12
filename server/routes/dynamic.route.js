

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const dynamicController = require("../controllers/dynamic.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */



router.get("/get/:model/:key/:value", dynamicController.get);
router.patch("/update/:model/:key/:value/:field/:newvalue", verify, authorize("superAdmin", "admin"), dynamicController.update);
router.get("/delete/:model/:key/:value", verify, authorize("superAdmin", "admin"), dynamicController.delete);

module.exports = router;

// , verify, authorize("superAdmin", "admin"),