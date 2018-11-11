var express = require('express');
var router = express.Router();
var User = require("../models/user");


/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.send('user profile');
});

router.get('/transactions', function(req, res, next) {
  res.send('transcation history');
});

router.get('/create', function(req,res,next){

  var post_id = 10;
  var date = Date.now();
  var post_object = { amount:5, dish_name:"whooper" };
  var price = 19;
  var dietaryRestrictions = ["chocolate", "shellfish"];
  var name = "leslie liang"
  var paypal = 69;
  var rating = 5;

  var new_user = new User({
    date: date,
    post_object: post_object,
    price: price,
    dietaryRestrictions: dietaryRestrictions,
    name: name,
    paypalID: paypal,
    rating: rating
  })

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

router.get('/get_users', (req, res) => {
  User.find({}, function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	})
})

module.exports = router;