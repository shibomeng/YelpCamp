var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: String,
   // location: String,
   // lat: Number,
   // lng: Number,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user"
      },
      username: String
   },
   comment: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "comment"
      }
   ]
});

module.exports = mongoose.model("campGround", campSchema);
