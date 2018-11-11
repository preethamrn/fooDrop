var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Post = require("../models/post");


/* GET home page. */

var search = function(radius, ingredients, dietaryRestrictions){
};

router.post('/', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});


router.get('/get_dishes', function(req, res, next) {

	Post.find(function (err, result) {
  if (err) return console.error(err);

var ingredients = []; 
var dietaryRestrictions = []; 


if (!req.query.ingredients)
	ingredients = []
else 
  ingredients = req.query.ingredients;

if (!req.query.dietaryRestrictions)
	dietaryRestrictions = []
else 
  dietaryRestrictions = req.query.dietaryRestrictions;


  if(ingredients.length >= 1)
  	result = result.filter(dish => (dish["ingredients"].filter(value => -1 !== ingredients.indexOf(value))).length > 0);

 	if(dietaryRestrictions.length >= 1)
  	result = result.filter(dish => (dish["dietaryRestrictions"].filter(value => -1 !== dietaryRestrictions.indexOf(value))).length <= 0);

  res.contentType('application/json');
	res.send(JSON.stringify(result));
  })
});

//array of info 

var name = "big mac";
var price = 10.15;
var description = "best dish ever";
var ingredients = ["eggs", "ham", "cheese"];
var allergies = ["peanuts", "seafood"];

router.post('/new_dish', (req, res) => {

  var new_dish = new Post({
    dietaryRestrictions: req.body.dietaryRestrictions,
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    price: req.body.price
  })

  //console.log(req.body.FirstName);

  var body = req.body;

  new_dish.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!',
      body: body
    })
  })

  //res.send({ success: true, dish: { name: 'testDish', ingredients: ['carrots'], dietaryRestrictions: [], price: 100, quantity: 1, sellerId: '1234' } })

})

module.exports = router;
