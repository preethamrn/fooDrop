const mongoose = require('mongoose');
var User = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;

/** 
 * User Controller Module
 * @module User_Controller
 */

/**
     * Updates a user based on user_id with values in the values array
     * @param {String} user_id - user_id of the user we are trying to update
     * @param {String[]} values - array of values we are trying to update to
     * @param {callback} callback - callback function that is called after processing is done
     */
exports.updateUser = function(user_id,values,callback){

    User.findById(user_id, function(error, user){
      if (error || !user) {
        console.error(error);
        callback(1,user);
        return; 
      }

      for(var key in values){
        user[key] = values[key];
      }

      user.save(function(error)
      {
        if(error)
        {
          console.log(error);
          callback(1,user);
          return; 
        }
      })

      callback(0,user);

    })
}