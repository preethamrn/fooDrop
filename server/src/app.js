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

app.get('/test', (req, res) => {
    res.send({ message: 'test' })
})
