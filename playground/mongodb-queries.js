const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')

const id = '5be1039d649cbd1e2cdcde1f'

if(!ObjectID.isValid(id))
	return console.log("Invalid object ID")

Todo.find({
	_id: id
}).then((todos) => {
	console.log(JSON.stringify(todos, undefined, 2))
})

Todo.findOne({
	_id: id
}).then((todos) => {
	console.log(JSON.stringify(todos, undefined, 2))
})

Todo.findById(id).then((todos) => {
	if(!todos)
		return console.log("ID is not found")
	console.log(JSON.stringify(todos, undefined, 2))
})