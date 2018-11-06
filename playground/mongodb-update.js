const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (err, client) => {
	if(err)
		return console.log("Unable to connect to mongodb server")
	console.log("Connected to mongodb server")

	const db = client.db('todo-app')

	// findOneAndUpdate
	db.collection('users')
		.findOneAndUpdate(
			{ _id: new ObjectID("5bdfe45b29d5bc48c40dbf16") },
			{ $set: {name: "ogekriana"} },
			{ returnOriginal: false }
		)
		.then((result) => {
			console.log(result)
		})

	client.close()
})