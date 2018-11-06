const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (err, client) => {
	if(err)
		return console.log("Unable to connect to mongodb server")
	console.log("Connected to mongodb server")

	const db = client.db('todo-app')

	// deleteMany
	// db.collection('users').deleteMany({name: "Riana Mahlia Dewi"}).then((result) => {
	// 	console.log(result)
	// })

	// deleteOne
	// db.collection('users').deleteOne({location: "Jln Pura Demak"}).then((result) => {
	// 	console.log(result)
	// })

	// findOneAndDelete
	db.collection('users').findOneAndDelete({name: "ogekriana"}).then((result) => {
		console.log(result)
	})

	client.close()
})