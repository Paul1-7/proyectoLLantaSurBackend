const express = require('express')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { checkId } = require('../middlewares/validator.handle.js')
const {
  getAllBrands,
  findBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../services/marcas.service.js')

const brandRoute = express.Router()

const msg = {
  notFound: 'Marca no encontrada',
  delete: 'Marca eliminada'
}

brandRoute.get('/', async (req, res, next) => {
  try {
    const brand = await getAllBrands()
    res.json(brand)
  } catch (error) {
    next(error)
  }
})

brandRoute.get('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const brand = await findBrand(id)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)
    res.json(brand)
  } catch (error) {
    next(error)
  }
})

brandRoute.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const brand = await createBrand(body)
    res.json(brand)
  } catch (error) {
    next(error)
  }
})

brandRoute.put('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req
    const brand = await updateBrand(id, body)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json(brand)
  } catch (error) {
    next(error)
  }
})

brandRoute.delete('/:id', checkId, async (req, res, next) => {
  try {
    const { id } = req.params
    const brand = await deleteBrand(id)

    if (!brand) return ERROR_RESPONSE.notFound(msg.notFound, res)

    res.json({ message: msg.delete })
  } catch (error) {
    next(error)
  }
})

module.exports = brandRoute
