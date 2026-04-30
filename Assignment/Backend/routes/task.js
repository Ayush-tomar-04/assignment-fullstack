const express = require("express");
const router = express.Router();

const { createTask, getTasks } = require("../Controllers/Task");
const { auth } = require("../middleware/auth");

// create task
router.post("/tasks", auth, createTask);

// get all tasks
router.get("/tasks", auth, getTasks);

module.exports = router;