var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	chatId: String,
	messages: [{
		userId: String,
		message: String
	}]
},{ versionKey: false });

var Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;