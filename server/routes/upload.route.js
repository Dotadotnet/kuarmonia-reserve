// /* external import */
// const express = require("express");

// /* middleware imports */
// const upload = require("../middleware/upload.middleware");
// const verify = require("../middleware/verify.middleware");

// const uploadController = require("../controllers/upload.controller");
// const authorize = require("../middleware/authorize.middleware");

// const router = express.Router();


// router.post(
//   "/add-upload",
//   verify,
//   authorize("superAdmin"),
//   upload("upload").single("upload"),
//   uploadController.signUpWithPhone
// );


// // login persistance
// router.get("/me", verify,  uploadController.persistLogin);



// module.exports = router;
