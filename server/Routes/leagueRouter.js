const express = require("express");
const router = express.Router();
const leagueController = require("../Controllers/leagueController")

router.post("/create", leagueController.createLeague);
router.delete("/delete/:id", leagueController.deleteLeague);
router.delete("/remove/:id/:user", leagueController.removeLeague);
router.get("/join/:leagueId/:uid", leagueController.joinLeague);
router.get("/view/:leagueId", leagueController.viewLeague);

module.exports = router;
