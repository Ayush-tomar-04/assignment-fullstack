const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require("../Controllers/Task");
const { auth } = require("../middleware/auth");

router.post("/tasks", auth, createTask);
router.get("/tasks", auth, getTasks);
router.put("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, deleteTask);

module.exports = router;