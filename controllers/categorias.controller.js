const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/categorias.service.js')

const msg = {
  notFound: 'Categoria no encontrada',
  delete: 'Categoria eliminada'
}

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await services.getAllCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}

const findCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await services.findCategory(id)

    if (!category) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(category)
  } catch (error) {
    next(error)
  }
}

const createCategory = async (req, res, next) => {
  try {
    const { body } = req
    const category = await services.createCategory(body)
    res.json(category)
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const category = await services.updateCategory(id, body)

    if (!category) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(category)
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await services.deleteCategory(id)

    if (!category) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
