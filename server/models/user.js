var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	facebookID: String,
	paypalID: String,
	radius: Number,
	priceLow: Number,
	priceHigh: Number,
	restrictions: [{type: String}],
	transactions: [{
		ingredients: [{type: String}],
		restrictions: [{type: String}],
		name: String,
		photo: String,
		location: {lat:Number, lon:Number},
		price: Number,
		sellerID: String,
		buyerID: String,
		quantity: Number
	}]
},{ versionKey: false });

var User = mongoose.model("User", UserSchema);
module.exports = User;