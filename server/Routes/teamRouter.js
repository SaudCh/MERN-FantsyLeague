const express = require("express");
const router = express.Router();
const teamController = require("../Controllers/teamController");

router.post("/createteam", teamController.createTeam);
router.get("/viewall", teamController.viewAllTeams)
router.get("/viewteam/:id", teamController.viewTeamById);
router.get("/byuser/:id", teamController.viewTeamByUser);
router.patch("/update", teamController.updateTeam);
router.patch("/deletePlayer/:id/:cat", teamController.deletePlayerFromTeam);

module.exports = router;