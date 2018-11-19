var express = require('express');
var router = express.Router();
var Chat = require("../models/chat");
const mongoose = require('mongoose');

/* GET chat messages */
router.get('/get_chats', function(req, res, next) {
  Chat.findOne({ chatId: req.query.chatId }, function(err, result) {
    if (err) {
      res.send({ success: false })
      return console.error(err);
    }
    
    if (result !== null) res.send({ success: true, chats: result.messages })
    else res.send({ success: true, chats: [] })
  })
});

router.post('/send_chat', function(req, res, next) {
  // TODO: add message to chats collection (findOne, then save)
  // TODO: if chatId doesn't exist (findOne returns null) then create model in chats collection and add message to user and seller collections
  req.io.to(req.body.chatId).emit('chat', {
		userId: req.body.userId,
    message: req.body.message
  })
  res.send({ success: true })
});

module.exports = router
