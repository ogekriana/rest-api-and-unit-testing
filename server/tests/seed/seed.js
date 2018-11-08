const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { Todo } = require('./../../models/todo')
const { User } = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [
	{
		_id: userOneId,
		email: "ogek.riana@gmail.com",
		password: "ogekrianamd123",
		tokens: [{
			access: 'auth',
			token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET)
		}]
	},
	{ 
		_id: userTwoId,
		email: "ogek.mahlia@gmail.com",
		password: "ogekrianamd12345",
		tokens: [{
			access: 'auth',
			token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET)
		}]
	}
]

const todos = [
	{
		_id: new ObjectID(),
		text: 'insert the first todo LALA',
		_creator: userOneId
	},
	{ 
		_id: new ObjectID(),
		text: 'insert the second todo',
		completed: true,
		comletedAt: 1541484089104,
		_creator: userTwoId
	}
]

// this will remove all the data on todos collection before test
const populateTodo = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos)
	}).then(() => done())
}

const populateUser = (done) => {
	User.remove({}).then(() => {
		let userOne = new User(users[0]).save()
		let userTwo = new User(users[1]).save()

		return Promise.all([userOne, userTwo])
	}).then(() => done())
}

module.exports = { todos, populateTodo, users, populateUser }