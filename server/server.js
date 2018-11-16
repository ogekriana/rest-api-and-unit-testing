require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
// const userRouter = require('./routes/users')
// const todoRouter = require('./routes/todo')

const routes = require('./routes/index')

const port = process.env.PORT
var app = express()
app.use(bodyParser.json())
// add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type,x-auth'); // Request headers you wish to allow

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      res.sendStatus(200); //respond with 200
    } else {
      next(); // Pass to next layer of middleware
    }
});

// app.use('/users', userRouter)
// app.use('/todos', todoRouter)


app.listen(port, () => {
	console.log(`application started on port ${port}`)
})

module.exports = { app }