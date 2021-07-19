const express = require("express");
const router = express.Router();
const projectService = require("../services/project");
const userService = require("../services/user");

router.get("/projects/submit", (req, res) => {
  const user = req.session.user;
  const error = req.flash("error");
  if (!user) {
    res.redirect("/login");
  } else {
    res.render("CreateProject", { clientErrors: error, userInstance: user });
  }
});

router.post("/projects/submit", async (req, res) => {
  const creatorsId = req.session.user._id;
  let authorsArr = [];
  let tagsArr = [];

  req.body.authors.split(",").forEach((author) => {
    authorsArr.push(author.trim());
  });

  req.body.tags.split(",").forEach((tag) => {
    tagsArr.push(tag.trim());
  });

  let projectDataObj = {
    name: req.body.name,
    abstract: req.body.abstract,
    authors: authorsArr,
    tags: tagsArr,
    createdBy: creatorsId,
  };

  const [status, projectOrError] = await projectService.create(projectDataObj);

  if (status) {
    res.redirect("/");
  } else {
    req.flash("error", projectOrError);
    res.redirect("/projects/submit");
  }
});

router.get("/project/:id", async (req, res) => {
  const projectData = await projectService.getById(req.params.id);
  let fName = null;
  let lName = null;
  if (projectData.createdBy) {
    const projectCreator = await userService.getById(projectData.createdBy);
    fName = projectCreator.firstname;
    lName = projectCreator.lastname;
  }

  res.render("Project", {
    projectData: projectData,
    creatorsFirstName: fName,
    creatorsLastName: lName,
  });
});

module.exports = router;
