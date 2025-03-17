const express = require("express");
const sessionController = require("../controllers/session.controller");

const router = express.Router();

router.post("/create", sessionController.initSession);
router.get("/me", sessionController.getSession);
router.get("/clear", sessionController.clearSession);

module.exports = router;
