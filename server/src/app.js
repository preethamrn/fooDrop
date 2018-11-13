const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const facebookCred = require(__dirname + '/../facebook/credentials.js')
const moment = require('moment')

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
var db = mongodb_conn_module.connect()

//socket.io connection listening
http.listen(config.SERVER_PORT)

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(user, cb){
	cb(null, user);
});

io.use(function(socket, next) {
    next()
})

app.use(function(req, res, next) {
    req.io = io
    next()
})

app.get('/', (req, res) => {
	res.send("HELLO WORLD!")
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

passport.use(new FacebookStrategy({
	clientID: facebookCred.auth.id,
	clientSecret: facebookCred.auth.secret,
	callbackURL: 'http://localhost:' + config.SERVER_PORT + '/auth/facebook'
}, async (req, accessToken, refreshToken, profile, done) => {
	var query = {"FacebookID": profile.id}
	db.collection("Users").findOne(query, (err, result) => {
		if(err) {
			console.log(err)
		}
		else if(result == null) {
			var newUser = {
				"AccessToken": accessToken,
				"FacebookID": profile.id,
				"radiusDefault": 2,
				"dietaryRestrictions": [],
				"PaypalID": 0,
				"Rating": 0,
				"Name": profile.displayName
			}

			console.log("Adding User To Database")
			db.collection("Users").insertOne(newUser, (err, result) => {
				if(err) {
					console.log(err)
				}
				else {
					console.log("Successfully Added New User")
					console.log(result)
					done(null, result)
				}
			})

		}
		else {
			console.log("Successfully Logged In")
			console.log(result)
			done(null, result)
		}
	})
}))

app.get('/login', passport.authenticate('facebook'))
app.get('/auth/facebook', passport.authenticate('facebook'), (req, resp) => {
	resp.send(req.user)
})
