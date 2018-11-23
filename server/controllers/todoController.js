const { ObjectID } = require('mongodb')
const _ = require('lodash')

const { Todo } = require('./../models/todo')

let createTodo = async (req, res) => {
	let todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	})

	try{
		let docs = await todo.save()
		res.send(docs)
	} catch (err) {
		res.status(400).send(err)
	}
}

let getTodos = async (req, res) => {
	try{
		let todos = await Todo.find({_creator: req.user._id})
		res.send({todos})
	} catch(err) {
		res.status(400).send(err)
	}
}

let getTodo = async (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send("invalid objectID")

	try{
		let todo = await Todo.findOne({ _id: id, _creator: req.user._id })
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}catch(err){
		res.status(400).send(err)
	}
}

let deleteTodo = async (req, res) => {
	let id = req.params.id;
	if(!ObjectID.isValid(id))
		return res.status(404).send("invalid objectID")

	try{
		let todo = await Todo.findOneAndDelete({ _id: id, _creator: req.user._id })
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}catch(err){
		res.status(400).send(err)
	}
}

let updateTodo = async (req, res) => {
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

	try{
		let todo = await Todo.findOneAndUpdate(
			{ _id: id, _creator: req.user._id },
			{ $set: body },
			{ new: true }
		)
		if(!todo)
			return res.status(404).send()
		res.send({todo})
	}catch(err){
		res.status(400).send(err)
	}
}

module.exports = { createTodo, getTodos, getTodo, deleteTodo, updateTodo }