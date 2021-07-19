const express = require("express");
const { default: Signup } = require("../../views/Signup");
const projectService = require("../services/project");

const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.session.user;
  const projectData = await projectService.getAll();
  res.render("Home", {
    projects: projectData,
    userInstance: user,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
