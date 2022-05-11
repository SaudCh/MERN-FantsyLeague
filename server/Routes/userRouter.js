const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.get("/login/:email/:password", userController.login);
router.post("/adduser", userController.register);
router.patch("/updateuser", userController.updateUser)
router.get("/byid/:id", userController.getUser);
router.get("/viewall", userController.getAllUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;