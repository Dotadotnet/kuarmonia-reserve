/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");
const verify = require("../middleware/verify.middleware");
const localeMiddleware = require("../middleware/locale.middleware");

/* internal import */
const adminController = require("../controllers/admin.controller");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// sign up an admin
router.post(
  "/sign-up",
  upload("avatar").single("avatar"),
  adminController.signUp
);

// sign in an admin
router.post("/sign-in", adminController.signIn);

// reset admin password
router.patch("/forgot-password", adminController.forgotPassword);

// login persistance
router.get("/me", verify, localeMiddleware, adminController.persistLogin);

// get all admins
router.get(
  "/all-admins",
  verify,
  localeMiddleware,
  authorize("superAdmin"),
  adminController.getAdmins
);

// get single admin
router.get(
  "/get-admin/:id",
  verify,
  localeMiddleware,
  authorize("superAdmin","admin"),
  adminController.getAdmin
);

// update admin information
router.patch(
  "/update-information/:id",
  verify,
  localeMiddleware,
  authorize("superAdmin", "admin"),
  upload("avatar").single("avatar"),
  adminController.updateAdminInfo
);

router.patch(
  "/update-admin/:id",
  verify,
  localeMiddleware,
  authorize("superAdmin", "admin"),
  upload("avatar").single("avatar"),
  adminController.updateAdmin
);

// delete admin information
router.delete(
  "/delete-admin/:id",
  verify,
  authorize("superAdmin", "admin"),
  adminController.deleteAdmin
);

/* export admin router */
module.exports = router;
