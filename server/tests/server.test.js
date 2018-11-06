const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('./../server')
const { Todo } = require('./../models/todo')

const todos = [
	{
		_id: new ObjectID(),
		text: 'insert the first todo'
	},
	{ 
		_id: new ObjectID(),
		text: 'insert the second todo',
		completed: true,
		comletedAt: 1541484089104
	}
]

// this will remove all the data on todos collection before test
beforeEach((done) => {
	Todo.deleteMany({}).then(() => {
		return Todo.insertMany(todos)
	}).then(() => done())
})

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		let text = 'testing new todo'

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text)
			})
			.end((err, res) => {
				if(err)
					return done(err)

				Todo.find({text: text}).then((todos) => {
					expect(todos.length).toBe(1)
					expect(todos[0].text).toBe(text)
					done()
				}).catch(e => done(e))
			})
	})

	it('should not create todo with invalid data', (done) => {
		let text = ''
		request(app)
			.post('/todos')
			.send({text})
			.expect(400)
			.end((err, res) => {
				if(err)
					return done(err)

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2)
					done()
				}).catch((e) => done(e))
			})
	})
})

describe('GET /todos', () => {
	it('should get list of todo', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2)
			})
			.end(done)
	})
})

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text)
			})
			.end(done)
	})

	it('should return 404 if todo not found', (done) => {
		let hexId = new ObjectID()

		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done)
	})

	it('should return 404 for non-objectid', (done) => {
		request(app)
			.get('/todos/123aaa')
			.expect(404)
			.end(done)
	})
})

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		let hexid = todos[1]._id.toHexString()
		request(app)
			.delete(`/todos/${hexid}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexid)
			})
			.end((err, res) => {
				if(err)
					return done(err)

				Todo.findById(hexid).then((todo) => {
					expect(todo).toNotExist()
					done()
				}).catch((e) => done(e))
			})
	})

	it('should return 404 if todo not found', (done) => {
		let hexId = new ObjectID()

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done)
	})

	it('should return 404 for non-objectid', (done) => {
		request(app)
			.delete('/todos/123aaa')
			.expect(404)
			.end(done)
	})
})

describe('PATCH /todos/:id', () => {
	it('should updated the todo', (done) => {
		let hexid = todos[0]._id.toHexString()
		let text = 'testing update the data'

		request(app)
			.patch(`/todos/${hexid}`)
			.send({
				text,
				completed: true
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text)
				expect(res.body.todo.completed).toBe(true)
				expect(res.body.todo.completedAt).toBeA('number')
			})
			.end(done)
	})

	it('should clear completedAt when todo is not complete', (done) => {
		let hexid = todos[1]._id.toHexString()
		let text = 'testing update the data from testing'

		request(app)
			.patch(`/todos/${hexid}`)
			.send({
				text,
				completed: false
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text)
				expect(res.body.todo.completed).toBe(false)
				expect(res.body.todo.completedAt).toNotExist
			})
			.end(done)
	})
})