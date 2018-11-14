var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Post = require("../models/post");
const ObjectId = mongoose.Types.ObjectId;

/* GET home page. */

var search = function(radius, ingredients, dietaryRestrictions){
};

router.post('/', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});


router.get('/get_dish', function(req, res){
  var post_id = ObjectId(req.query.object_id); 
  Post.findById(post_id, function(err,result){
    if (err) return console.error(err);
    else {
      res.contentType('application/json');
      res.send(JSON.stringify(result));
    }

  })
});



router.get('/get_dishes', function(req, res, next) {


    var ingredients = []; 
    var dietaryRestrictions = []; 


    if (!req.query.ingredients)
      ingredients = []
    else 
      ingredients = JSON.parse(req.query.ingredients);

    if (!req.query.dietaryRestrictions)
      dietaryRestrictions = []
    else 
      dietaryRestrictions = JSON.parse(req.query.dietaryRestrictions);


    console.log(ingredients);
    console.log(dietaryRestrictions);

    // Post.find({ingredients: {$in: ingredients}},{},function (err, result) {
    //     if (err) return console.error(err);

    //     res.contentType('application/json');
    //     res.send(JSON.stringify(result));
    //   }); 


    if(ingredients.length >= 1){

      Post.find({}).
      where('ingredients').in(ingredients).
      where('dietaryRestrictions').nin(dietaryRestrictions).
      exec(function (err, result) {
        if (err) return console.error(err);

        res.contentType('application/json');
        res.send(JSON.stringify(result));
      });
    }
    else 
    {
      Post.find({}).
      where('dietaryRestrictions').nin(dietaryRestrictions).
      exec(function (err, result) {
        if (err) return console.error(err);

        res.contentType('application/json');
        res.send(JSON.stringify(result));
      });
    }

});

//array of info 


//TODO: write response back to front end the whole row that was created, including objectID
router.post('/new_dish', (req, res) => {

  var new_dish = new Post({
    dietaryRestrictions: JSON.parse(req.body.dietaryRestrictions),
    title: req.body.title,
    description: req.body.description,
    ingredients: JSON.parse(req.body.ingredients),
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
