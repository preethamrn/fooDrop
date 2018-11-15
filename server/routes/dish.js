var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Post = require("../models/post");
var Post_Controller = require("../controller/post_controller");
var User_Controller = require("../controller/user_controller");
const ObjectId = mongoose.Types.ObjectId;

/* GET home page. */

var search = function(radius, ingredients, dietaryRestrictions){
};

router.post('/', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});


router.get('/get_dish', function(req, res){
  var post_id = ObjectId(req.query.post_id); 
  Post.findById(post_id, function(err,result){
    if (err || res==null) {
      // res.send()
      res.status(500).send({ error: "boo:(" });
      return console.error(err);
    }
    else {
      res.contentType('application/json');
      res.send(JSON.stringify(result));
    }

  })
});

router.post('/transaction', function(req, res){

var buyer_id = ObjectId(req.body.buyer_id);
var seller_id = ObjectId(req.body.seller_id);
var post_id = ObjectId(req.body.post_id);
var quantity = req.body.quantity; 

Post_Controller.updatePostQ(post_id,quantity,function(error,post)
{
  if(error){
    res.status(400).send({
      status: "fail"
    })
      return;
    }

  var result = post;
  var new_transaction = 
    {    
          ingredients: result["ingredients"],
          restrictions: result["dietaryRestrictions"],
          name: result["title"],
          photo: "",
          location: result["location"],
          price: result["price"],
          sellerID: seller_id,
          buyerID: buyer_id,
          quantity: quantity
    }


  Post_Controller.addTransaction(seller_id,new_transaction,function(error,seller){
      if(error){
        res.status(401).send({
          status: "fail"
        })
        return console.err(error);
      }

      Post_Controller.addTransaction(buyer_id,new_transaction,function(error,seller){
        if(error){
          res.status(402).send({
            status: "fail"
          })
          return;
        }

        res.send({status: "pass"})

      })
    })
  })
})


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

    Post_Controller.get_dishes(ingredients,dietaryRestrictions, function(result){
            res.contentType('application/json');
            res.send(JSON.stringify(result));
    });

});


router.get('/get_dishes_by_rad', function(req, res, next) {

    var ingredients = []; 
    var dietaryRestrictions = []; 
    var radius = req.query.radius; 
    var user_lat = req.query.lat; 
    var user_lon = req.query.lon; 
    

    if (!req.query.ingredients)
      ingredients = []
    else 
      ingredients = JSON.parse(req.query.ingredients);

    if (!req.query.dietaryRestrictions)
      dietaryRestrictions = []
    else 
      dietaryRestrictions = JSON.parse(req.query.dietaryRestrictions);

    Post_Controller.get_dishes(ingredients,dietaryRestrictions, function(result){
            result = result.filter(post => Post_Controller.
              getDistanceFromLatLonInMiles(user_lat,user_lon,post["location"]["lat"],post["location"]["lon"]) < radius);


            res.contentType('application/json');
            res.send(JSON.stringify(result));
    });

});
//array of info 


//TODO: write response back to front end the whole row that was created, including objectID
router.post('/new_dish', (req, res) => {

  console.log("Enter")
  var new_dish = new Post({
    dietaryRestrictions: (req.body.dietaryRestrictions),
    title: req.body.title,
    description: req.body.description,
    location: (req.body.location),
    ingredients: (req.body.ingredients),
    price: req.body.price,
    quantity: req.body.quantity, 
    sellerId: req.body.sellerId 
  })

  //console.log(req.body.FirstName);

  var body = req.body;


  new_dish.save(function (error, result) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!',
      body: result,
      _id: result.id 
    })
  })

  //res.send({ success: true, dish: { name: 'testDish', ingredients: ['carrots'], dietaryRestrictions: [], price: 100, quantity: 1, sellerId: '1234' } })

})

module.exports = router;
