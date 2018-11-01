const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
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
const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

//socket.io connection listening
http.listen(config.SERVER_PORT)

io.use(function(socket, next) {
    next()
})

app.use(function(req, res, next) {
    req.io = io
    next()
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
