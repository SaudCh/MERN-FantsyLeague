const express = require("express");
const router = express.Router();
const squadController = require("../Controllers/squadController");
const fileUpload = require("../Middleware/fileUpload")

router.post("/add", fileUpload.single('image'), squadController.createSquad);
router.patch("/update", squadController.updateSquad);
// router.patch("/updatepoints", playerController.updatePoints);
router.delete("/delete/:id", squadController.deleteSquad);
// router.get("/getById/:id", playerController.getPlayerById);
router.get("/viewall", squadController.getAllSquad);

module.exports = router;