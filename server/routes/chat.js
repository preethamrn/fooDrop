var express = require('express');
var router = express.Router();
var Chat = require("../models/chat");
var User = require("../models/user");
const mongoose = require('mongoose');

/* GET chat messages */
router.get('/get_chats', function(req, res, next) {
  Chat.findOne({ chatId: req.query.chatId }, function(err, result) {
    if (err) {
      res.send({ success: false })
      return console.error(err);
    }
    
    if (result !== null) res.send({ success: true, result: result })
    else {
      // if chat log isn't found then return the dummy result
      res.send({ success: true, result: { chats: [], buyer: 'Buyer', seller: 'Seller' } })
    }
  })
});

router.post('/send_chat', function(req, res, next) {
  // TODO: add message to chats collection (findOne, then save)
  // TODO: if chatId doesn't exist (findOne returns null) then create model in chats collection and add message to user and seller collections
  req.io.to(req.body.chatId).emit('chat', {
		userId: req.body.userId,
		username: req.body.username,
    message: req.body.message
  })
  Chat.findOne({ chatId: req.query.chatId }, function(err, result) {
    if (err) {
      console.error(err)
      res.send({ success: false })
      return
    }

    if (result === null) {
      // chat log doesn't exists so create chatId in chats collection and add to buyer and seller collections 
    }
    // add message to chats collection
  })
  res.send({ success: true })
});

module.exports = router
