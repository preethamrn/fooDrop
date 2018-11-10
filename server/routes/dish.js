var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Post = require("../models/post");


/* GET home page. */

var search = function(radius, ingredients, dietaryRestrictions){
};

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

module.exports = router;
