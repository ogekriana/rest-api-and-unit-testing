const { User } = require('./../models/user')

let authentication = (req, res, next) => {
	let token = req.header('x-auth')

	User.findByToken(token).then((user) => {
		if(!user){
			return Promise.reject()
		}
		req.user = user
		req.token = token
		next()
	}).catch((e) => {
		res.status(401).send({
			error: true,
			status: 401,
			message: "Access Unauthorized!"
		})
	})
}

module.exports = { authentication }