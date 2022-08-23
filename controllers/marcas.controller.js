const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const services = require('../services/marcas.service.js')

const msg = {
  notFound: 'Marca no encontrada',
  delete: 'Marca eliminada'
}
const getAllBrands = async (req, res, next) => {
  try {
    const brand = await services.getAllBrands()
    res.json(brand)
  } catch (error) {
    next(error)
  }
}

const findBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const brand = await services.findBrand(id)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(brand)
  } catch (error) {
    next(error)
  }
}

const createBrand = async (req, res, next) => {
  try {
    const { body } = req
    const brand = await services.createBrand(body)
    res.json(brand)
  } catch (error) {
    next(error)
  }
}

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const brand = await services.updateBrand(id, body)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(brand)
  } catch (error) {
    next(error)
  }
}

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const brand = await services.deleteBrand(id)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllBrands,
  findBrand,
  createBrand,
  updateBrand,
  deleteBrand
}
