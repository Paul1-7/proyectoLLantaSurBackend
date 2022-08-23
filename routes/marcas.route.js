const express = require('express')
const {
  getAllBrands,
  findBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/marcas.controller.js')
const { ERROR_RESPONSE } = require('../middlewares/error.handle.js')
const { checkId } = require('../middlewares/validator.handle.js')

const brandRoute = express.Router()

const msg = {
  notFound: 'Marca no encontrada',
  delete: 'Marca eliminada'
}

brandRoute.get('/', getAllBrands)

brandRoute.get('/:id', checkId, findBrand)

brandRoute.post('/', createBrand)

brandRoute.put('/:id', checkId, updateBrand)

brandRoute.delete('/:id', checkId, deleteBrand)

module.exports = brandRoute
