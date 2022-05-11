const express = require("express");
const router = express.Router();
const playerController = require("../Controllers/playerController");
const fileUpload = require("../Middleware/fileUpload")

router.post("/add", fileUpload.single('image'), playerController.addPlayer);
router.patch("/update", playerController.updatePlayer);
router.patch("/updatepoints", playerController.updatePoints);
router.delete("/delete/:id", playerController.deletePlayer);
router.get("/getById/:id", playerController.getPlayerById);
router.get("/viewall", playerController.getAllPlayers);

module.exports = router;