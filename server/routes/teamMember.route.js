

/* external import */
const express = require("express");

/* middleware imports */
const upload = require("../middleware/upload.middleware");

/* internal import */
const teamMemberController = require("../controllers/teamMember.controller");
const verify = require("../middleware/verify.middleware");
const authorize = require("../middleware/authorize.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */

// add new teamMember
router.post(
  "/add-teamMember",
  verify,
  authorize("admin", "superAdmin"),
  upload('team').single("teamMember"),
  teamMemberController.addTeamMember
);

// get all teamMembers
router.get("/get-teamMembers", teamMemberController.getTeamMembers);

// get teamLeader

router.get("/get-leader", teamMemberController.getLeader);

// get a teamMember
router.get("/get-teamMember/:id", teamMemberController.getTeamMember);

// update teamMember
router.patch(
  "/update-teamMember/:id",
  verify,
  authorize("admin", "seller"),
  upload('teamMember').single("thumbnail"),
  teamMemberController.updateTeamMember
);

// delete teamMember
router.delete(
  "/delete-teamMember/:id",
  verify,
  authorize("admin", "superAdmin"),
  teamMemberController.deleteTeamMember
);

module.exports = router;
