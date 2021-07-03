const { response } = require("express");
const express = require("express");
const { default: Signup } = require("../../views/Signup");
const school = require("../services/school");
const router = express.Router();
const userService = require("../services/user");

router.get("/signup", (req, res) => {
  const error = req.flash("error");

  const user = req.session.user;

  res.render("Signup", {
    programs: school.getPrograms(),
    gradYears: school.getGradYears(),
    error: error,
    userInstance: user,
  });
});

router.post("/signup", (req, res) => {
  const [status, userResponse] = userService.create(req.body);
  if (status) {
    req.session.user = userResponse;
    res.redirect("/");
  } else {
    req.flash("error", userResponse);
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  const error = req.flash("loginError");
  const user = req.session.user;
  res.render("Login", { error: error, userInstance: user });
});

router.post("/login", (req, res) => {
  const [status, userOrError] = userService.authenticate(
    req.body.email,
    req.body.password
  );

  if (status) {
    req.session.user = userOrError;
    res.redirect("/");
  } else {
    req.flash("loginError", userOrError);
    res.redirect("/login");
  }
});

module.exports = router;
