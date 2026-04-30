const Project = require("../models/Project");

// CREATE
exports.createProject = async (req, res) => {
  try {
    const { projectName, description } = req.body;

    if (!projectName) {
      return res.status(400).json({
        success: false,
        message: "Project name required"
      });
    }

    const project = await Project.create({
      projectName,
      description,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.status(200).json({
      success: true,
      project
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Project creation failed"
    });
  }
};

// ADD MEMBER
exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      project
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add member"
    });
  }
};

// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members", "name email")
      .populate("createdBy", "name email");

    res.status(200).json(projects);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load projects"
    });
  }
};