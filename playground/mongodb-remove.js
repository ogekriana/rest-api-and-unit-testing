const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')

Todo.remove({}).then((res) => console.log(res))

// findOneAndRemove
Todo.findOneAndRemove({
	_id: '5be10f3b543a4223d8f739c8'
})
	.then((res) => console.log(res))
	.catch((e) => console.log(e))

// findByIdAndRemove
Todo.findByIdAndRemove('5be10f3b543a4223d8f739c9')
	.then((res) => console.log(res))
	.catch((e) => console.log(e))