var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var dishRouter = require('../routes/dish');

var app = express();

// mongodb
const mongoose = require('mongoose')
const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

// socket.io
const http = require('http').Server(app)
const io = require('socket.io')(http)

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

//database model
var Post = require("../models/post");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

io.use(function(socket, next) {
  next()
})

app.use(function(req, res, next) {
  req.io = io
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dish', dishRouter);


app.get('/posts', (req, res) => {
  var title = "udayan";
  var description = "sahai";
  var dietaryRestrictions = ["Hello","World"];
  var ingredients = ['carrots'];
  var price = 100; 
  var quantity = 1; 
  var sellerId = 1234; 

  var new_post = new Post({
    title: title,
    description: description,
    dietaryRestrictions: dietaryRestrictions,
    ingredients: ingredients,
    price: price,
    quantity: quantity,
    sellerId: sellerId
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
