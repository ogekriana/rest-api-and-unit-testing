const express = require('express')
const router = express.Router()

const todoController = require('./../controllers/todoController')
const { authentication } = require('./../middleware/authenticate')

router.post('/', authentication, todoController.createTodo)
router.get('/', authentication, todoController.getTodos)
router.get('/:id', authentication, todoController.getTodo)
router.delete('/:id', authentication, todoController.deleteTodo)
router.patch('/:id', authentication, todoController.updateTodo)

module.exports = router