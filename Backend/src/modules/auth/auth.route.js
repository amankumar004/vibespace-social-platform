const express = require("express");
const router = express.Router();
const { RegisterUser, LoginUser } = require("./auth.controller");

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);

module.exports = router;
