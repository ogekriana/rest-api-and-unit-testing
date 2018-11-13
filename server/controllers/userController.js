const { User } = require('./../models/user')
const _ = require('lodash')

let createUser = (req, res) => {
	let body = _.pick(req.body, ['email', 'password'])
	let user = new User(body)

	user.save().then((user) => {
			return user.generateAuthToken()
		}).then((token) => {
			res.header('x-auth', token).send(user)
		}).catch((err) => {
			res.status(400).send(err)
		})
}

let loginUser = (req, res) => {
	let body = _.pick(req.body, ['email', 'password'])

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user)
		}).catch((err) => {
			res.status(400).send(err)
		})
	})
}

let getLoginUser = (req, res) => {
	res.send(req.user)
}

let logoutUser = (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send()
	}, () => {
		res.status(400).send()
	})
}

module.exports = { createUser, loginUser, getLoginUser, logoutUser }