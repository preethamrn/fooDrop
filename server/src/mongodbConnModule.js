var mongoose = require('mongoose');
const config = require('../config')

module.exports.connect = function() {
    // TODO (IMPORTANT): add database security (username and password authentication)
	//mongoose.connect('mongodb://localhost:27017/foodrop', { auth:{ authdb:"foodrop" }, user: config.DB_USERNAME, pass: config.DB_PASSWORD });
	mongoose.connect('mongodb://localhost:27017/foodrop', {});
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}
