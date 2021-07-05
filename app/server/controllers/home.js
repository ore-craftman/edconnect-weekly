const express = require("express");
const { default: Signup } = require("../../views/Signup");
const projectService = require("../services/project");

const router = express.Router();

router.get("/", (req, res) => {
  const user = req.session.user;
  res.render("Home", {
    projects: projectService.getAll().slice(0, 4),
    userInstance: user,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
