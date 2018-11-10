var express = require('express');
var router = express.Router();
var Post = require("../models/post");

/* GET home page. */

// var search = function(title, ){

// };

router.get('/get_dishes', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//array of info 

var name = "big mac";
var price = 10.15;
var description = "best dish ever";
var ingredients = ["eggs", "ham", "cheese"];
var allergies = ["peanuts", "seafood"];


router.post('/new_dish', (req, res) => {

  var new_dish = new Post({
    dietaryRestrictions: allergies,
    title: name,
    description: description,
    ingredients: ingredients,
    price: price
  })

  console.log("hi");

  new_dish.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })

  //res.send({ success: true, dish: { name: 'testDish', ingredients: ['carrots'], dietaryRestrictions: [], price: 100, quantity: 1, sellerId: '1234' } })

})

module.exports = router;
