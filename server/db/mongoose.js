const mongoose = require('mongoose')

mongoose.promise = global.promise
// mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true })
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app', { useNewUrlParser: true })
mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })

module.exports = { mongoose }