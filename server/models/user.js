var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  //TODO: need to add default radius
  userId: {type: Number, default: 100}, //question, how do we get a generated sellerId?
  transaction_post_id: Number,
  date: Date,
  post_object: Schema.Types.Mixed,
  price: Number, //(this can be plus or minus)
  dietaryRestrictions: [{type: String}], 
  name: String,
  paypayID: Number,
  rating: Number,
  radius: {type: Number, default: 1}
},{ versionKey: false });

var User = mongoose.model("User", UserSchema);
module.exports = User;