require('./config/config')
const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todo')

const port = process.env.PORT
var app = express()
app.use(bodyParser.json())
// add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-auth'); // Request headers you wish to allow
    // res.setHeader('Access-Control-Expose-Headers', 'x-auth');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200); //respond with 200
    } else {
      next(); // Pass to next layer of middleware
    }
});

app.use('/users', userRouter)
app.use('/todos', todoRouter)


app.listen(port, () => {
	console.log(`application started on port ${port}`)
})

module.exports = { app }