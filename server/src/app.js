const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const passport = require('passport')
const facebookToken = require('passport-facebook-token')

// express
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// socket.io
const http = require('http').Server(app)
const io = require('socket.io')(http)

// mongodb
const mongoose = require('mongoose')
const mongodb_conn_module = require('./mongodbConnModule')
var userSchema = require('./Models/Users.js')
var db = mongodb_conn_module.connect()
var User = db.model('Users', userSchema)

//socket.io connection listening
http.listen(config.SERVER_PORT)
//app.listen(8080)

io.use(function(socket, next) {
    next()
})

app.use(function(req, res, next) {
    req.io = io
    next()
})

app.get('/', function(req, res) {
	res.send("Hello World")
})

app.get('/get_dishes', (req, res) => {
    res.send({ dishes: [
        { name: 'testDish1', ingredients: ['carrots'], dietaryRestrictions: [], price: 100, amount: 1, sellerId: '1234' },
        { name: 'testDish2', ingredients: ['apples', 'bananas', 'milk'], dietaryRestrictions: ['lactose'], price: 500, amount: 7, sellerId: '1234' }
    ] })
})

app.post('/new_dish', (req, res) => {
    res.send({ success: true, dish: { name: 'testDish', ingredients: ['carrots'], dietaryRestrictions: [], price: 100, amount: 1, sellerId: '1234' } })
})

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
		expiresIn: '1h'
	})

	console.log(req.token)

	next()
}, 
function(req, res) {
	console.log("Sending Token")
	res.setHeader('x-auth-token', req.token);
	res.send({auth: true, token: req.token})
})


// Endpoint to validate jwt when frontend sends a request
// TODO: Change the implementation to check database with decoded id and send the rest of the information.
app.get('/auth/validateUser', function(req,res) {
	var token = req.headers['x-auth-token']
	console.log(req.headers)
	if(!token) {
		console.log("No Token!")
	}

	jwt.verify(token, 'AFB7E158AB3E2C9F590F4F9F94684C42391C236777239C6EB6E46B6E585255E0', function(err, payload) {
		if(err) {
			console.log(err)
		}
		
		User.findOne({facebookID: payload.facebookID}, function(err, result) {
			if(err) {
				console.log(err)
			}
			else {
				res.send(result)
			}
		})
	})
})
