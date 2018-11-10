var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  dietaryRestrictions: [{type: String}], 
  title: String,
  description: String,
  ingredients: [{type: String}],
  price: Number, 
  sellerId: Number, 
  quantity:Number 
},{ versionKey: false });

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;