

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

router.get("/get-one/:model/:key/:value", dynamicController.getOne);
router.get("/get-by-id/:model/:id", dynamicController.getByID);
router.get("/get-all/:model", dynamicController.getAll);
router.get("/count-all/:model", dynamicController.countAll);
router.get("/count/:model/:key/:value", dynamicController.count);

router.get("/get/:model/:key/:value", dynamicController.get);

router.patch("/update/:model/:key/:value/:field/:newvalue", verify, authorize("superAdmin", "admin"), dynamicController.update);
router.delete("/delete/:model/:key/:value", verify, authorize("superAdmin", "admin"), dynamicController.delete);


module.exports = router;

// , verify, authorize("superAdmin", "admin"),