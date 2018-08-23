var campGround = require("../models/camp");
var Comments = require("../models/comment");
var midddlewareObj = {};

midddlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
};

midddlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comments.findById(req.params.comment_id, function(err, comment) {
           if (err) {
               res.redirect("back");
           } else {
               if (!comment) {
                   req.flash("error", "Cannot Retrieve The Data");
                   res.redirect("back");
               }
               if (comment.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "You Don't Have The Permission!");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};

midddlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        campGround.findById(req.params.id, function(err, camp) {
           if (err) {
               res.redirect("back");
           } else {
               if (!camp) {
                   req.flash("error", "Cannot Retrieve The Data");
                   res.redirect("back");
               }
               if (camp.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "You Don't Have The Permission!");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};

module.exports = midddlewareObj;