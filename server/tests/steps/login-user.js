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

When('I login to {string}', function (url, callbacks) {
	let email = this.email
	let password = this.password
	request.post(`http://localhost:3000${url}`, {
		json: {email: email, password: password}
	}, (err, res, body) => {
		if(err){
			callbacks(err)
		}else{
			this.loginUser = res.body
			callbacks()
		}
	})
})

Then('I should be able to login', function () {
	
	// expect(this.loginUser).toInclude(newUser)
})