var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get_dishes', (req, res) => {
  res.send({ dishes: [
      { name: 'testDish1', ingredients: ['carrots'], dietaryRestrictions: [], price: 100, amount: 1, sellerId: '1234' },
      { name: 'testDish2', ingredients: ['apples', 'bananas', 'milk'], dietaryRestrictions: ['lactose'], price: 500, amount: 7, sellerId: '1234' }
  ] })
})

router.post('/new_dish', (req, res) => {
  res.send({ success: true, dish: { name: 'testDish', ingredients: ['carrots'], dietaryRestrictions: [], price: 100, amount: 1, sellerId: '1234' } })
})

module.exports = router;
