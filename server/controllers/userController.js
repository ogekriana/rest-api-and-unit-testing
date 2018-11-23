const { User } = require('./../models/user')
const _ = require('lodash')

let createUser = async (req, res) => {
	let body = _.pick(req.body, ['email', 'password'])
	let user = new User(body)

	try{
		let userRes = await user.save()
		let token = await userRes.generateAuthToken()
		res.header('x-auth', token).send(userRes)
	}catch(e){
		res.status(400).send(e)
	}
}

let loginUser = async (req, res) => {
	try{
		let body = _.pick(req.body, ['email', 'password'])
		let user = await User.findByCredentials(body.email, body.password)
		let token = await user.generateAuthToken()
		res.header('x-auth', token).send(user)
	} catch(e) {
		res.status(400).send(e)
	}
}

let getLoginUser = (req, res) => {
	res.send(req.user)
}

let logoutUser = async (req, res) => {
	try{
		await req.user.removeToken(req.token)
		res.status(200).send()
	}catch(e){
		res.status(400).send(e)
	}
}

module.exports = { createUser, loginUser, getLoginUser, logoutUser }