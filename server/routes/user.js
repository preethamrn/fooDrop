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


module.exports = router;
