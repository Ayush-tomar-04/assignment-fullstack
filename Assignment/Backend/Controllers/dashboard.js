const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const query = role === "admin" ? {} : { assignedTo: userId };

    const allTasks = await Task.find(query);

    const total = allTasks.length;
    const completed = allTasks.filter(t => t.status === "Done").length;
    const pending = allTasks.filter(t => t.status === "Todo" || t.status === "In Progress").length;
    const overdue = allTasks.filter(t =>
      t.deadline && new Date(t.deadline) < new Date() && t.status !== "Done"
    ).length;

    res.status(200).json({ total, completed, pending, overdue });
  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard", error: err.message });
  }
};