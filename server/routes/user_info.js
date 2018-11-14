var express = require('express');
var router = express.Router();
var User = require("../models/user");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.send('user profile');
});

router.get('/transactions', function(req, res, next) {
  res.send('transcation history');
});

//convention, we are sending strings over, even the objects are in strings
// router.post('/test',function(req, res, next) {

//   var tmp_arr = req.body.arr;
//   console.log(tmp_arr);

//   tmp_arr = JSON.parse(tmp_arr);

//   console.log(typeof(tmp_arr));

//   res.send("hi");
// });

router.post('/create', function(req,res,next){

  var	facebookID = req.body.facebookID;
  var	paypalID = req.body.paypalID;
  var	radius = req.body.radius;
  var transactions = req.body.transactions;

  var name = req.body.name;
  var	restrictions = req.body.restrictions;
/*
  console.log(restrictions);
  console.log(transactions);
  console.log(facebookID);
  console.log(paypalID);
  console.log(radius);
  console.log(name);
*/
  
  var new_user = new User( {
    name: name,
    facebookID: facebookID,
    paypalID: paypalID,
    radius: radius,
    restrictions: restrictions,
    transactions: transactions
    } )
  
  
  new_user.save(function (error) {
    if (error) {
      console.log(error)
    }
  res.send({
      success: true,
      message: 'User created successfully!'
    })
  })

  
  
});



/*
router.get('/get_user', (req, res) => {
  var user_id = ObjectId(req.query.user_id); 
  User.findById(user_id, function(err,result){
    if (err) return console.error(err);
    else {
      res.contentType('application/json');
      res.send(JSON.stringify(result));
    }

  })
})

router.get('/get_users', (req, res) => {
  User.find({}, function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	})
}) */

module.exports = router;