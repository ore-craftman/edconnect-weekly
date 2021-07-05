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

router.post("/projects/submit", (req, res) => {
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
  };

  const [status, projectOrError] = projectService.create(projectDataObj);

  if (status) {
    res.redirect("/");
  } else {
    req.flash("error", projectOrError);
    res.redirect("/projects/submit");
  }
});

router.get("/project/:id", (req, res) => {
  const { id } = req.params;
  const projectData = projectService.getById(id);
  let fName = null;
  let lName = null;
  // console.log("Project Data", projectData);
  // if (projectData) {
  //   const projectCreator = userService.getById(projectData.createdBy);
  //   fName = projectCreator.firstname;
  //   lName = projectCreator.lastname;
  // }

  res.render("Project", {
    projectData: projectData,
    creatorsFirstName: fName,
    creatorsLastName: lName,
  });
});

module.exports = router;
