const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, projectId, deadline } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title required"
            });
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            projectId,
            deadline
        });

        return res.status(200).json({
            success: true,
            task
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Task creation failed"
        });
    }
};

// ✅ ADD THIS (IMPORTANT)
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name");

        return res.status(200).json(tasks);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to load tasks"
        });
    }
};