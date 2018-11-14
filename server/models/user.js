var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	facebookID: String,
	paypalID: String,
	radius: Number,
	restrictions: [{type: String}],
	transactions: [{
		ingredients: [{type: String}],
		restrictions: [{type: String}],
		name: String,
		photo: String,
		location: String,
		price: Number,
		sellerID: String,
		quantity: Number
	}]
},{ versionKey: false });

var User = mongoose.model("User", UserSchema);
module.exports = User;