var express = require("express");
var router = express.Router();
var user = require("../models/user");
var passport = require("passport");

//landingpage
router.get("/", function(req, res) {
    res.render("landingPage");
});

router.get("/register", function(req, res) {
   res.render("auth/register");
});

router.post("/register", function(req, res) {
    user.register(new user({username: req.body.username}), req.body.password, function(err, user) {
       if (err) {
          res.render("auth/register", {"error": err.message});
       } else {
          passport.authenticate("local")(req, res, function() {
          req.flash("success", "Nice to See You " + req.body.username + " !");
          res.redirect("/campground");
       });
      }
   });
});

router.get("/login", function(req, res) {
   res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect:"/login",
    failureFlash: true
}), function(req, res) {
    if (req.user) {
        req.flash("success", "Welcome Back " + req.user.username + " !");
        res.redirect("/campground");
    }
});

router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged You Out!");
   res.redirect("/campground");
});


module.exports = router;