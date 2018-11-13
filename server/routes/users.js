const express = require('express')
const router = express.Router()

const userController = require('./../controllers/userController')
const { authentication } = require('./../middleware/authenticate')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/me', authentication, userController.getLoginUser)
router.delete('/me/token', authentication, userController.logoutUser)

module.exports = router