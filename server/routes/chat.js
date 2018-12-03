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
    if (result !== null) {
      res.send({ success: true, result: result })
    } else {
      // if chat log isn't found then return the dummy result
      res.send({ success: true, result: { chats: [], buyer: 'Buyer', seller: 'Seller' } })
    }
  })
});

/* Broadcast chat messages and stores message in database. Creates chat log in buyer, seller, and chat databases if not present */
router.post('/send_chat', function(req, res, next) {
  // TODO: add message to chats collection (findOne, then save)
  // TODO: if chatId doesn't exist (findOne returns null) then create model in chats collection and add message to user and seller collections
  req.io.to(req.body.chatId).emit('chat', {
		userId: req.body.userId,
		username: req.body.username,
    message: req.body.message
  })
  Chat.findOne({ chatId: req.body.chatId }, function(err, result) {
    if (err) {
      console.error(err)
      res.send({ success: false })
      return
    }

    if (result === null) {
      // chat log doesn't exists so create chatId in chats collection and add to buyer and seller collections
      let chatId = req.body.chatId
      let buyerId = req.body.userId
      if (chatId.substr(0, buyerId.length) === buyerId) {
        sellerId = chatId.substr(buyerId.length, chatId.length)
      } else {
        sellerId = chatId.substr(0, chatId.length - buyerId.length)
      }
      let newChat = new Chat({
        chatId: req.body.chatId,
        buyer: buyerId,
        seller: sellerId,
        messages: [{
          userId: req.body.userId,
          username: req.body.username,
          message: req.body.message
        }]
      })
      console.log(buyerId)
      console.log(sellerId)
      newChat.save(function (error) {
        if (error) {
          console.error(error)
        } else {
          let buyerName = 'Buyer'
          let sellerName = 'Seller'
          User.findById(buyerId, function (err, result) {
            buyerName = result.name
            
            User.findById(sellerId, function (err, result) {
              sellerName = result.name

              User.update({_id: buyerId }, {
                $push: {
                  chats: {
                    chatId: chatId,
                    buyer: buyerName,
                    buyerId: buyerId,
                    seller: sellerName,
                    sellerId: sellerId
                  }
                }
              }, () => {})
              User.update({_id: sellerId }, {
                $push: {
                  chats: {
                    chatId: chatId,
                    buyer: buyerName,
                    buyerId: buyerId,
                    seller: sellerName,
                    sellerId: sellerId
                  }
                }
              }, () => {})
            })
          })
        }
      })
    } else {
      result.messages.push({
        userId: req.body.userId,
        username: req.body.username,
        message: req.body.message
      })
      result.save(() => {})
    }
  })
  res.send({ success: true })
});

module.exports = router
