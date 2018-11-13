const { Todo } = require('./../models/todo')
const _ = require('lodash')

let createTodo = (req, res) => {
	let todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	})

	todo.save().then((docs) => {
		res.send(docs)
	}, (err) => {
		res.status(400).send(err)
	})
}

let getTodos = (req, res) => {
	Todo.find({_creator: req.user._id}).then((todos) => {
		res.send({todos})
	}, (err) => {
		res.status(400).send(err)
	})
}

let getTodo = (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send("invalid objectID")

	Todo.findOne({
		_id: id, 
		_creator: req.user._id
	}).then((todo) => {
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}).catch((err) => {
		res.status(400).send(err)
	})
}

let deleteTodo = (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send("invalid objectID")

	Todo.findOneAndDelete({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}).catch((err) => {
		res.status(400).send(err)
	})
}

let updateTodo = (req, res) => {
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
		{ _id: id, _creator: req.user._id },
		{ $set: body },
		{ new: true }
	).then((todo) => {
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}).catch((err) => {
		res.status(400).send(err)
	})
}

module.exports = { createTodo, getTodos, getTodo, deleteTodo, updateTodo }