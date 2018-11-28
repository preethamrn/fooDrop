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
		name: String,
		description: String,
		imageUrl: String,
		ingredients: [{type: String}],
		dietaryRestrictions: [{type: String}],
		location: {lat:Number, lon:Number},
		price: Number,
		sellerID: String,
		buyerID: String,
		quantity: Number
	}],
	chats: [{
		chatId: String,
		buyer: String,
		buyerId: String,
		seller: String,
		sellerId: String
	}]
},{ versionKey: false });

var User = mongoose.model("User", UserSchema);
module.exports = User;