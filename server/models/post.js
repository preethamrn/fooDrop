var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  dietaryRestrictions: [{type: String}], 
  title: String,
  description: String,
  ingredients: [{type: String}],
  price: Number, 
  location: {lat:Number, lon:Number},
  sellerId: {type: Number, default: 100}, //question, how do we get a generated sellerId?
  quantity: { type: Number, default: 1} 
},{ versionKey: false });

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;