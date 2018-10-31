var mongoose = require('mongoose');
const config = require('../config')

module.exports.connect = function() {
	mongoose.connect('mongodb://localhost:27017/cubeonline', { auth:{ authdb:"cubeonline" }, user: config.DB_USERNAME, pass: config.DB_PASSWORD });
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}
