const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (err, client) => {
	if(err)
		return console.log("Unable to connect to mongodb server")
	console.log("Connected to mongodb server")

	const db = client.db('todo-app')

	// db.collection('users').find().toArray().then((docs) => {
	// 	console.log(JSON.stringify(docs, undefined, 2))
	// }, (err) => {
	// 	console.log("Unable to get data", err)
	// })

	db.collection('users').find().count().then((count) => {
		console.log("Toyal users : ", count)
	}, (err) => {
		console.log("Unable to get data", err)
	})

	db.collection('users').find({
		_id: new ObjectID('5bdfdae207b5b032243e0bc9')
	}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2))
	}, (err) => {
		console.log("Unable to get data", err)
	})

	client.close()
})