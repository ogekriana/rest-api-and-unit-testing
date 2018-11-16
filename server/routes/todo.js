const express = require('express')
const router = express.Router()

const { createTodo,
		getTodos,
		getTodo,
		deleteTodo,
		updateTodo
	  } = require('./../controllers/todoController')
const { authentication } = require('./../middleware/authenticate')

router.post('/', authentication, createTodo)
router.get('/', authentication, getTodos)
router.get('/:id', authentication, getTodo)
router.delete('/:id', authentication, deleteTodo)
router.patch('/:id', authentication, updateTodo)

module.exports = router