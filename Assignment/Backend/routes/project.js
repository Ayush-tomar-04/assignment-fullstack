const express = require("express");
const router = express.Router();

const {
  createProject,
  addMember,
  getProjects
} = require("../Controllers/Project");

const { auth, isAdmin } = require("../middleware/auth");

// CREATE PROJECT
router.post("/projects", auth, isAdmin, createProject);

// ADD MEMBER
router.post("/projects/add-member", auth, isAdmin, addMember);

// GET PROJECTS
router.get("/projects", auth, getProjects);

module.exports = router;