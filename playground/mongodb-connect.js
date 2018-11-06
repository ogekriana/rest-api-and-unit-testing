// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (err, client) => {
	if(err)
		return console.log("Unable to connect to mongodb server")
	console.log("Connected to mongodb server")

	const db = client.db('todo-app')
	// db.collection('todos').insertOne({
	// 	text: 'finish the CDC',
	// 	completed: false
	// }, (err, res) => {
	// 	if(err)
	// 		return console.log("Unable to insert todo", err)

	// 	console.log(JSON.stringify(res.ops))
	// })

	db.collection('users').insertOne({
		name: 'ogekriana',
		location: 'Jln Pura Demak'
	}, (err, res) => {
		if(err)
			return console.log("Unable to insert user", err)

		console.log(JSON.stringify(res.ops))
		console.log(res.ops[0]._id.getTimestamp())
	})

	client.close()
})