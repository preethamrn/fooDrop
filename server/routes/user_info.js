var express = require('express');
var router = express.Router();
var User = require("../models/user");
const mongoose = require('mongoose');
var User_Controller = require("../controller/user_controller");
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

  //for transactions, give me an empty list if user didn't have any transactions
  var transactions = req.body.transactions;

  var name = req.body.name;

  //for restrictions, give me an empty list if user didn't add any transactions, in the future I can just append to the list of restrictions
  var	restrictions = req.body.restrictions;

  var new_user = new User({
    name: name,
    facebookID: facebookID,
    paypalID: paypalID,
    radius: radius,
    restrictions: restrictions,
    transactions: transactions
    })
  
  new_user.save(function (error, result) {
    if (error) {
      console.log(error)
    }

    console.log(result._id);
    console.log(result.restrictions);
    console.log(result.name);

    res.send({
      success: true,
      message: 'User created successfully!',
      _id: result.id     
    })
  })
})

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
})

router.put('/update', (req, res)=> {
  var user_id = req.body._id
  var values = req.body.values; //expecting an array of values
  User_Controller.updateUser(user_id, values, function(error,result){
    if(error){
    res.status(400).send({
      status: "fail"
    })
    return; 
    }

    res.send({
      user: result,
      status: "pass"
    })
  })
})

module.exports = router;