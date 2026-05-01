const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, projectId, deadline } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title required" });
    }
    const task = await Task.create({ title, description, assignedTo, projectId, deadline });
    return res.status(200).json({ success: true, task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Task creation failed" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name");
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to load tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    return res.status(200).json({ success: true, task });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Update failed" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};