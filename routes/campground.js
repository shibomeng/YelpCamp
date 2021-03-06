var express = require("express");
var router = express.Router();
var campGround = require("../models/camp");
var midddleware = require("../middleware");
// var geocoder = require('geocoder');

//index
router.get("/", function(req, res) {
    campGround.find({}, function(err, camps) {
        if (err) {
            console.log(("Can't retrieve data"));
        } else {
            res.render("campGround/Index", {campground: camps});
        }
    });
});

//new
router.post("/", midddleware.isLoggedIn, function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var description = req.body.description;
   var author = {
     id: req.user._id,
     username: req.user.username
   };
   var newCamp = {name: name, price: price, image: image, description: description, author: author};
//   geocoder.geocode(req.body.location, function (err, data) {
//       if (err || data.status === 'ZERO_RESULTS') {
//           req.flash('error', 'Invalid address');
//           return res.redirect('back');
//         }
//         var lat = data.results[0].geometry.location.lat;
//         var lng = data.results[0].geometry.location.lng;
//         var location = data.results[0].formatted_address;
//         var newCamp = {name: name, price: price, image: image, description: description, author: author, location: location, lat: lat, lng: lng};
//         campGround.create(newCamp, function(err, newCamp){
//           if (err) {
//               console.log("Can't add new camp");
//           } else {
//               req.flash("success", "Successfully Added New Campground!");
//               res.redirect("/campground");
//           }
//       });
//   });
   campGround.create(newCamp, function(err, newCamp){
       if (err) {
           console.log("Can't add new camp");
       } else {
           req.flash("success", "Successfully Added New Campground!");
           res.redirect("/campground");
       }
   });
});

//new
router.get("/new", midddleware.isLoggedIn, function(req, res) {
   res.render("campGround/New");
});


//show
router.get("/:id", function(req, res, next) {
    campGround.findById(req.params.id).populate("comment").exec(function(err, foundcamp) {
        if (err) {
            console.log("Didn't find the camp");
            next();
        } else {
            res.render("campGround/show", {camp: foundcamp});
        }
    });
});

//Edit
router.get("/:id/edit", midddleware.checkCampgroundOwnership, function(req, res) {
   campGround.findById(req.params.id, function(err, camp) {
        res.render("campGround/edit", {camp: camp});
   });
});

//Update
router.put("/:id", midddleware.checkCampgroundOwnership, function(req, res) {
    campGround.findByIdAndUpdate(req.params.id, req.body.campground, function(err, camp) {
       req.flash("success", "Successfully Updated!");
       res.redirect("/campground/" + req.params.id);
   });
});

//Delete
router.delete("/:id",  midddleware.checkCampgroundOwnership, function(req, res) {
    campGround.findByIdAndRemove(req.params.id, function(err) {
       req.flash("success", "Successfully Deleted!");
       res.redirect("/campground");
    });
});



router.get("/colorgame", function(req, res) {
    res.render("colorgame/Index");
});


module.exports = router;