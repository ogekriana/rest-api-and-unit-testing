const express = require('express')
const router = express.Router()

const { 
	createUser,
	loginUser,
	getLoginUser,
	logoutUser
} = require('./../controllers/userController')
const { authentication } = require('./../middleware/authenticate')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/me', authentication, getLoginUser)
router.delete('/me/token', authentication, logoutUser)

module.exports = router