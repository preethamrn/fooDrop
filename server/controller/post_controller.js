const mongoose = require('mongoose');
var Post = require("../models/post");
const ObjectId = mongoose.Types.ObjectId;



exports.getDistanceFromLatLonInMiles = function(lat1,lon1,lat2,lon2) {

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c * 1.6; // Distance in Miles
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

exports.get_dish_by_id = function(object_id,callback){
  var post_id = ObjectId(object_id); 
  Post.findById(post_id, function(err,result){
	if (err) return console.error(err);
	else {
	  callback(result);
    }

  })
}

exports.get_dishes = function(ingredients,dietaryRestrictions,callback){


	var query;

    if(ingredients.length >= 1){

      query = Post.find({}).
      where('ingredients').in(ingredients).
      where('dietaryRestrictions').nin(dietaryRestrictions);
    }
    else 
    {
      query = Post.find({}).
      where('dietaryRestrictions').nin(dietaryRestrictions);
    }


    query.exec(function (err, result) {
        if (err) return console.error(err);
         callback(result); 
      })
}