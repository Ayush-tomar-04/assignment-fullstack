const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, projectId, deadline } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title required" });
    }

    const taskData = { title, description };
    if (assignedTo && assignedTo !== "") taskData.assignedTo = assignedTo;
    if (projectId && projectId !== "") taskData.projectId = projectId;
    if (deadline && deadline !== "") taskData.deadline = deadline;

    const task = await Task.create(taskData);
    return res.status(200).json({ success: true, task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};