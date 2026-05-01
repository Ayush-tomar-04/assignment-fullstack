const express = require("express");
const router = express.Router();
const { getDashboard } = require("../Controllers/dashboard");
const { auth } = require("../middlewares/auth");

router.get("/dashboard", auth, getDashboard);

module.exports = router;