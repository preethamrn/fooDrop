const mongoose = require('mongoose');
var User = require("../models/user");
const ObjectId = mongoose.Types.ObjectId;


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