const mongoose = require('mongoose');
var User = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;


exports.updateUser = function(values,callback){

	var user_id = ObjectId(values["_id"]);
    User.findById(user_id, function(error, user){
      if (error) console.error(error);

      for(var key in values){
        user[key] = values[key];
      }

      user.save(function(error)
      {
        if(error)
        {
          console.log(error);
        }
        
      })

      callback(user);

    })
}