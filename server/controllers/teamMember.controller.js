
/* internal import */
const teamMemberService = require("../services/teamMember.service");

/* add new teamMember */
exports.addTeamMember = async (req, res, next) => {
  try {
    await teamMemberService.addTeamMember(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get all teamMembers */
exports.getTeamMembers = async (req, res, next) => {
  try {
    await teamMemberService.getTeamMembers(req,res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

exports.getLeader = async (req, res, next) => {
  try {
    await teamMemberService.getLeader(req,res); 
  } catch (error) {
    next(error); 
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* get a teamMember */
exports.getTeamMember = async (req, res, next) => {
  try {
    await teamMemberService.getTeamMember(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* update teamMember */
exports.updateTeamMember = async (req, res, next) => {
  try {
    await teamMemberService.updateTeamMember(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};

/* delete teamMember */
exports.deleteTeamMember = async (req, res, next) => {
  try {
    await teamMemberService.deleteTeamMember(req, res);
  } catch (error) {
    next(error);
  } finally {
    console.log(`Route: ${req.url} || Method: ${req.method}`);
  }
};
