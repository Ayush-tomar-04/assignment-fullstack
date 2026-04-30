const express = require("express");
const router = express.Router();

const { signup } = require("../Controllers/signup");
const { login } = require("../Controllers/login");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;