var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	chatId: String,
	buyer: String,
	seller: String,
	messages: [{
		userId: String,
		username: String,
		message: String
	}]
},{ versionKey: false });

var Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;