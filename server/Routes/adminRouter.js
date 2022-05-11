const express = require("express");
const router = express.Router();
const admincontroller = require("../Controllers/adminController");

router.get("/login/:email/:password", admincontroller.login);
router.post("/updatepass", admincontroller.updatePassword);
router.post("/register", admincontroller.register);

module.exports = router;