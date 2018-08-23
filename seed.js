var mongoose = require("mongoose"),
    Comment = require("./models/comment.js"),
    campGround = require("./models/camp.js");

var data = [
        {
            name: "Something Beautiful",
            image: "http://pic17.nipic.com/20111019/2177138_110656106000_2.jpg",
            description: "Click Me!",
        },
        {
            name: "demo",
            image: "http://pic110.nipic.com/file/20160922/9606491_105423319000_2.jpg",
            description: "demo"
        }
];

function seedDB() {
    campGround.remove({}, function(err) {
       if (err) {
           console.log("ERROR REMOVE");
       } else {
            data.forEach(function(seed) {
                campGround.create(seed, function(err, camp) {
                  if (err) {
                      console.log("ERROR CREATE");
                  } else {
                      Comment.create({
                          text: "This is greate",
                          author: "Johnny"
                      }, function(err, comment) {
                          if (err) {
                              console.log("ERROR CREATE COMMENT");
                          } else {
                            camp.comment.push(comment._id);
                            camp.save();
                          }
                      });
                  }
                });
            });
       }
    });
}

module.exports = seedDB;