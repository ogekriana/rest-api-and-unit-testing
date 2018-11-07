require('./config/config')
const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { User } = require('./models/user')
const { Todo } = require('./models/todo')
const { authentication } = require('./middleware/authenticate')

const port = process.env.PORT
var app = express()
app.use(bodyParser.json())

// TODO
app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text
	})

	todo.save().then((docs) => {
		res.send(docs)
	}, (err) => {
		res.status(400).send(err)
	})
})

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos})
	}, (err) => {
		res.status(400).send(err)
	})
})

app.get('/todos/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send("invalid objectID")

	Todo.findById(id).then((todo) => {
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}).catch((err) => {
		res.status(400).send(err)
	})
})

app.delete('/todos/:id', (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send("invalid objectID")

	Todo.findByIdAndDelete(id).then((todo) => {
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}).catch((err) => {
		res.status(400).send(err)
	})
})

app.patch('/todos/:id', (req, res) => {
	let id = req.params.id
	let body = _.pick(req.body, ['text', 'completed'])
	if(!ObjectID.isValid(id))
		return res.status(404).send("invalid objectID")

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime() 	
	}else{
		body.completed = false
		body.completedAt = null
	}

	Todo.findOneAndUpdate(
			{ _id: id },
			{ $set: body },
			{ new: true }
		)
		.then((todo) => {
			if(!todo)
			return res.status(404).send()
				res.send({todo})
		}).catch((err) => {
			res.status(400).send(err)
		})
})

// USER
app.post('/users', (req, res) => {
	let body = _.pick(req.body, ['email', 'password'])
	let user = new User(body)

	user.save().then((user) => {
			return user.generateAuthToken()
		}).then((token) => {
			res.header('x-auth', token).send(user)
		}).catch((err) => {
			res.status(400).send(err)
		})
})

app.post('/users/login', (req, res) => {
	let body = _.pick(req.body, ['email', 'password'])

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user)
		}).catch((err) => {
			res.status(400).send(err)
		})
	})
})

// app.get('/users/me', (req, res) => {
// 	let token = req.header('x-auth')

// 	User.findByToken(token).then((user) => {
// 		if(!user){
// 			// return res.status(401).send()
// 			// OR
// 			return Promise.reject()
// 		}
			
// 		res.send(user)
// 	}).catch((e) => {
// 		res.status(401).send()
// 	})
// })

// get user using authentication middleware
app.get('/users/me', authentication, (req, res) => {
	res.send(req.user)
})

app.listen(port, () => {
	console.log(`application started on port ${port}`)
})

module.exports = { app }


// TODOS
// var newTodo = new Todo({
// 	text: "pulang cepet",
// 	completed: true,
// 	completedAt: 123
// })

// var newTodo = new Todo({
// 	text: "  add default value  "
// })
// newTodo.save().then((res) => {
// 	console.log(JSON.stringify(res, undefined, 2))
// }, (err) => {
// 	console.log(err)
// })

// USERS
// newUser = new Users({
// 	email: 'rianaogekriana@gmail.com   '
// })

// newUser.save().then((res) => {
// 	console.log(JSON.stringify(res, undefined, 2))
// }, (err) => {
// 	console.log(err)
// })