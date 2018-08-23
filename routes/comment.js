var express = require("express");
var router = express.Router({mergeParams: true});
var campGround = require("../models/camp");
var Comments = require("../models/comment");
var midddleware = require("../middleware");

router.get("/new", midddleware.isLoggedIn, function(req, res) {
   campGround.findById(req.params.id, function(err, camp) {
       if (err) {
           console.log(err);
       } else {
        //   console.log(camp._id);
           res.render("comment/new", {camp: camp});
       }
   });
});

router.post("/", midddleware.isLoggedIn, function(req, res) {
    campGround.findById(req.params.id, function(err, camp) {
         if (err) {
             console.log(err);
             res.redirect("/campground");
         } else {
             Comments.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something Wrong...");
                    console.log(err);
                } else {
                    var author = {id : req.user._id, username: req.user.username};
                    comment.author = author;
                    comment.save();
                    camp.comment.push(comment);
                    camp.save();
                    req.flash("success", "Successfully Added New Comment!");
                    res.redirect("/campground/" + camp._id);
                }
             });
         }
    });
});

router.get("/:comment_id/edit", midddleware.checkCommentOwnership, function(req, res) {
    Comments.findById(req.params.comment_id, function(err, comment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comment/edit", {campId: req.params.id, comment: comment});
        }
    });
});

router.put("/:comment_id", midddleware.checkCommentOwnership, function(req, res) {
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, camp) {
       if (err) {
           res.redirect("back");
       } else {
           req.flash("success", "Successfully Updated!");
           res.redirect("/campground/" + req.params.id);
       }
    });
});

router.delete("/:comment_id", midddleware.checkCommentOwnership, function(req, res) {
    Comments.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Successfully Deleted!");
            res.redirect("/campground/" + req.params.id);
        }
    });
});

module.exports = router;