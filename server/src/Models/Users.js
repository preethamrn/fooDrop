var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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
})

// Suppose to check if user already exists or not. Does not work from here. Will look into.
userSchema.statics.findOrInsertFBUser = function(accessToken, refreshToken, profile, done) {
	var that = this;
	console.log("findOrInsertFBUser")
	console.log(mongoose.connection.readyState);
	return this.findOne({
		'facebookID': profile.id
	}), function(err, result) {
		if(err) {
			console.log(err)
		}
		else if (!result) {
			var newUser = new that({
				name: profile.displayName,
				facebookID: profile.id,
				paypalID: -1,
				radius: 2,
				restrictions: [],
				transactions: []
			})

			newUser.save(function(err, savedUser) {
				if(err) {
					console.log(err)
				}
				console.log(savedUser)
				return done(err, savedUser)
			})
		} 
		else {
			console.log(result)
			return done(err, result)
		}
	}
}

module.exports = userSchema