const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const facebookToken = require('passport-facebook-token')
const config = require('../config')

// express
const app = express()
app.use(morgan('combined'))

var dishRouter = require('../routes/dish');
var userRouter = require('../routes/user_info');

// mongodb
const mongoose = require('mongoose')
const mongodb_conn_module = require('./mongodbConnModule')
var db = mongodb_conn_module.connect()
var User = require("../models/user")

// socket.io
const http = require('http').Server(app)
const io = require('socket.io')(http)

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

//database model
var Post = require("../models/post");

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

io.use(function(socket, next) {
  next()
})

app.use(function(req, res, next) {
  req.io = io
  next()
})

app.use('/user', userRouter);
app.use('/dish', dishRouter);

// Using passport's facebook token strategy to authenticate accessToken
passport.use(new facebookToken({
	clientID: '1898976426806055',
	clientSecret: '3db474179fd2165f68391ee27c714b6c'
}, function(accessToken, refreshToken, profile, done) {
	User.findOne({'facebookID': profile.id}, function(err, result) {
		if(err) {
			console.log(err)
		}
		else if (result == null) {
			var newUser = new User({
				name: profile.displayName,
				facebookID: profile.id,
				paypalID: -1,
				radius: 2,
				restrictions: [],
				transactions: []
			})

			newUser.save(function(err, savedUser) {
				if(err) {
					console.log(err)
				}
				console.log(savedUser)
				done(err, savedUser)
			})
		}
		else {
			console.log("Found User")
			console.log(result)
			done(err, result)
		}
	})
}))

// Once passport strategy has been authenticated, handle user information.
// This is where we create json web tokens
// TODO: Add secret to config file rather than hard coding it.
app.post('/auth/facebook', passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
	if(!req.user) {
		console.log("User Not Authenticated");
	}

	req.auth = {
		id: req.user.facebookID
	}

	console.log(req.auth)

	next()
}, 
function(req, res, next) {
	req.token = jwt.sign({
		facebookID: req.auth.id,
	}, 'AFB7E158AB3E2C9F590F4F9F94684C42391C236777239C6EB6E46B6E585255E0', {
		expiresIn: '7d'
	})

	console.log(req.token)

	next()
}, 
function(req, res) {
	console.log("Sending Token")
	res.setHeader('x-auth-token', req.token);
	res.send({auth: true, token: req.token, facebookID: req.auth.id})
})


// Endpoint to validate jwt when frontend sends a request
// TODO: Change the implementation to check database with decoded id and send the rest of the information.
app.get('/auth/validateUser', function(req,res) {
	var token = req.headers['x-auth-token']
	var facebookID = req.query.facebookID
	if(!token) {
		console.log("No Token!")
	}

	jwt.verify(token, 'AFB7E158AB3E2C9F590F4F9F94684C42391C236777239C6EB6E46B6E585255E0', function(err, payload) {
		if (err) {
			console.log(err)
			res.send({auth: false})
		} else if (payload.facebookID !== facebookID) {
			res.send({auth: false})
		} else {
			User.findOne({facebookID: payload.facebookID}, function(err, result) {
				if(err) {
					console.log(err)
				} else {
					res.send({auth: true, user: result})
				}
			})
		}
	})
})

<<<<<<< HEAD
=======

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
>>>>>>> master
