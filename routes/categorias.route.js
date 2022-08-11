const express = require('express')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { checkId } = require('../middlewares/validator.handle.js')
const {
  getAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../services/categorias.service.js')

const categoryRoute = express.Router()

const msg = {
  notFound: 'Categoria no encontrada',
  delete: 'Categoria eliminada'
}

categoryRoute.get('/', async (req, res, next) => {
  try {
    const category = await getAllCategories()
    res.json(category)
  } catch (error) {
    next(error)
  }
})

categoryRoute.get('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await findCategory(id)

    if (!category) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

categoryRoute.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const category = await createCategory(body)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

categoryRoute.put('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const category = await updateCategory(id, body)

    if (!category) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(category)
  } catch (error) {
    next(error)
  }
})

categoryRoute.delete('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await deleteCategory(id)

    if (!category) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

module.exports = categoryRoute
