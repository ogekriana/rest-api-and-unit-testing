const express = require('express')
const router = express.Router()

const { createTodo,
		getTodos,
		getTodo,
		deleteTodo,
		updateTodo
	  } = require('./../controllers/todoController')

router.post('/', createTodo)
router.get('/', getTodos)
router.get('/:id', getTodo)
router.delete('/:id', deleteTodo)
router.patch('/:id', updateTodo)

module.exports = router