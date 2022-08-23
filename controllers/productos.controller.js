const { ERROR_RESPONSE } = require('../middlewares/error.handle')
const services = require('../services/ventas.service')

const msg = {
  notFound: 'Venta no encontrada',
  delete: 'Venta eliminada'
}

const getAllSells = async (req, res, next) => {
  try {
    const sell = await services.getAllSells()
    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const findCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const sell = await services.findCategory(id)

    if (!sell) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const createCategory = async (req, res, next) => {
  try {
    const { body } = req
    const sell = await services.createCategory(body)
    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const sell = await services.updateCategory(id, body)

    if (!sell) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(sell)
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const sell = await services.deleteCategory(id)

    if (!sell) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSells,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
