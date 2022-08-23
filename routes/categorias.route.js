const express = require('express')
const { checkId } = require('../middlewares/validator.handle.js')

const {
  getAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categorias.controller.js')

const categoryRoute = express.Router()

categoryRoute.get('/', getAllCategories)
categoryRoute.get('/:id', checkId, findCategory)
categoryRoute.post('/', createCategory)
categoryRoute.put('/:id', checkId, updateCategory)
categoryRoute.delete('/:id', checkId, deleteCategory)

module.exports = categoryRoute
