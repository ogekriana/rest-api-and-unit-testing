const { Given, When, Then } = require('cucumber')
const { assert, expect } = require('chai')
const request = require('request')
const fetch = require('node-fetch')

const { app } = require('./../../server')
const { User } = require('./../../models/user')

var email, password, newUser

// Given('a request data email address {string}', function (email) {
// 	this.email = email
// })

// Given('a request data password {string}', function (password) {
// 	this.password = password
// })

// When('I make a POST request to {string}', function (url, callbacks) {
// 	let email = this.email
// 	let password = this.password
// 	request.post(`http://localhost:3000${url}`, {
// 		json: {email: email, password: password}
// 	}, (err, res, body) => {
// 		if(err){
// 			console.log("ini error")
// 			callbacks(err)
// 		}else{
// 			this.newUser = res.body
// 			console.log("ini gak error")
// 			callbacks()
// 		}
// 	})
// })

// Then('I should get new user created', function () {
// 	let newUser = {
// 		email: 'paimin@gmail.com',
// 	}
// 	expect(this.newUser).toInclude(newUser)
// })

// async using callback
// When('I create a new user with detail:', function (table, callbacks) {
// 	let data = table.rowsHash()

// 	request.post('http://localhost:3000/users', {
// 		json: data
// 	}, (err, res, body) => {
// 		if(err){
// 			callbacks(err)
// 		}else{
// 			this.newUser = res.body
// 			callbacks()
// 		}
// 	})
// })

When('I create a new user with detail:', function (table) {
	let data = table.rowsHash()
	return fetch('http://localhost:3000/users', {
		method: 'post',
		body: JSON.stringify(data),
		headers: { 'content-type': 'application/json' }
	})
	.then(res => res.json())
	.then(body => {
		this.newUser = body
	})
})

Then('I should get new user created', function () {
	let newUser = { email: 'riana@mitrais.com' }
	expect(this.newUser).to.include(newUser)
})