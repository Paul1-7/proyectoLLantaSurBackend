const express = require('express')
const { checkId } = require('../middlewares/validator.handle.js')

const { getAllSells } = require('../controllers/ventas.controller.js')

const categoryRoute = express.Router()

categoryRoute.get('/', getAllSells)
// categoryRoute.get('/:id', checkId, findCategory)
// categoryRoute.post('/', createCategory)
// categoryRoute.put('/:id', checkId, updateCategory)
// categoryRoute.delete('/:id', checkId, deleteCategory)

module.exports = categoryRoute
