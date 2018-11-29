var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  dietaryRestrictions: [{type: String}],
  ingredients: [{type: String}],
  location: {lat:Number, lon:Number},
  price: Number,
  sellerId: String,
  sellerPaypalId: String,
  quantity: Number
},{ versionKey: false });

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;