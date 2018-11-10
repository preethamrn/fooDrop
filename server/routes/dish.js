var express = require('express');
var router = express.Router();

/* GET home page. */

// var search = function(title, ){

// };

router.get('/get_dishes', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
