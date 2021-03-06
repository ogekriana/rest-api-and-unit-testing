const todo = require('./todo')
const user = require('./users')
const { authentication } = require('./../middleware/authenticate')

const express = require('express')
const app = express()

app.use('/users', user)


app.use(authentication); // the authentication
app.use('/todos', todo)
