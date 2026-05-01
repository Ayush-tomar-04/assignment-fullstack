const express = require("express");
const router = express.Router();
const { signup } = require("../Controllers/signup");
const { login } = require("../Controllers/login");
const { auth } = require("../middleware/auth");
const User = require("../models/User");

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;