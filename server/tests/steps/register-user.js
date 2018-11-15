const { Given, When, Then } = require('cucumber')
const expect = require('expect')
const assert = require('assert')
const request = require('request')

const { app } = require('./../../server')
const { User } = require('./../../models/user')

var email, password, newUser

Given('a request data email address {string}', function (email) {
	this.email = email
})

Given('a request data password {string}', function (password) {
	this.password = password
})

When('I make a POST request to {string}', function (url, callbacks) {
	let email = this.email
	let password = this.password
	request.post('http://localhost:3000/users', {
		json: {email: email, password: password}
	}, (err, res, body) => {
		if(err){
			console.log("ini error")
			callbacks(err)
		}else{
			this.newUser = res.body
			console.log("ini gak error")
			callbacks()
		}
	})
})

Then('I should get new user created', function () {
	let newUser = {
		email: 'paimin@gmail.com',
	}
	console.log(this.newUser)
	expect(this.newUser).toInclude(newUser)
})