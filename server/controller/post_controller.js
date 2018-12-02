const mongoose = require('mongoose');
var Post = require("../models/post");
var User = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;

/** 
 * User Controller Module
 * @module Post_Controller
 */

/**
 * Add a transaction to a given user
 * @param {String} user_id - The id of the user
 * @param {Object} transaction - The transaction object to add to the user
 * @param {callback} - A function to call after this is done executing
 */

exports.addTransaction = function(user_id,transaction,callback){

    User.findById(user_id, function(error, user){
      if (error || !user) {
        console.error(error);
        callback(1,user);
        return; 
      }

      console.log(user["transactions"]);
      console.log(transaction);

      user["transactions"].push(transaction);

      user.save(function(error)
      {
        if(error)
        {
          console.err(error);
          callback(1,user);
          return; 
        }
        
      })

      callback(0,user);

    })
}




/**
 * Update the quantity on a given post. 
 * @param {String} post_id - Uses the post_id
 * @param {Number} quantity - The quantity to be subtracted from the post
 * @param {callback} - A function to call after this is done executing
 */
exports.updatePostQ = function(post_id,quantity,callback){

    Post.findById(post_id, function(error, post){
      if (error || !post) {
        console.error(error);
        callback(1,post);
        return; 
      }

      var new_quantity = post["quantity"] - quantity;

      if(new_quantity == 0)
      {
        var temp_post = JSON.parse(JSON.stringify(post));
        post.remove();
        callback(0,temp_post);
        return; 
      }
      else if(new_quantity <= 0){
        callback(1,post); 
        return; 
      } 
      
      post["quantity"] = new_quantity; 
      post.save(function(error)
      {
        if(error)
        {
          console.log(error);
          callback(1,post);
          return; 
        }
        
      })

      callback(0,post);

    })
}

/**
 * Get the location from two lat/long pairs
 * @param {Number} Latitude 1 - Latitude of the first co-ordinate
 * @param {Number} Longitude 1 - Longitude of the first co-ordinate
 * @param {Number} Latitude 2 - Latitude of the second co-ordinate
 * @param {Number} Longitude 2 - Longitude of the second co-ordinate
 * @returns {Number} - The distance between the two given points 
*/
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


/**
 * Gets a specifc dish from the database by its id
 * @param {String} dish_id - id of the dish
 * @param {callback} - A function to call after this is done executing
*/
exports.get_dish_by_id = function(object_id,callback){
  var post_id = ObjectId(object_id); 
  Post.findById(post_id, function(err,result){
	if (err) return console.error(err);
	else {
	  callback(result);
    }

  })
}



/**
 *Gets all the dishes from db on the basis of the given params. 
 * @param {String[]} ingredients - Ingridients the user wants in the posts
 * @param {String[]} dietaryRestrictions - Any dietary restrictions the user has 
 * @param {Number} priceLow - User's lower price point
 * @param {Number} priceHigh - User's higher price point
 * @param {callback} - A function to call after this is done executing
 */
exports.get_dishes = function(ingredients,dietaryRestrictions,price_low,price_high,callback){

	var query = Post.find({});

    if(ingredients.length >= 1)
      query.where('ingredients').in(ingredients)

    if(dietaryRestrictions.length >= 1)
      query.where('dietaryRestrictions').all(dietaryRestrictions)

    query.where('price').gt(price_low).lt(price_high)


    query.exec(function (err, result) {
        if (err) return console.error(err);
         console.log(result);
         callback(result); 
      })
}